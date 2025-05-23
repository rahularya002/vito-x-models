import { NextAuthOptions } from "next-auth";
import { Model } from "@/app/models/Model";
import { User } from "@/app/models/User";
import Admin from "@/app/models/Admin";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import connectToDatabase from "./mongodb";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error("Username and password required");
        }

        const mongoose = await connectToDatabase();
        if (!mongoose) {
          throw new Error("Failed to connect to database");
        }

        // Try to find admin user
        const admin = await Admin.findOne({ username: credentials.username });
        if (admin) {
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            admin.password
          );

          if (!isPasswordValid) {
            throw new Error("Invalid password");
          }

          return {
            id: admin._id.toString(),
            email: admin.username,
            name: admin.username,
            role: 'admin'
          };
        }

        // If not an admin, try to find user in other collections
        const [client, model] = await Promise.all([
          User.findOne({ email: credentials.username }),
          Model.findOne({ email: credentials.username })
        ]);

        // If found in neither collection
        if (!client && !model) {
          throw new Error("No user found with this username/email");
        }

        // Determine which user we found and verify password
        const user = client || model;
        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        // If it's a model, check their status
        if (model) {
          if (model.status === 'pending') {
            throw new Error("Your model application is still pending approval");
          }
          if (model.status === 'inactive') {
            throw new Error("Your account has been deactivated. Please contact support.");
          }
        }

        // Return user with role
        return {
          id: user._id.toString(),
          email: user.email,
          name: user.full_name,
          role: user.role || (model ? 'model' : 'client')
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // If the URL is relative, prepend the base URL
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // If the URL is already absolute, return it
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    }
  },
  pages: {
    signIn: "/admin/login",
    error: "/admin/login"
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET
};

// Extend next-auth types
declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    name: string;
    role: string;
  }

  interface Session {
    user: User & {
      id: string;
      role: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    email: string;
    name: string;
  }
}

// Simple persistent store for users
export const UserService = {
  async getUserByEmail(email: string) {
    // Connect to MongoDB
    await connectToDatabase();
    // Find user in MongoDB
    const user = await User.findOne({ email });
    return user;
  },
  
  async createUser(userData: { email: string; password: string; name?: string; role?: string }) {
    // Connect to MongoDB
    await connectToDatabase();
    // Hash the password
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    // Create user in MongoDB
    const newUser = new User({
      email: userData.email,
      hashed_password: hashedPassword,
      full_name: userData.name || '',
      role: userData.role || 'user',
    });
    await newUser.save();
    return newUser;
  },
  
  async verifyPassword(user: any, password: string) {
    return bcrypt.compare(password, user.hashed_password);
  },
  
  async createAdminUser(userData: { email: string; password: string; name?: string }) {
    return this.createUser({
      ...userData,
      role: 'admin'
    });
  }
}; 