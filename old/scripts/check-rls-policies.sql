-- Check if RLS is enabled on the products table
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'products';

-- List all policies on the products table
SELECT 
  policyname, 
  tablename, 
  permissive, 
  roles, 
  cmd, 
  qual
FROM pg_policies
WHERE tablename = 'products';

-- Check if RLS is enabled on the product_images table
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'product_images';

-- List all policies on the product_images table
SELECT 
  policyname, 
  tablename, 
  permissive, 
  roles, 
  cmd, 
  qual
FROM pg_policies
WHERE tablename = 'product_images';

-- Check if auth_users table exists and if RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'auth_users'; 