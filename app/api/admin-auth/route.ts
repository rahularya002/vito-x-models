import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Admin from '@/app/models/Admin';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  const { action, username, password, confirmPassword } = await request.json();
  await connectToDatabase();

  if (action === 'signup') {
    if (!username || !password || !confirmPassword) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }
    if (password !== confirmPassword) {
      return NextResponse.json({ error: 'Passwords do not match.' }, { status: 400 });
    }
    if (password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters.' }, { status: 400 });
    }
    const existing = await Admin.findOne({ username });
    if (existing) {
      return NextResponse.json({ error: 'Username already exists.' }, { status: 400 });
    }
    const hashed = await bcrypt.hash(password, 10);
    await Admin.create({ username, password: hashed });
    return NextResponse.json({ success: true });
  }

  if (action === 'login') {
    if (!username || !password) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 });
    }
    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) {
      return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 });
    }
    // Set a dummy token cookie so middleware allows access
    const response = NextResponse.json({ success: true });
    response.cookies.set('token', 'admin', { maxAge: 60 * 60 * 24 }); // 1 day
    return response;
  }

  return NextResponse.json({ error: 'Invalid action.' }, { status: 400 });
} 