// File: app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServiceRoleSupabaseClient } from '@/lib/supabase-auth';
import { authOptions } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    console.log('Starting user fetch from Supabase...');
    
    // Get the service role Supabase client
    const supabase = await getServiceRoleSupabaseClient();
    
    // Fetch users from Supabase auth.users table
    const { data: users, error } = await supabase
      .from('users')
      .select('id, email, raw_user_meta_data, created_at, updated_at')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching users from Supabase:', error);
      return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
    }
    
    console.log('Found users:', users?.length || 0);
    
    if (!users || users.length === 0) {
      console.log('No users found in Supabase');
      return NextResponse.json([]);
    }
    
    // Map users to response format for the admin UI
    const mappedUsers = users.map(user => ({
      _id: user.id,
      email: user.email,
      fullName: user.raw_user_meta_data?.full_name || '',
      companyName: user.raw_user_meta_data?.company_name || '',
      industry: user.raw_user_meta_data?.industry || '',
      status: 'active', // Assuming all are active for now
      timestamp: user.updated_at || user.created_at
    }));
    
    console.log('Mapped users:', JSON.stringify(mappedUsers, null, 2));
    
    return NextResponse.json(mappedUsers);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}