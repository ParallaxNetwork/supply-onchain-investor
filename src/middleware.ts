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
    const isAdminRoute = nextUrl.pathname.startsWith("/admin");
    const isAdminLoginRoute = nextUrl.pathname === "/admin/login";

    // Protect investor routes
    if (isInvestorRoute) {
        if (!isLoggedIn) {
            return NextResponse.redirect(new URL("/login", nextUrl));
        }
        if (userRole !== "INVESTOR") {
            // Redirect to home if logged in but not an investor
            return NextResponse.redirect(new URL("/", nextUrl));
        }
    }

    // Protect admin routes (except login page)
    if (isAdminRoute && !isAdminLoginRoute) {
        if (!isLoggedIn) {
            return NextResponse.redirect(new URL("/admin/login", nextUrl));
        }
        if (userRole !== "ADMIN") {
            // Redirect to home if logged in but not an admin
            return NextResponse.redirect(new URL("/", nextUrl));
        }
    }

    // Redirect admin away from login page if already logged in
    if (isAdminLoginRoute && isLoggedIn && userRole === "ADMIN") {
        return NextResponse.redirect(new URL("/admin", nextUrl));
    }

    // Add pathname to headers for layout to check
    const response = NextResponse.next();
    response.headers.set("x-pathname", nextUrl.pathname);
    return response;
});

export const config = {
    matcher: ["/investor/:path*", "/admin/:path*"],
};
