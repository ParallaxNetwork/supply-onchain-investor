import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import { type UserRole } from "../../../generated/prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import DiscordProvider from "next-auth/providers/discord";

import { db } from "@/server/db";
import { authConfig as baseConfig } from "./auth.config";

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
    CredentialsProvider({
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
