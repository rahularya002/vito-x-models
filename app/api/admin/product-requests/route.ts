import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import Product, { IProduct } from '@/models/Product';
import { getServiceRoleSupabaseClient } from '@/lib/supabase-auth';

// Define a type for the user data from Supabase auth
interface SupabaseUser {
  id: string;
  email: string;
  raw_user_meta_data: {
    full_name?: string;
    avatar_url?: string;
  };
}

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
    const category = searchParams.get('category');

    // Connect to database
    await connectDB();

    // Build query
    const query: any = {};
    if (status) {
      query.status = status;
    }
    if (category) {
      query.category = category;
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } }
      ];
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Get total count for pagination
    const total = await Product.countDocuments(query);

    // Fetch products with pagination and sorting
    const products = await Product.find(query)
      .sort({ [sortBy]: sortOrder === 'desc' ? -1 : 1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Get the service role Supabase client
    const supabase = await getServiceRoleSupabaseClient();

    // Fetch user details for each product from Supabase auth.users
    const productsWithUsers = await Promise.all(
      products.map(async (product) => {
        let user: SupabaseUser | null = null;
        try {
          console.log('Fetching user for product:', {
            product_id: product._id,
            user_id: product.user_id
          });

          // Fetch user from Supabase auth.users table
          const { data: userData, error } = await supabase
            .from('users')
            .select('id, email, raw_user_meta_data')
            .eq('id', product.user_id)
            .single();

          if (!error && userData) {
            user = userData as SupabaseUser;
          }
        } catch (error) {
          console.error('Error fetching user from Supabase:', error);
        }

        return {
          ...product,
          client: {
            id: user?.id || '',
            name: user?.raw_user_meta_data?.full_name || 'Unknown User',
            email: user?.email || '',
            avatar_url: user?.raw_user_meta_data?.avatar_url
          }
        };
      })
    );

    return NextResponse.json({
      requests: productsWithUsers,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching product requests:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product requests' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Connect to database
    await connectDB();

    // Create new product
    const product = new Product(body);
    await product.save();

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
} 