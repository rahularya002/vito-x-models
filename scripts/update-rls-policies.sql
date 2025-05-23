-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "Service role can view all products" ON products;
DROP POLICY IF EXISTS "Service role can select product images" ON product_images;

-- Create a table for storing auth_users if it doesn't exist
CREATE TABLE IF NOT EXISTS public.auth_users (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  hashed_password TEXT NOT NULL,
  role TEXT DEFAULT 'user'
);

-- Enable RLS on auth_users
ALTER TABLE public.auth_users ENABLE ROW LEVEL SECURITY;

-- Create policy for auth_users
CREATE POLICY "Users can only view their own records" 
  ON auth_users FOR SELECT 
  USING (auth.uid() = id);

-- Create policy for admins to view all products
CREATE POLICY "Admins can view all products"
  ON products FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM auth_users
      WHERE auth_users.id = auth.uid()
      AND auth_users.role = 'admin'
    )
  );

-- Modify policy for users viewing products to ensure they only see their own
DROP POLICY IF EXISTS "Users can view their own products" ON products;
CREATE POLICY "Users can view their own products"
  ON products FOR SELECT
  USING (auth.uid() = user_id);

-- Create policy for admins to view all product images
CREATE POLICY "Admins can view all product images"
  ON product_images FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM auth_users
      WHERE auth_users.id = auth.uid()
      AND auth_users.role = 'admin'
    )
  );

-- Add policy for public products (if needed)
-- This would allow users to see products marked as public
-- Uncomment and modify if you want to implement this feature
/*
CREATE POLICY "Public products are visible to all users"
  ON products FOR SELECT
  USING (status = 'approved' AND is_public = true);
*/

-- Update product_images policies to be more restrictive
DROP POLICY IF EXISTS "Anyone can insert product images with valid product_id" ON product_images;
CREATE POLICY "Authenticated users can insert images for their own products"
  ON product_images FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM products
      WHERE products.id = product_images.product_id
      AND products.user_id = auth.uid()
    )
  );

-- Create policy for admin operations on products
CREATE POLICY "Admins can manage all products"
  ON products FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM auth_users
      WHERE auth_users.id = auth.uid()
      AND auth_users.role = 'admin'
    )
  );

-- Create policy for admin operations on product images
CREATE POLICY "Admins can manage all product images"
  ON product_images FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM auth_users
      WHERE auth_users.id = auth.uid()
      AND auth_users.role = 'admin'
    )
  ); 