// app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from '@/lib/mongodb';
import mongoose from 'mongoose';

// Define Contact Schema
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  company: String,
  project: String,
  budget: String,
  message: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});

// Create model if it doesn't exist
const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, project, budget, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const mongoose = await connectToDatabase();
    if (!mongoose) {
      throw new Error('Failed to connect to database');
    }

    const contact = new Contact({
      name,
      email,
      company,
      project,
      budget,
      message,
      created_at: new Date()
    });

    await contact.save();

    return NextResponse.json(
      { success: true, id: contact._id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
