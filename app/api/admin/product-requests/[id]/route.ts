import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { ProductRequest } from '@/app/models/ProductRequest';
import { Model } from '@/app/models/Model';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { ObjectId } from 'mongodb';
import Product from '@/models/Product';

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

    await connectToDatabase();

    // Fetch product request
    const product = await Product.findById(resolvedParams.id).lean();
    if (!product) {
      return NextResponse.json(
        { error: 'Product request not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product request:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product request' },
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

    const body = await request.json();
    const { action, ...updateData } = body;

    await connectToDatabase();

    // Handle different actions
    if (action === 'approve') {
      const product = await Product.findById(resolvedParams.id);
      if (!product) {
        return NextResponse.json(
          { error: 'Product request not found' },
          { status: 404 }
        );
      }

      if (product.status !== 'pending') {
        return NextResponse.json(
          { error: 'Can only approve pending requests' },
          { status: 400 }
        );
      }

      product.status = 'approved';
      product.updated_at = new Date();
      await product.save();

      return NextResponse.json({
        message: 'Product request approved',
        product
      });
    }

    if (action === 'reject') {
      const product = await Product.findById(resolvedParams.id);
      if (!product) {
        return NextResponse.json(
          { error: 'Product request not found' },
          { status: 404 }
        );
      }

      if (product.status !== 'pending') {
        return NextResponse.json(
          { error: 'Can only reject pending requests' },
          { status: 400 }
        );
      }

      product.status = 'rejected';
      product.updated_at = new Date();
      await product.save();

      return NextResponse.json({
        message: 'Product request rejected',
        product
      });
    }

    // Regular update
    const product = await Product.findByIdAndUpdate(
      resolvedParams.id,
      { $set: { ...updateData, updated_at: new Date() } },
      { new: true, runValidators: true }
    ).lean();

    if (!product) {
      return NextResponse.json(
        { error: 'Product request not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error updating product request:', error);
    return NextResponse.json(
      { error: 'Failed to update product request' },
      { status: 500 }
    );
  }
} 