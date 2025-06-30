import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import connectToDatabase from '@/lib/mongodb'
import { ModelRequest } from '@/app/models/ModelRequest'
import { Model } from '@/app/models/Model'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { fullName, email, password, gender, dateOfBirth, cityState, phone, instagramHandle } = body

    console.log('Model signup attempt:', { email, fullName })

    // Validate required fields
    if (!fullName || !email || !password || !gender || !dateOfBirth || !cityState || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Connect to database
    const mongoose = await connectToDatabase()
    if (!mongoose || !mongoose.connection.db) {
      throw new Error('Failed to connect to database')
    }

    console.log('Connected to database:', mongoose.connection.db.databaseName)

    // Check if model or request already exists
    const [existingModel, existingRequest] = await Promise.all([
      Model.findOne({ email }),
      ModelRequest.findOne({ 'profiles.email': email })
    ])

    console.log('Existing records found:', {
      model: existingModel ? { id: existingModel._id, email: existingModel.email } : null,
      request: existingRequest ? { id: existingRequest._id, email: existingRequest.profiles.email } : null
    })

    if (existingModel || existingRequest) {
      return NextResponse.json(
        { error: 'A model with this email already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create new model request with hashed password
    const modelRequest = new ModelRequest({
      status: 'pending',
      profiles: {
        full_name: fullName,
        email: email,
        avatar_url: null,
        password: hashedPassword // Store hashed password for later use
      },
      additional_info: {
        gender,
        age: calculateAge(new Date(dateOfBirth)),
        bio: `${fullName} from ${cityState}`,
        social_links: {
          instagram: instagramHandle
        }
      },
      created_at: new Date(),
      updated_at: new Date()
    })

    // Create a Model with pending status for login purposes
    const model = new Model({
      full_name: fullName,
      email: email,
      password: hashedPassword,
      status: 'pending',
      username: email.split('@')[0],
      gender,
      created_at: new Date(),
      updated_at: new Date()
    })

    console.log('Attempting to save records...')

    // Save both records
    await Promise.all([
      modelRequest.save(),
      model.save()
    ])

    console.log('Records saved successfully:', {
      modelId: model._id,
      requestId: modelRequest._id
    })

    // Get the created request without sensitive data
    const createdRequest = await ModelRequest.findById(modelRequest._id).lean()

    return NextResponse.json({
      message: 'Model application submitted successfully',
      request: createdRequest
    }, { status: 201 })
  } catch (error: unknown) {
    console.error('Model signup error:', error)
    if (error && typeof error === 'object' && 'code' in error && error.code === 11000) {
      console.error('Duplicate key error:', (error as { keyPattern?: unknown }).keyPattern)
      return NextResponse.json(
        { error: 'A model with this email or username already exists' },
        { status: 409 }
      )
    }
    return NextResponse.json(
      { error: 'Error creating model request' },
      { status: 500 }
    )
  }
}

// Helper function to calculate age
function calculateAge(birthDate: Date): number {
  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  
  return age
} 