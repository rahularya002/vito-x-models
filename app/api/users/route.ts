// File: app/api/users/route.ts
import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

// MongoDB connection URI - replace with your actual connection string
// You should store this in an environment variable
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';

export async function GET() {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    const database = client.db('vb');
    const usersCollection = database.collection('users');
    
    // Fetch all users but exclude the password field
    const users = await usersCollection
      .find({}, { projection: { password: 0 } })
      .sort({ timestamp: -1 }) // Sort by most recent first
      .toArray();
    
    return NextResponse.json(users);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}