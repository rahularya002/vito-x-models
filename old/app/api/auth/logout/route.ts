// File: app/api/auth/logout/route.ts
import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Logged out successfully" });
  response.cookies.set({
    name: "auth-token",
    value: "",
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });
  
  return response;
}

