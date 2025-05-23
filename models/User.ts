import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema({
  id: { type: String, required: true, unique: true }, // Supabase user ID
  full_name: { type: String },
  email: { type: String, required: true, unique: true },
  avatar_url: { type: String },
  credits: { type: Number, default: 0 },
  updated_at: { type: Date, default: Date.now },
  hashed_password: { type: String, required: true },
  company_name: { type: String },
  industry: { type: String },
});

const User = models.User || mongoose.model("User", userSchema);

export default User; 