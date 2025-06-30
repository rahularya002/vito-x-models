import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { ModelRequest } from '@/app/models/ModelRequest';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const sortBy = searchParams.get('sortBy') || 'created_at';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    // Connect to database
    const mongoose = await connectToDatabase();
    if (!mongoose) {
      throw new Error('Failed to connect to database');
    }

    // Build query
    const query: any = {};
    if (status) {
      query.status = status;
    }
    if (search) {
      query.$or = [
        { 'profiles.full_name': { $regex: search, $options: 'i' } },
        { 'profiles.email': { $regex: search, $options: 'i' } }
      ];
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Get total count for pagination
    const total = await ModelRequest.countDocuments(query);

    // Fetch model requests with pagination and sorting
    const requests = await ModelRequest.find(query)
      .sort({ [sortBy]: sortOrder === 'desc' ? -1 : 1 })
      .skip(skip)
      .limit(limit)
      .lean();

    return NextResponse.json({
      requests,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching model requests:', error);
    return NextResponse.json(
      { error: 'Failed to fetch model requests' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Connect to database
    const mongoose = await connectToDatabase();
    if (!mongoose) {
      throw new Error('Failed to connect to database');
    }

    // Create new model request
    const modelRequest = new ModelRequest(body);
    await modelRequest.save();

    return NextResponse.json(modelRequest, { status: 201 });
  } catch (error) {
    console.error('Error creating model request:', error);
    return NextResponse.json(
      { error: 'Failed to create model request' },
      { status: 500 }
    );
  }
} 