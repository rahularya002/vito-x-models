'use server'

import { revalidatePath } from 'next/cache'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import connectDB from '@/lib/mongodb'
import Product from '@/models/Product'
import { Types } from 'mongoose'

interface MongoProduct {
  _id: Types.ObjectId;
  name: string;
  collection_name: string;
  category: string;
  description: string;
  target_audience: string;
  status: string;
  brand: string;
  user_id: string;
  mongodb_user_id: string;
  product_images: Array<{
    _id: Types.ObjectId;
    url: string;
    type: string;
    created_at: Date;
  }>;
  created_at: Date;
  updated_at: Date;
}

export async function createProduct(formData: FormData) {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/login')
  }
  
  const name = formData.get('name') as string
  const category = formData.get('category') as string
  const description = formData.get('description') as string
  const targetAudience = formData.get('targetAudience') as string
  
  if (!name || !category || !description || !targetAudience) {
    return { error: 'All fields are required' }
  }
  
  try {
    await connectDB()
      
    // Process image URLs to ensure they are complete Cloudinary URLs
    const imageUrls = formData.getAll('imageUrl').map(url => {
      const urlStr = url.toString()
      if (urlStr.startsWith('http')) {
        return urlStr
      }
      return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${urlStr}`
    })
    
    // Create product with images
    const product = await Product.create({
        name,
      collection_name: 'vb',
        category,
        description,
        target_audience: targetAudience,
        status: 'pending',
      brand: 'vb',
      user_id: session.user.id,
      mongodb_user_id: session.user.id,
      product_images: formData.getAll('imageType').map((type, index) => ({
        url: imageUrls[index],
        type,
        created_at: new Date()
      }))
      })
    
    revalidatePath('/dashboard/products')
    return { success: true, productId: product.id }
  } catch (err) {
    console.error('Error in createProduct:', err)
    return { error: 'Failed to create product' }
  }
}

export async function getProducts() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/login')
  }
  
  try {
    await connectDB()
    
    const products = await Product.find({ user_id: session.user.id })
      .sort({ created_at: -1 })
      .lean()
    
    // Transform the products to match the Product interface
    const transformedProducts = products.map(product => {
      const p = product as unknown as MongoProduct;
      return {
        id: p._id.toString(),
        name: p.name,
        collection_name: p.collection_name,
        category: p.category,
        description: p.description,
        target_audience: p.target_audience,
        status: p.status,
        brand: p.brand,
        user_id: p.user_id,
        mongodb_user_id: p.mongodb_user_id,
        product_images: p.product_images.map(img => ({
          id: img._id.toString(),
          url: img.url, // URL should already be complete from createProduct
          type: img.type,
          created_at: img.created_at.toISOString()
        })),
        created_at: p.created_at.toISOString(),
        updated_at: p.updated_at.toISOString()
      }
    })
    
    return { products: transformedProducts }
  } catch (err) {
    console.error('Error in getProducts:', err)
    return { error: 'Failed to fetch products' }
  }
}

export async function getProduct(id: string) {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/login')
  }
  
  try {
    await connectDB()
    
    const product = await Product.findOne({
      _id: id,
      user_id: session.user.id
    }).lean()
    
    if (!product) {
      return { error: 'Product not found' }
    }
    
    return { product }
  } catch (err) {
    console.error('Error in getProduct:', err)
    return { error: 'Failed to fetch product' }
  }
}

export async function deleteProduct(id: string) {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/login')
  }
  
  try {
    await connectDB()
    
    const product = await Product.findOne({
      _id: id,
      user_id: session.user.id
    })
      
    if (!product) {
      return { error: 'Not authorized to delete this product' }
    }
    
    await Product.deleteOne({ _id: id })
    
    revalidatePath('/dashboard/products')
    return { success: true }
  } catch (err) {
    console.error('Error in deleteProduct:', err)
    return { error: 'Failed to delete product' }
  }
}
