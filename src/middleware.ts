import NextAuth from "next-auth";
import { authConfig } from "@/server/auth/auth.config";
import { NextResponse } from "next/server";

// Using the Edge-compatible config
const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;
    const userRole = req.auth?.user?.role;

    const isInvestorRoute = nextUrl.pathname.startsWith("/investor");

    if (isInvestorRoute) {
        if (!isLoggedIn) {
            return NextResponse.redirect(new URL("/login", nextUrl));
        }
        if (userRole !== "INVESTOR") {
            // Redirect to home if logged in but not an investor
            return NextResponse.redirect(new URL("/", nextUrl));
        }
    }
    return NextResponse.next();
});

export const config = {
    matcher: ["/investor/:path*"],
};
