import 'dotenv/config';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import connectToDatabase from '../lib/mongodb.js';
import { User } from '../app/models/User.js';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function createAdminUser() {
  try {
    // Connect to database
    const mongoose = await connectToDatabase();
    if (!mongoose) {
      throw new Error('Failed to connect to database');
    }

    // Find the user with admin@gmail.com
    const user = await User.findOne({ email: 'admin@gmail.com' });
    if (!user) {
      console.log('No user found with email admin@gmail.com');
      process.exit(1);
    }

    // Update the user's role to admin
    user.role = 'admin';
    user.status = 'active';
    await user.save();
    
    console.log('Successfully updated user to admin role:', user.email);
    process.exit(0);
  } catch (error) {
    console.error('Error updating admin user:', error);
    process.exit(1);
  }
}

createAdminUser(); 