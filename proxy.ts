import { NextResponse } from "next/server";
import { NextRequestWithAuth, withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;

    // 🔐 Admin-only
    if (pathname.startsWith("/admin")) {
      if (token?.role !== "admin") {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
    }

    // 🔐 Logged-in users
    const userProtectedRoutes = ["/test", "/dashboard", "/profile"];
    if (userProtectedRoutes.some((route) => pathname.startsWith(route))) {
      if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => true, // 👈 CRITICAL FIX
    },
  },
);

export const config = {
  matcher: [
    "/admin/:path*",
    "/test/:path*",
    "/dashboard/:path*",
    "/profile/:path*",
  ],
};
