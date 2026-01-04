import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import { type UserRole } from "../../../generated/prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import DiscordProvider from "next-auth/providers/discord";
import * as bcrypt from "bcryptjs";

import { db } from "@/server/db";
import { authConfig as baseConfig } from "./auth.config";

// Rate limiting for admin login (in-memory store)
// In production, consider using Redis or similar
const loginAttempts = new Map<
  string,
  { count: number; resetAt: number }
>();

const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes

const isDevelopment = process.env.NODE_ENV === "development";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: UserRole;
    } & DefaultSession["user"];
  }

  interface User {
    role: UserRole;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  ...baseConfig,
  providers: [
    DiscordProvider,
    // Admin Login with Email + Password
    CredentialsProvider({
      id: "admin-credentials",
      name: "Admin Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          if (isDevelopment) {
            console.log("[Admin Login] Missing credentials");
          }
          return null;
        }

        const email = credentials.email as string;
        const password = credentials.password as string;

        try {
          // Rate limiting check
          const attempts = loginAttempts.get(email) ?? {
            count: 0,
            resetAt: Date.now() + LOCKOUT_DURATION_MS,
          };

          // Reset if lockout period expired
          if (attempts.resetAt < Date.now()) {
            loginAttempts.delete(email);
          } else if (attempts.count >= MAX_LOGIN_ATTEMPTS) {
            if (isDevelopment) {
              console.log(
                `[Admin Login] Too many attempts for: ${email}. Locked until: ${new Date(attempts.resetAt).toISOString()}`,
              );
            } else {
              console.log("[Admin Login] Too many login attempts");
            }
            return null;
          }

          // Find admin user
          const user = await db.user.findUnique({
            where: { email },
          });

          if (!user) {
            // Increment attempts even for non-existent users (prevent email enumeration)
            loginAttempts.set(email, {
              count: attempts.count + 1,
              resetAt: Date.now() + LOCKOUT_DURATION_MS,
            });
            if (isDevelopment) {
              console.log("[Admin Login] User not found for email:", email);
            }
            return null;
          }

          if (isDevelopment) {
            console.log("[Admin Login] Found user:", {
              id: user.id,
              email: user.email,
              role: user.role,
              hasPassword: !!user.password,
            });
          }

          // Check if user is admin
          if (user.role !== "ADMIN") {
            if (isDevelopment) {
              console.log("[Admin Login] User is not an admin. Role:", user.role);
            }
            return null;
          }

          // Check if user has password set
          if (!user.password) {
            if (isDevelopment) {
              console.log("[Admin Login] Password not set for admin user");
            }
            return null;
          }

          // Verify password
          try {
            const isPasswordValid = await bcrypt.compare(
              password,
              user.password as string,
            );

            if (!isPasswordValid) {
              // Increment failed attempts
              loginAttempts.set(email, {
                count: attempts.count + 1,
                resetAt: Date.now() + LOCKOUT_DURATION_MS,
              });
              if (isDevelopment) {
                console.log("[Admin Login] Invalid password for:", email);
              }
              return null;
            }

            // Success - clear attempts
            loginAttempts.delete(email);
            if (isDevelopment) {
              console.log("[Admin Login] Successful login for:", email);
            }
            return user;
          } catch (bcryptError) {
            console.error("[Admin Login] Bcrypt error:", bcryptError);
            return null;
          }
        } catch (error) {
          console.error("[Admin Login] Error:", error);
          return null;
        }
      },
    }),
    // Investor/Trader Login with OTP
    CredentialsProvider({
      id: "credentials",
      name: "OTP Login",
      credentials: {
        email: { label: "Email", type: "email" },
        otp: { label: "OTP", type: "text" },
        sessionId: { label: "Session ID", type: "text" },
        role: { label: "Role", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.otp || !credentials?.sessionId) {
          console.log("[OTP Login] Missing credentials");
          return null;
        }

        const email = credentials.email as string;
        const otp = credentials.otp as string;
        const sessionId = credentials.sessionId as string;
        const role = (credentials.role as string) || "INVESTOR";

        try {
          // 1. Find OTP Session
          const session = await db.otpSession.findUnique({
            where: { sessionId },
          });

          if (!session) {
            console.log("[OTP Login] Session not found");
            return null;
          }

          // 2. Validate Session
          if (session.email !== email) {
            console.log("[OTP Login] Email mismatch");
            return null;
          }

          if (session.isUsed) {
            console.log("[OTP Login] Token already used");
            return null;
          }

          if (session.expiresAt < new Date()) {
            console.log("[OTP Login] Token expired");
            return null;
          }

          if (session.attempts >= 3) {
            console.log("[OTP Login] Too many attempts");
            return null;
          }

          // 3. Verify OTP
          if (session.otp !== otp) {
            console.log("[OTP Login] Invalid OTP");
            await db.otpSession.update({
              where: { sessionId },
              data: { attempts: { increment: 1 } },
            });
            return null;
          }

          // 4. Mark session as used
          await db.otpSession.update({
            where: { sessionId },
            data: { isUsed: true },
          });

          // 5. Get or Create User
          const existingUser = await db.user.findUnique({
            where: { email },
          });

          if (existingUser) {
             if (existingUser.role !== role && existingUser.role !== "ADMIN") {
               console.log(`[OTP Login] Role mismatch. User is ${existingUser.role}, attempted login as ${role}`);
               return null;
             }
             return existingUser;
          }

          // Create new user
          const newUser = await db.user.create({
            data: {
              email,
              name: `User ${role}`,
              role: role === "ADMIN" ? "ADMIN" : (role as UserRole),
              image: `https://ui-avatars.com/api/?name=${role}&background=random`,
              emailVerified: new Date(),
            },
          });
          
          return newUser;

        } catch (error) {
          console.error("[OTP Login] Error:", error);
          return null;
        }
      },
    }),
  ],
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
  adapter: PrismaAdapter(db) as any,
  session: {
    strategy: "jwt",
  },
} satisfies NextAuthConfig;
