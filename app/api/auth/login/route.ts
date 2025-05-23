// File: app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { Model } from "@/app/models/Model";
import { User } from "@/app/models/User";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Connect to database
    const mongoose = await connectToDatabase();
    if (!mongoose) {
      throw new Error("Failed to connect to database");
    }

    // Try to find user in both collections
    const [client, model] = await Promise.all([
      User.findOne({ email }),
      Model.findOne({ email })
    ]);

    // If found in neither collection
    if (!client && !model) {
      return NextResponse.json(
        { error: "No user found with this email" },
        { status: 401 }
      );
    }

    // Determine which user we found and verify password
    const user = client || model;
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid password" },
        { status: 401 }
      );
    }

    // If it's a model, check their status
    if (model) {
      if (model.status === 'pending') {
        return NextResponse.json(
          { error: "Your model application is still pending approval" },
          { status: 403 }
        );
      }
      if (model.status === 'inactive') {
        return NextResponse.json(
          { error: "Your account has been deactivated. Please contact support." },
          { status: 403 }
        );
      }
    }

    // Return success with user type and auth token
    return NextResponse.json({
      message: "Login successful",
      user: {
        id: user._id.toString(),
        email: user.email,
        fullName: user.full_name,
        status: user.status,
        type: client ? 'client' : 'model',
        role: model ? (model.status === "admin" ? "admin" : "model") : "client"
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}