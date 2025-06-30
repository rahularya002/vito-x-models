import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { Model } from '@/app/models/Model';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { ObjectId } from 'mongodb';
import { ModelRequest } from '@/app/models/ModelRequest';

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
        { error: 'Invalid model ID' },
        { status: 400 }
      );
    }

    // Connect to database
    const mongoose = await connectToDatabase();
    if (!mongoose) {
      throw new Error('Failed to connect to database');
    }

    // Try to find in model requests first
    let model = await ModelRequest.findById(resolvedParams.id);
    
    // If not found in requests, try to find in models
    if (!model) {
      model = await Model.findById(resolvedParams.id);
    }

    if (!model) {
      return NextResponse.json(
        { error: 'Model not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(model);
  } catch (error) {
    console.error('Error fetching model:', error);
    return NextResponse.json(
      { error: 'Failed to fetch model' },
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
        { error: 'Invalid model ID' },
        { status: 400 }
      );
    }

    const body = await request.json();

    // Connect to database
    const mongoose = await connectToDatabase();
    if (!mongoose) {
      throw new Error('Failed to connect to database');
    }

    // Update model
    const model = await Model.findByIdAndUpdate(
      resolvedParams.id,
      { $set: { ...body, updated_at: new Date() } },
      { new: true, runValidators: true }
    ).lean();

    if (!model) {
      return NextResponse.json(
        { error: 'Model not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(model);
  } catch (error: any) {
    console.error('Error updating model:', error);
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'Username or email already exists' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to update model' },
      { status: 500 }
    );
  }
}

export async function DELETE(
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
        { error: 'Invalid model ID' },
        { status: 400 }
      );
    }

    // Connect to database
    const mongoose = await connectToDatabase();
    if (!mongoose) {
      throw new Error('Failed to connect to database');
    }

    // Delete model
    const model = await Model.findByIdAndDelete(resolvedParams.id).lean();
    if (!model) {
      return NextResponse.json(
        { error: 'Model not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Model deleted successfully' });
  } catch (error) {
    console.error('Error deleting model:', error);
    return NextResponse.json(
      { error: 'Failed to delete model' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const session = await getServerSession(authOptions)
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { status } = await request.json()
    if (!status) {
      return new NextResponse("Status is required", { status: 400 })
    }

    await connectToDatabase()

    // Find the model request
    const modelRequest = await ModelRequest.findById(resolvedParams.id)
    if (!modelRequest) {
      return new NextResponse("Model request not found", { status: 404 })
    }

    // If approving the request, create a new model
    if (status === "active") {
      // Check if model already exists
      const existingModel = await Model.findOne({ email: modelRequest.profiles.email })
      if (existingModel) {
        return new NextResponse("Model already exists", { status: 400 })
      }

      // Generate unique username from email
      const baseUsername = modelRequest.profiles.email.split('@')[0]
      let username = baseUsername
      let counter = 1

      while (await Model.findOne({ username })) {
        username = `${baseUsername}${counter}`
        counter++
      }

      // Create new model
      const newModel = new Model({
        status: 'active',
        full_name: modelRequest.profiles.full_name,
        email: modelRequest.profiles.email,
        username,
        avatar_url: modelRequest.profiles.avatar_url,
        height: modelRequest.height,
        experience: modelRequest.experience,
        credits: modelRequest.credits || 0,
        categories: [], // Default empty categories
        ...modelRequest.additional_info
      })

      // Update request status and save new model
      modelRequest.status = 'approved'
      modelRequest.approved_by = session.user.id
      modelRequest.approved_at = new Date()

      await Promise.all([
        modelRequest.save(),
        newModel.save()
      ])

      return NextResponse.json({
        message: 'Model request approved and model created',
        model: newModel,
        request: modelRequest
      })
    }

    // If rejecting the request
    if (status === "rejected") {
      modelRequest.status = 'rejected'
      modelRequest.rejected_by = session.user.id
      modelRequest.rejected_at = new Date()

      await modelRequest.save()

      return NextResponse.json({
        message: 'Model request rejected',
        request: modelRequest
      })
    }

    return new NextResponse("Invalid status", { status: 400 })
  } catch (error) {
    console.error('Error updating model request:', error)
    return new NextResponse("Internal server error", { status: 500 })
  }
} 