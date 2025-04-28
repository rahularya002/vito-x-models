'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { redirect } from 'next/navigation'

export async function getModels(filters?: {
  gender?: string
  style?: string
  ageRange?: string
}) {
  const supabase = createServerActionClient({ cookies })
  
  const {
    data: { session },
  } = await supabase.auth.getSession()
  
  if (!session) {
    redirect('/login')
  }
  
  let query = supabase
    .from('models')
    .select('*')
    .order('created_at', { ascending: false })
  
  // Apply filters if provided
  if (filters) {
    if (filters.gender && filters.gender !== 'any') {
      query = query.eq('gender', filters.gender)
    }
    
    if (filters.style && filters.style !== 'any') {
      query = query.eq('style', filters.style)
    }
    
    if (filters.ageRange && filters.ageRange !== 'any') {
      query = query.eq('age_range', filters.ageRange)
    }
  }
  
  const { data, error } = await query
  
  if (error) {
    console.error('Error fetching models:', error)
    return { error: error.message }
  }
  
  return { models: data }
}

export async function getModel(id: string) {
  const supabase = createServerActionClient({ cookies })
  
  const {
    data: { session },
  } = await supabase.auth.getSession()
  
  if (!session) {
    redirect('/login')
  }
  
  const { data, error } = await supabase
    .from('models')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) {
    console.error('Error fetching model:', error)
    return { error: error.message }
  }
  
  return { model: data }
}

export async function assignModelToProduct(productId: string, modelId: string) {
  const supabase = createServerActionClient({ cookies })
  
  const {
    data: { session },
  } = await supabase.auth.getSession()
  
  if (!session) {
    redirect('/login')
  }
  
  // Verify product belongs to user
  const { data: product, error: productError } = await supabase
    .from('products')
    .select('id')
    .eq('id', productId)
    .eq('user_id', session.user.id)
    .single()
  
  if (productError || !product) {
    console.error('Error verifying product ownership:', productError)
    return { error: 'You do not have permission to modify this product' }
  }
  
  // Check if assignment already exists
  const { data: existingAssignment } = await supabase
    .from('model_assignments')
    .select('id')
    .eq('product_id', productId)
    .eq('model_id', modelId)
    .single()
  
  if (existingAssignment) {
    return { error: 'This model is already assigned to this product' }
  }
  
  // Create assignment
  const { error } = await supabase
    .from('model_assignments')
    .insert({
      product_id: productId,
      model_id: modelId,
      status: 'pending',
      created_at: new Date().toISOString(),
    })
  
  if (error) {
    console.error('Error assigning model:', error)
    return { error: error.message }
  }
  
  revalidatePath(`/dashboard/products/${productId}`)
  return { success: true }
}

export async function removeModelAssignment(assignmentId: string) {
  const supabase = createServerActionClient({ cookies })
  
  const {
    data: { session },
  } = await supabase.auth.getSession()
  
  if (!session) {
    redirect('/login')
  }
  
  // Verify assignment belongs to user's product
  const { data: assignment, error: assignmentError } = await supabase
    .from('model_assignments')
    .select('product_id, products!inner(user_id)')
    .eq('id', assignmentId)
    .single()
  
  if (assignmentError || !assignment || assignment.products[0].user_id !== session.user.id) {
    console.error('Error verifying assignment ownership:', assignmentError)
    return { error: 'You do not have permission to modify this assignment' }
  }
  
  // Delete assignment
  const { error } = await supabase
    .from('model_assignments')
    .delete()
    .eq('id', assignmentId)
  
  if (error) {
    console.error('Error removing model assignment:', error)
    return { error: error.message }
  }
  
  revalidatePath(`/dashboard/products/${assignment.product_id}`)
  return { success: true }
}
