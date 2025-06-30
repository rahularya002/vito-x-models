import { Schema, model, models } from 'mongoose';

export interface IProduct {
  _id: string;
  name: string;
  collection_name: string;
  category: string;
  description: string;
  target_audience: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  brand: string;
  user_id: string;
  mongodb_user_id: string;
  product_images: Array<{
    _id: string;
    url: string;
    type: string;
    created_at: Date;
  }>;
  created_at: Date;
  updated_at: Date;
}

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  collection_name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  target_audience: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected', 'completed'],
    default: 'pending'
  },
  brand: { type: String, required: true },
  user_id: { type: String, required: true },
  mongodb_user_id: { type: String, required: true },
  product_images: [{
    url: { type: String, required: true },
    type: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
  }],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

// Add indexes
productSchema.index({ user_id: 1 });
productSchema.index({ status: 1 });
productSchema.index({ created_at: -1 });
productSchema.index({ collection_name: 1 });
productSchema.index({ category: 1 });

// Add toJSON transform
productSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    ret.created_at = ret.created_at.toISOString();
    ret.updated_at = ret.updated_at.toISOString();
    ret.product_images = ret.product_images.map((img: any) => ({
      id: img._id.toString(),
      url: img.url,
      type: img.type,
      created_at: img.created_at.toISOString()
    }));
    return ret;
  }
});

export default models.Product || model<IProduct>('Product', productSchema); 