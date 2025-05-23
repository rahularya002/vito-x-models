# Supabase Row Level Security (RLS) Policies

This document explains the Row Level Security (RLS) policies used in our Supabase database to ensure data security and privacy.

## Overview

Row Level Security in Supabase allows us to restrict which rows users can access in database tables. This ensures that:

1. Users can only see and manipulate their own data
2. Admins have broader access privileges where needed
3. Sensitive data is protected from unauthorized access

## Tables and Policies

### `auth_users` Table

This table stores user authentication information.

| Policy | Description |
|--------|-------------|
| Users can only view their own records | Users can only see their own user information |

### `products` Table

This table stores product information created by users.

| Policy | Description |
|--------|-------------|
| Users can view their own products | Users can only see products they have created |
| Users can insert their own products | Users can only create products with their own user ID |
| Users can update their own products | Users can only modify their own products |
| Users can delete their own products | Users can only delete their own products |
| Admins can view all products | Users with admin role can see all products |
| Admins can manage all products | Users with admin role can manage (create, update, delete) all products |

### `product_images` Table

This table stores images associated with products.

| Policy | Description |
|--------|-------------|
| Users can view images of their own products | Users can only see images for products they own |
| Authenticated users can insert images for their own products | Users can only upload images for products they own |
| Users can delete images of their own products | Users can only delete images for products they own |
| Admins can view all product images | Users with admin role can see all product images |
| Admins can manage all product images | Users with admin role can manage all product images |

## How It Works

1. When a user authenticates with Supabase, they receive a JWT token that includes their user ID.
2. When that user makes a database request, Supabase uses the policies to filter the results.
3. For example, if a regular user queries the `products` table, they'll only see products where `user_id` matches their own ID.
4. If an admin queries the same table, they'll see all products due to the admin-specific policy.

## Implementation

The RLS policies are implemented in SQL and can be found in:
- `scripts/setup-database.sql` (initial setup)
- `scripts/update-rls-policies.sql` (updates to policies)

You can apply these policies by running the SQL scripts against your Supabase database.

## Best Practices

1. Always test RLS policies to ensure they're working as expected
2. Never bypass RLS by using service roles in client-side code
3. Use service roles only in server-side code where necessary
4. Regularly audit and review RLS policies as application requirements change 