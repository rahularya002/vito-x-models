import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { ModelRequest } from '@/app/models/ModelRequest';
import { Model } from '@/app/models/Model';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { ObjectId } from 'mongodb';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Validate ObjectId
    if (!ObjectId.isValid(resolvedParams.id)) {
      return NextResponse.json(
        { error: 'Invalid request ID' },
        { status: 400 }
      );
    }

    // Connect to database
    const mongoose = await connectToDatabase();
    if (!mongoose) {
      throw new Error('Failed to connect to database');
    }

    // Fetch model request
    const request = await ModelRequest.findById(resolvedParams.id).lean();
    if (!request) {
      return NextResponse.json(
        { error: 'Model request not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(request);
  } catch (error) {
    console.error('Error fetching model request:', error);
    return NextResponse.json(
      { error: 'Failed to fetch model request' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Validate ObjectId
    if (!ObjectId.isValid(resolvedParams.id)) {
      return NextResponse.json(
        { error: 'Invalid request ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { action, ...updateData } = body;

    // Connect to database
    const mongoose = await connectToDatabase();
    if (!mongoose) {
      throw new Error('Failed to connect to database');
    }

    // Handle different actions
    if (action === 'approve') {
      const modelRequest = await ModelRequest.findById(resolvedParams.id);
      if (!modelRequest) {
        return NextResponse.json(
          { error: 'Model request not found' },
          { status: 404 }
        );
      }

      if (modelRequest.status !== 'pending') {
        return NextResponse.json(
          { error: 'Can only approve pending requests' },
          { status: 400 }
        );
      }

      // Create new model from request
      const newModel = new Model({
        status: 'active',
        full_name: modelRequest.profiles.full_name,
        email: modelRequest.profiles.email,
        username: modelRequest.profiles.email.split('@')[0], // Generate username from email
        avatar_url: modelRequest.profiles.avatar_url,
        height: modelRequest.height,
        experience: modelRequest.experience,
        credits: modelRequest.credits || 0,
        categories: [], // Default empty categories
        ...modelRequest.additional_info
      });

      // Update request status and save new model
      modelRequest.status = 'approved';
      modelRequest.approved_by = session.user.id;
      modelRequest.approved_at = new Date();
      modelRequest.admin_notes = updateData.admin_notes;

      await Promise.all([
        modelRequest.save(),
        newModel.save()
      ]);

      return NextResponse.json({
        message: 'Model request approved and model created',
        model: newModel,
        request: modelRequest
      });
    }

    if (action === 'reject') {
      const modelRequest = await ModelRequest.findById(resolvedParams.id);
      if (!modelRequest) {
        return NextResponse.json(
          { error: 'Model request not found' },
          { status: 404 }
        );
      }

      if (modelRequest.status !== 'pending') {
        return NextResponse.json(
          { error: 'Can only reject pending requests' },
          { status: 400 }
        );
      }

      modelRequest.status = 'rejected';
      modelRequest.rejected_by = session.user.id;
      modelRequest.rejected_at = new Date();
      modelRequest.rejection_reason = updateData.rejection_reason;
      modelRequest.admin_notes = updateData.admin_notes;

      await modelRequest.save();

      return NextResponse.json({
        message: 'Model request rejected',
        request: modelRequest
      });
    }

    // Regular update
    const modelRequest = await ModelRequest.findByIdAndUpdate(
      resolvedParams.id,
      { $set: { ...updateData, updated_at: new Date() } },
      { new: true, runValidators: true }
    ).lean();

    if (!modelRequest) {
      return NextResponse.json(
        { error: 'Model request not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(modelRequest);
  } catch (error) {
    console.error('Error updating model request:', error);
    return NextResponse.json(
      { error: 'Failed to update model request' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Validate ObjectId
    if (!ObjectId.isValid(resolvedParams.id)) {
      return NextResponse.json(
        { error: 'Invalid request ID' },
        { status: 400 }
      );
    }

    const body = await request.json();

    // Connect to database
    const mongoose = await connectToDatabase();
    if (!mongoose) {
      throw new Error('Failed to connect to database');
    }

    // Update model request
    const modelRequest = await ModelRequest.findByIdAndUpdate(
      resolvedParams.id,
      { $set: { ...body, updated_at: new Date() } },
      { new: true, runValidators: true }
    ).lean();

    if (!modelRequest) {
      return NextResponse.json(
        { error: 'Model request not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(modelRequest);
  } catch (error) {
    console.error('Error updating model request:', error);
    return NextResponse.json(
      { error: 'Failed to update model request' },
      { status: 500 }
    );
  }
} 