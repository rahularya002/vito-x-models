import { Schema, model, models } from 'mongoose';

export interface IModel {
  _id: string;
  status: 'active' | 'pending' | 'inactive';
  created_at: Date;
  updated_at: Date;
  full_name: string;
  username: string;
  email: string;
  avatar_url: string | null;
  credits: number;
  featured: boolean;
  categories: string[];
  gender?: string;
  age_range?: string;
  style?: string;
  portfolio_images?: string[];
  bio?: string;
  social_links?: {
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
  measurements?: {
    bust?: string;
    waist?: string;
    hips?: string;
    shoe_size?: string;
  };
  admin_notes?: string;
}

const modelSchema = new Schema<IModel>({
  status: {
    type: String,
    enum: ['active', 'pending', 'inactive'],
    default: 'pending',
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now,
    required: true
  },
  updated_at: {
    type: Date,
    default: Date.now,
    required: true
  },
  full_name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  avatar_url: {
    type: String,
    default: null
  },
  credits: {
    type: Number,
    default: 0
  },
  featured: {
    type: Boolean,
    default: false
  },
  categories: [{
    type: String
  }],
  gender: String,
  age_range: String,
  style: String,
  portfolio_images: [String],
  bio: String,
  social_links: {
    instagram: String,
    twitter: String,
    linkedin: String
  },
  measurements: {
    bust: String,
    waist: String,
    hips: String,
    shoe_size: String
  },
  admin_notes: String
});

// Update the updated_at timestamp before saving
modelSchema.pre('save', function(next) {
  this.updated_at = new Date();
  next();
});

export const Model = models.Model || model<IModel>('Model', modelSchema); 