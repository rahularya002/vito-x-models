import { Schema, model, models } from 'mongoose';

export interface IProductRequest {
  _id: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  created_at: Date;
  updated_at: Date;
  product_images: string[];
  name: string;
  description: string;
  category: string;
  subcategory: string;
  brand: string;
  price: number;
  colors: string[];
  sizes: string[];
  material: string;
  admin_notes?: string;
  rejection_reason?: string;
  approved_by?: string;
  approved_at?: Date;
  rejected_by?: string;
  rejected_at?: Date;
  completed_at?: Date;
  client: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    avatar_url?: string;
  };
  assigned_model?: {
    id: string;
    name: string;
    avatar_url?: string;
  };
  shoot_details?: {
    date?: Date;
    location?: string;
    duration?: string;
    requirements?: string[];
    notes?: string;
  };
}

const productRequestSchema = new Schema<IProductRequest>({
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'completed'],
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
  product_images: [{
    type: String,
    required: true
  }],
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  subcategory: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  colors: [{
    type: String,
    required: true
  }],
  sizes: [{
    type: String,
    required: true
  }],
  material: {
    type: String,
    required: true
  },
  admin_notes: String,
  rejection_reason: String,
  approved_by: String,
  approved_at: Date,
  rejected_by: String,
  rejected_at: Date,
  completed_at: Date,
  client: {
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: String,
    avatar_url: String
  },
  assigned_model: {
    id: String,
    name: String,
    avatar_url: String
  },
  shoot_details: {
    date: Date,
    location: String,
    duration: String,
    requirements: [String],
    notes: String
  }
});

// Update the updated_at timestamp before saving
productRequestSchema.pre('save', function(next) {
  this.updated_at = new Date();
  next();
});

export const ProductRequest = models.ProductRequest || model<IProductRequest>('ProductRequest', productRequestSchema); 