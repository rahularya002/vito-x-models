"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { User as NextAuthUser } from "next-auth"
import { signIn as nextAuthSignIn, signOut as nextAuthSignOut, useSession } from "next-auth/react"

type Profile = {
  id: string
  full_name: string
  avatar_url: string
  company_name: string
  industry: string
  phone: string
  address: string
  city: string
  country: string
  bio: string
  notification_settings?: {
    emailCampaigns: boolean
    emailProducts: boolean
    emailModels: boolean
    emailAnalytics: boolean
    pushCampaigns: boolean
    pushProducts: boolean
    pushModels: boolean
    pushAnalytics: boolean
  }
  privacy_settings?: {
    profileVisibility: string
    dataSharing: boolean
    marketingEmails: boolean
  }
}

type AuthContextType = {
  user: NextAuthUser | null
  profile: Profile | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>
  signUp: (email: string, password: string, profileData: Partial<Profile>) => Promise<{ error: Error | null }>
  signOut: () => Promise<void>
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const user = session?.user || null;
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(status === 'loading')

  useEffect(() => {
    setLoading(status === 'loading');
    if (status === 'authenticated' && user) {
      fetchProfile(user.id);
    } else if (status === 'unauthenticated') {
      setProfile(null);
    }
  }, [status, user]);

  const fetchProfile = async (userId: string) => {
    try {
      // Fetch profile from MongoDB using the new API route
      console.log("Fetching profile for user:", userId);
      const response = await fetch(`/api/users/${userId}`);

      if (!response.ok) {
        // If the user is not found in MongoDB, it might be a new user
        // or a user who hasn't completed their profile yet.
        // We can handle this by setting a basic profile or null.
        console.warn(`Profile not found for user ID: ${userId}. Status: ${response.status}`);
        setProfile(null); // Or set a default basic profile
        return;
      }

      const profileData = await response.json();
      setProfile(profileData);

    } catch (error) {
      console.error('Error in fetchProfile:', error);
      setProfile(null);
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const result = await nextAuthSignIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        console.error("NextAuth signIn error:", result.error);
        return { error: new Error(result.error) };
      }

      return { error: null };
    } catch (error) {
      console.error("Unexpected error during signIn:", error);
      return { error: error as Error };
    }
  }

  const signUp = async (email: string, password: string, profileData: Partial<Profile>) => {
    try {
      console.log("Attempting signup with:", { email, hasPassword: !!password, profileData });

      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          fullName: profileData.full_name,
          companyName: profileData.company_name,
          industry: profileData.industry,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        console.error("API signup error:", result.error);
        return { error: new Error(result.error) };
      }

      console.log("Signup API successful:", result);

      const signInResult = await nextAuthSignIn('credentials', {
        redirect: false,
        email,
        password,
      });

       if (signInResult?.error) {
        console.error("NextAuth signIn after signup error:", signInResult.error);
       }

      return { error: null };

    } catch (error) {
      console.error("Unexpected error during signup:", error);
      if (error instanceof Error && error.message.includes("fetch")) {
        return { error: new Error("Network error. Please check your internet connection and try again.") };
      }
      return { error: error as Error };
    }
  }

  const signOut = async () => {
    await nextAuthSignOut({ redirect: false });
    setProfile(null);
  }

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.id);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        signIn,
        signUp,
        signOut,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }

  return context
}
