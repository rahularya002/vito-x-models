// File: app/api/auth/signup/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from '@/lib/mongodb';
import { User } from '@/app/models/User';
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, fullName, companyName, industry } = body;

    console.log('Signup attempt for:', email);

    // Validate required fields
    if (!email || !password || !fullName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Password validation
    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    // Connect to database
    const mongoose = await connectToDatabase();
    if (!mongoose) {
      console.error('Failed to connect to database');
      throw new Error('Failed to connect to database');
    }
    console.log('Connected to database successfully');

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User already exists:', email);
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 409 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const user = new User({
      email,
      password: hashedPassword,
      full_name: fullName,
      username: email.split('@')[0], // Use email prefix as username
      status: 'active',
      additional_info: {
        company_name: companyName || null,
        industry: industry || null
      },
      created_at: new Date(),
      updated_at: new Date()
    });

    console.log('Attempting to save user:', {
      email: user.email,
      username: user.username,
      full_name: user.full_name
    });

    await user.save();
    console.log('User saved successfully:', user._id.toString());

    // Return user data without sensitive information
    return NextResponse.json(
      {
        message: "User created successfully",
        user: {
          id: user._id.toString(),
          email: user.email,
          fullName: user.full_name,
          status: user.status
        }
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Unexpected error during signup:", error);
    if (error.code === 11000) {
      return NextResponse.json(
        { error: "Username or email already exists" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}