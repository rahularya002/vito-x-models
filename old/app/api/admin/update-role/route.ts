import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { User } from "@/app/models/User";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Connect to database
    const mongoose = await connectToDatabase();
    if (!mongoose) {
      throw new Error("Failed to connect to database");
    }

    // Find the user
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "No user found with this email" },
        { status: 404 }
      );
    }

    // Update the user's role to admin
    user.role = "admin";
    user.status = "active";
    await user.save();

    return NextResponse.json({
      message: "User role updated successfully",
      user: {
        email: user.email,
        role: user.role,
        status: user.status
      }
    });
  } catch (error) {
    console.error("Error updating user role:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}