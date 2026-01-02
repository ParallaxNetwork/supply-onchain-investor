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
      name: "Mock Login",
      credentials: {
        role: { label: "Role", type: "text" },
      },
      async authorize(credentials) {
        if (process.env.NODE_ENV === "production") {
          // console.log("[Mock Login] Blocked in production");
          return null;
        }

        console.log("[Mock Login] Authorizing with credentials:", credentials);

        const role = (credentials?.role as string) || "INVESTOR";
        const email = `mock-${role.toLowerCase()}@example.com`;

        try {
          // Upsert the mock user in the database
          const user = await db.user.upsert({
            where: { email },
            update: {},
            create: {
              email,
              name: `Mock ${role}`,
              role: role === "ADMIN" ? "ADMIN" : "INVESTOR",
              image: `https://ui-avatars.com/api/?name=Mock+${role}&background=random`,
            },
          });
          console.log("[Mock Login] User upserted:", user);
          return user;
        } catch (error) {
          console.error("[Mock Login] Database error:", error);
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
