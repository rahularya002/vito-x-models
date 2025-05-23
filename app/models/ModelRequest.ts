import { Schema, model, models } from 'mongoose';

export interface IModelRequest {
  _id: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: Date;
  updated_at: Date;
  portfolio_images: string[];
  profiles: {
    full_name: string;
    email: string;
    avatar_url: string | null;
    password: string;
  };
  credits?: number;
  admin_notes?: string;
  rejection_reason?: string;
  approved_by?: string;
  approved_at?: Date;
  rejected_by?: string;
  rejected_at?: Date;
  additional_info?: {
    age?: number;
    gender?: string;
    measurements?: {
      bust?: string;
      waist?: string;
      hips?: string;
      shoe_size?: string;
    };
    bio?: string;
    social_links?: {
      instagram?: string;
      twitter?: string;
      linkedin?: string;
    };
  };
}

const modelRequestSchema = new Schema<IModelRequest>({
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
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
  portfolio_images: [{
    type: String,
    default: []
  }],
  profiles: {
    full_name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    avatar_url: {
      type: String,
      default: null
    },
    password: {
      type: String,
      required: true
    }
  },
  credits: {
    type: Number,
    default: 0
  },
  admin_notes: String,
  rejection_reason: String,
  approved_by: String,
  approved_at: Date,
  rejected_by: String,
  rejected_at: Date,
  additional_info: {
    age: Number,
    gender: String,
    measurements: {
      bust: String,
      waist: String,
      hips: String,
      shoe_size: String
    },
    bio: String,
    social_links: {
      instagram: String,
      twitter: String,
      linkedin: String
    }
  }
});

// Update the updated_at timestamp before saving
modelRequestSchema.pre('save', function(next) {
  this.updated_at = new Date();
  next();
});

export const ModelRequest = models.ModelRequest || model<IModelRequest>('ModelRequest', modelRequestSchema); 