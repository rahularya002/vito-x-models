import { createClient } from '@supabase/supabase-js';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// This is for server components only
export async function getAuthenticatedSupabaseClient() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    throw new Error('Not authenticated');
  }
  
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: {
          Authorization: `Bearer ${(session as any).supabaseAccessToken || ''}`
        }
      }
    }
  );
}

// For client components (no server imports)
export function useAuthenticatedSupabaseClient(session?: any) {
  // For client-side use only
  if (typeof window === 'undefined') {
    throw new Error('useAuthenticatedSupabaseClient is only for client components');
  }
  
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: {
          Authorization: session?.supabaseAccessToken ? `Bearer ${session.supabaseAccessToken}` : ''
        }
      }
    }
  );
}

// For admin operations where we need to bypass RLS
// IMPORTANT: Only use this in server components/actions!
export async function getServiceRoleSupabaseClient() {
  if (typeof window !== 'undefined') {
    throw new Error('This function is for server-side use only');
  }
  
  const session = await getServerSession(authOptions);
  
  // Make sure the user is an admin
  if (!session || session.user.role !== 'admin') {
    throw new Error('Not authorized - admin access required');
  }
  
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, // Use service role key to bypass RLS
    {
      global: {
        headers: {
          'x-admin-request': 'true'
        }
      }
    }
  );
} 