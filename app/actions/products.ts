'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { redirect } from 'next/navigation'

export async function createProduct(formData: FormData) {
  const supabase = createServerActionClient({ cookies })
  
  const {
    data: { session },
  } = await supabase.auth.getSession()
  
  if (!session) {
    redirect('/login')
  }
  
  const name = formData.get('name') as string
  const collection = formData.get('collection') as string
  const category = formData.get('category') as string
  const description = formData.get('description') as string
  const targetAudience = formData.get('targetAudience') as string
  
  // Insert product
  const { data: product, error } = await supabase
    .from('products')
    .insert({
      user_id: session.user.id,
      name,
      collection,
      category,
      description,
      target_audience: targetAudience,
      status: 'pending',
      created_at: new Date().toISOString(),
    })
    .select()
    .single()
  
  if (error) {
    console.error('Error creating product:', error)
    return { error: error.message }
  }
  
  // Process images
  const imageTypes = formData.getAll('imageType') as string[]
  const imageFiles = formData.getAll('imageFile') as File[]
  
  for (let i = 0; i < imageTypes.length; i++) {
    const file = imageFiles[i]
    const type = imageTypes[i]
    
    if (!file || !type) continue
    
    // Upload image to storage
    const fileExt = file.name.split('.').pop()
    const fileName = `${product.id}/${type}.${fileExt}`
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(fileName, file)
    
    if (uploadError) {
      console.error('Error uploading image:', uploadError)
      continue
    }
    
    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from('product-images')
      .getPublicUrl(fileName)
    
    // Insert image record
    await supabase.from('product_images').insert({
      product_id: product.id,
      url: publicUrlData.publicUrl,
      type,
      created_at: new Date().toISOString(),
    })
  }
  
  revalidatePath('/dashboard/products')
  return { success: true, productId: product.id }
}

export async function getProducts() {
  const supabase = createServerActionClient({ cookies })
  
  const {
    data: { session },
  } = await supabase.auth.getSession()
  
  if (!session) {
    redirect('/login')
  }
  
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      product_images (*)
    `)
    .eq('user_id', session.user.id)
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching products:', error)
    return { error: error.message }
  }
  
  return { products: data }
}

export async function getProduct(id: string) {
  const supabase = createServerActionClient({ cookies })
  
  const {
    data: { session },
  } = await supabase.auth.getSession()
  
  if (!session) {
    redirect('/login')
  }
  
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      product_images (*),
      model_assignments (
        *,
        models (*)
      )
    `)
    .eq('id', id)
    .eq('user_id', session.user.id)
    .single()
  
  if (error) {
    console.error('Error fetching product:', error)
    return { error: error.message }
  }
  
  return { product: data }
}

export async function deleteProduct(id: string) {
  const supabase = createServerActionClient({ cookies })
  
  const {
    data: { session },
  } = await supabase.auth.getSession()
  
  if (!session) {
    redirect('/login')
  }
  
  // Delete product images from storage
  const { data: images } = await supabase
    .from('product_images')
    .select('url')
    .eq('product_id', id)
  
  if (images) {
    for (const image of images) {
      const path = image.url.split('/').pop()
      await supabase.storage.from('product-images').remove([path])
    }
  }
  
  // Delete product
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id)
    .eq('user_id', session.user.id)
  
  if (error) {
    console.error('Error deleting product:', error)
    return { error: error.message }
  }
  
  revalidatePath('/dashboard/products')
  return { success: true }
}
