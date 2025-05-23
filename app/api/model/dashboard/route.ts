import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { Model, IModel } from '@/app/models/Model';
import { ProductRequest, IProductRequest } from '@/app/models/ProductRequest';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Connect to database
    const mongoose = await connectToDatabase();
    if (!mongoose) {
      throw new Error('Failed to connect to database');
    }

    // Get date range for upcoming events
    const today = new Date();
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(today.getDate() + 30);

    // Fetch model profile
    const model = await Model.findOne({ email: session.user.email }).lean() as IModel | null;
    if (!model) {
      return NextResponse.json(
        { error: 'Model profile not found' },
        { status: 404 }
      );
    }

    // Fetch model's photoshoots
    const [upcomingPhotoshoots, completedPhotoshoots] = await Promise.all([
      // Upcoming photoshoots
      ProductRequest.find({
        'assigned_model.id': model._id.toString(),
        status: 'approved',
        'shoot_details.date': { $gte: today, $lte: thirtyDaysFromNow }
      })
        .sort({ 'shoot_details.date': 1 })
        .lean()
        .then(docs => docs as unknown as IProductRequest[]),

      // Completed photoshoots
      ProductRequest.find({
        'assigned_model.id': model._id.toString(),
        status: 'completed'
      })
        .sort({ completed_at: -1 })
        .limit(5)
        .lean()
        .then(docs => docs as unknown as IProductRequest[])
    ]);

    // Format upcoming events
    const upcomingEvents = upcomingPhotoshoots.map(shoot => ({
      title: shoot.name,
      brand: shoot.client.name,
      date: shoot.shoot_details?.date,
      time: shoot.shoot_details?.duration,
      location: shoot.shoot_details?.location,
      requirements: shoot.shoot_details?.requirements || []
    }));

    // Format recent activity
    const recentActivity = completedPhotoshoots.map(shoot => ({
      type: 'photoshoot_completed' as const,
      brand: shoot.client.name,
      date: shoot.completed_at,
      amount: shoot.price * 0.7 // Assuming 70% commission for models
    }));

    // Add credit history (mock data for now, should be implemented with a separate credits collection)
    const creditHistory = [
      {
        type: 'photoshoot_completed' as const,
        amount: 500,
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
        description: 'Summer Collection Photoshoot'
      },
      {
        type: 'credit_added' as const,
        amount: 750,
        date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
        description: 'Magazine editorial'
      }
    ];

    return NextResponse.json({
      profile: {
        name: model.full_name,
        avatar: model.avatar_url,
        credits: model.credits,
        joinDate: model.created_at,
        lastLogin: new Date(), // Should be updated on login
        stats: {
          upcomingPhotoshoots: upcomingPhotoshoots.length,
          completedPhotoshoots: completedPhotoshoots.length
        }
      },
      upcomingEvents,
      recentActivity,
      creditHistory
    });
  } catch (error) {
    console.error('Error fetching model dashboard:', error);
    return NextResponse.json(
      { error: 'Failed to fetch model dashboard' },
      { status: 500 }
    );
  }
} 