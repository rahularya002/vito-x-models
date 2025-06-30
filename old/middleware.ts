// File: middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Define public paths that don't require authentication
  const publicPaths = ["/login", "/signup", "/admin/login", "/admin/signup"];
  const isPublicPath = publicPaths.includes(path);

  try {
    // Get the session token
    const token = await getToken({ 
      req: request,
      secret: process.env.NEXTAUTH_SECRET 
    });

    // Handle admin routes
    if (path.startsWith('/admin')) {
      // If user is on a public admin path and is logged in as admin, redirect to admin page
    if (isPublicPath && token && token.role === "admin") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    // If user is on a protected admin path and is not logged in, redirect to admin login
    if (!isPublicPath && !token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

      // If user is logged in but not an admin, redirect to their dashboard
    if (!isPublicPath && token && token.role !== "admin") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }

      // If user is admin and on admin routes, allow access
      if (token && token.role === "admin") {
        return NextResponse.next();
      }
    }
    // Handle user dashboard routes
    else if (path.startsWith('/dashboard')) {
      // If user is not logged in, redirect to login
      if (!token) {
        return NextResponse.redirect(new URL("/login", request.url));
      }

      // If admin tries to access user dashboard, redirect to admin page
      if (token.role === "admin") {
        return NextResponse.redirect(new URL("/admin", request.url));
      }

      // If user is not admin and on dashboard routes, allow access
      if (token && token.role !== "admin") {
        return NextResponse.next();
      }
    }

    // For all other routes, allow access
    return NextResponse.next();
  } catch (error) {
    // In case of any errors, redirect to the appropriate login page
    if (path.startsWith('/admin')) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
}

// Configure the paths that should be handled by the middleware
export const config = {
  matcher: [
    "/admin/:path*",
    "/dashboard/:path*",
    "/login",
    "/signup",
    "/admin/login",
    "/admin/signup"
  ]
};