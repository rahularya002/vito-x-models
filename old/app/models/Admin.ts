import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  password: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
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
adminSchema.pre('save', function(next) {
  this.updated_at = new Date();
  next();
});

const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema);

export default Admin; 