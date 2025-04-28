// File: middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

// Function to verify JWT token
async function verifyToken(token: string): Promise<boolean> {
  if (!token) return false;
  
  try {
    // Convert JWT_SECRET to Uint8Array for jose
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(token, secret);
    return true;
  } catch (error) {
    console.error("Token verification failed:", error);
    return false;
  }
}

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  
  // Get auth token from cookies
  const token = req.cookies.get("auth-token")?.value;
  
  // Check if token is valid
  const isAuthenticated = token ? await verifyToken(token) : false;
  
  // If not authenticated and trying to access dashboard, redirect to login
  if (!isAuthenticated && req.nextUrl.pathname.startsWith("/dashboard")) {
    const redirectUrl = new URL("/login", req.url);
    redirectUrl.searchParams.set("redirect", req.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }
  
  // If authenticated and trying to access login/signup, redirect to dashboard
  if (isAuthenticated && (req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/signup")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
  
  return res;
}

export const config = {
  matcher: ["/login", "/signup", "/dashboard/:path*"],
};