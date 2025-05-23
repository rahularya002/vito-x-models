import mongoose from 'mongoose';

export interface IUser {
  email: string;
  password: string;
  full_name: string;
  username: string;
  role: 'admin' | 'client';
  status: 'active' | 'inactive';
  additional_info?: {
    company_name?: string;
    industry?: string;
  };
  created_at: Date;
  updated_at: Date;
}

const userSchema = new mongoose.Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  full_name: {
    type: String,
    required: true,
    trim: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  role: {
    type: String,
    enum: ['admin', 'client'],
    default: 'client'
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  additional_info: {
    company_name: String,
    industry: String
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

// Update the updated_at timestamp before saving
userSchema.pre('save', function(next) {
  this.updated_at = new Date();
  next();
});

// Create and export the model
export const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema); 