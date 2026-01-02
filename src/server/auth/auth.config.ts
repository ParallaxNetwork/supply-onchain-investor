import { type NextAuthConfig } from "next-auth";

// Define a local type to avoid importing Prisma Client in Edge Runtime
export type UserRole = "INVESTOR" | "TRADER" | "OWNER" | "ADMIN";

export const authConfig = {
    providers: [],
    callbacks: {
        jwt: ({ token, user }) => {
            if (user) {
                token.sub = user.id;
                token.role = user.role;
            }
            return token;
        },
        session: ({ session, token }) => ({
            ...session,
            user: {
                ...session.user,
                id: token.sub!,
                role: token.role as UserRole,
            },
        }),
    },
} satisfies NextAuthConfig;
