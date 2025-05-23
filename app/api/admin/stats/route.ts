import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { Model } from '@/app/models/Model';
import { ModelRequest } from '@/app/models/ModelRequest';
import { ProductRequest } from '@/app/models/ProductRequest';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabase } from '@/lib/supabase';

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

    // Connect to database
    const mongoose = await connectToDatabase();
    if (!mongoose) {
      throw new Error('Failed to connect to database');
    }

    // Get date range for recent activity
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Fetch user count and recent users from Supabase
    const { count: totalUsers, error: userError } = await supabase
      .from('auth_users')
      .select('*', { count: 'exact', head: true });

    if (userError) {
      console.error('Error fetching user count from Supabase:', userError);
      throw new Error('Failed to fetch user count');
    }

    // Fetch recent users from Supabase
    const { data: recentUsers, error: recentUsersError } = await supabase
      .from('auth_users')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);

    if (recentUsersError) {
      console.error('Error fetching recent users:', recentUsersError);
      throw new Error('Failed to fetch recent users');
    }

    // Fetch other statistics in parallel
    const [
      totalModels,
      activeModels,
      pendingModelRequests,
      totalModelRequests,
      pendingProductRequests,
      totalProductRequests,
      recentModelRequests,
      recentProductRequests
    ] = await Promise.all([
      // Model statistics
      Model.countDocuments(),
      Model.countDocuments({ status: 'active' }),
      
      // Model request statistics
      ModelRequest.countDocuments({ status: 'pending' }),
      ModelRequest.countDocuments(),
      
      // Product request statistics
      ProductRequest.countDocuments({ status: 'pending' }),
      ProductRequest.countDocuments(),
      
      // Recent activity
      ModelRequest.find({
        created_at: { $gte: thirtyDaysAgo }
      })
        .sort({ created_at: -1 })
        .limit(5)
        .lean(),
      
      ProductRequest.find({
        created_at: { $gte: thirtyDaysAgo }
      })
        .sort({ created_at: -1 })
        .limit(5)
        .lean()
    ]);

    // Calculate model request approval rate
    const approvedModelRequests = await ModelRequest.countDocuments({ status: 'approved' });
    const modelRequestApprovalRate = totalModelRequests > 0
      ? (approvedModelRequests / totalModelRequests) * 100
      : 0;

    // Calculate product request approval rate
    const approvedProductRequests = await ProductRequest.countDocuments({ status: 'approved' });
    const productRequestApprovalRate = totalProductRequests > 0
      ? (approvedProductRequests / totalProductRequests) * 100
      : 0;

    // Format recent activity
    const recentActivity = [
      // Add recent users
      ...(recentUsers || []).map(user => ({
        type: 'user',
        id: user.id,
        status: user.status || 'active',
        created_at: new Date(user.created_at),
        name: user.name || '',
        email: user.email
      })),
      // Add model requests
      ...recentModelRequests.map(request => ({
        type: 'model_request',
        id: request._id,
        status: request.status,
        created_at: request.created_at,
        name: request.profiles.full_name,
        email: request.profiles.email
      })),
      // Add product requests
      ...recentProductRequests.map(request => ({
        type: 'product_request',
        id: request._id,
        status: request.status,
        created_at: request.created_at,
        name: request.name,
        client: request.client.name
      }))
    ].sort((a, b) => b.created_at.getTime() - a.created_at.getTime())
      .slice(0, 10);

    return NextResponse.json({
      stats: {
        users: {
          total: totalUsers || 0
        },
        models: {
          total: totalModels,
          active: activeModels,
          pendingRequests: pendingModelRequests,
          approvalRate: modelRequestApprovalRate.toFixed(1)
        },
        requests: {
          modelRequests: {
            total: totalModelRequests,
            pending: pendingModelRequests
          },
          productRequests: {
            total: totalProductRequests,
            pending: pendingProductRequests
          },
          productRequestApprovalRate: productRequestApprovalRate.toFixed(1)
        }
      },
      recentActivity
    });
  } catch (error) {
    console.error('Error fetching admin statistics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch admin statistics' },
      { status: 500 }
    );
  }
}