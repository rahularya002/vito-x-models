import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { User } from '@/app/models/User';

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    
    // Get all users and log them for debugging
    const users = await User.find({});
    console.log('Found users:', users);
    
    const total = users.length;
    console.log('Total users:', total);
    
    return NextResponse.json({ 
      total,
      users: users.map(user => ({
        id: user._id,
        email: user.email,
        full_name: user.full_name,
        role: user.role
      }))
    });
  } catch (error) {
    console.error('Error in total-users API:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
} 