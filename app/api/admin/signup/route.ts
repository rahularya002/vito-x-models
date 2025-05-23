import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Admin from '@/app/models/Admin';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const { username, password, confirmPassword } = await request.json();

    if (!username || !password || !confirmPassword) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: 'Passwords do not match' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      );
    }

    // Connect to database
    const mongoose = await connectToDatabase();
    if (!mongoose) {
      throw new Error('Failed to connect to database');
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return NextResponse.json(
        { error: 'Username already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new admin
    const admin = new Admin({
      username,
      password: hashedPassword,
      status: 'active',
      created_at: new Date(),
      updated_at: new Date()
    });

    await admin.save();

    return NextResponse.json({
      message: 'Admin account created successfully',
      admin: {
        username: admin.username,
        status: admin.status
      }
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating admin account:', error);
    return NextResponse.json(
      { error: 'Failed to create admin account' },
      { status: 500 }
    );
  }
} 