-- Create profiles table
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  username text unique null,
  role text default 'user',
  status text default 'active',
  avatar_url text,
  company_name text,
  industry text,
  phone text,
  address text,
  city text,
  country text,
  bio text,
  notification_settings jsonb default '{
    "emailCampaigns": true,
    "emailProducts": true,
    "emailModels": true,
    "emailAnalytics": false,
    "pushCampaigns": true,
    "pushProducts": true,
    "pushModels": true,
    "pushAnalytics": false
  }',
  privacy_settings jsonb default '{
    "profileVisibility": "public",
    "dataSharing": true,
    "marketingEmails": true
  }',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.profiles enable row level security;

-- Drop existing policies if they exist
drop policy if exists "Public profiles are viewable by everyone." on profiles;
drop policy if exists "Users can insert their own profile." on profiles;
drop policy if exists "Users can update own profile." on profiles;

-- Create policies
create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- Create products table
create table if not exists public.products (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  mongodb_user_id text,
  name text not null,
  collection text,
  category text,
  description text,
  target_audience text,
  status text default 'pending',
  brand text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security for products
alter table public.products enable row level security;

-- Drop existing policies if they exist
drop policy if exists "Users can view their own products." on products;
drop policy if exists "Users can insert their own products." on products;
drop policy if exists "Users can update their own products." on products;
drop policy if exists "Users can delete their own products." on products;

-- Create policies for products
create policy "Users can view their own products."
  on products for select
  using ( auth.uid() = user_id );

create policy "Service role can view all products."
  on products for select
  using (true);

create policy "Users can insert their own products."
  on products for insert
  with check ( auth.uid() = user_id );

create policy "Users can update their own products."
  on products for update
  using ( auth.uid() = user_id );

create policy "Users can delete their own products."
  on products for delete
  using ( auth.uid() = user_id );

-- Create product_images table
create table if not exists public.product_images (
  id uuid default gen_random_uuid() primary key,
  product_id uuid references products on delete cascade not null,
  url text not null,
  type text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security for product_images
alter table public.product_images enable row level security;

-- Drop existing policies if they exist
drop policy if exists "Users can view images of their own products." on product_images;
drop policy if exists "Users can insert images for their own products." on product_images;
drop policy if exists "Users can delete images of their own products." on product_images;
drop policy if exists "Anyone can insert product images with valid product_id." on product_images;

-- Create policies for product_images
create policy "Users can view images of their own products."
  on product_images for select
  using (
    exists (
      select 1 from products
      where products.id = product_images.product_id
      and products.user_id = auth.uid()
    )
  );

create policy "Service role can select product images."
  on product_images for select
  using (true);

create policy "Service role can insert product images."
  on product_images for insert
  with check (true);

create policy "Users can insert images for their own products."
  on product_images for insert
  with check (
    exists (
      select 1 from products
      where products.id = product_images.product_id
      and products.user_id = auth.uid()
    )
  );

create policy "Users can delete images of their own products."
  on product_images for delete
  using (
    exists (
      select 1 from products
      where products.id = product_images.product_id
      and products.user_id = auth.uid()
    )
  );

-- Special policy for uploading images from API route with service role
create policy "Anyone can insert product images with valid product_id."
  on product_images for insert
  with check (
    exists (
      select 1 from products
      where products.id = product_images.product_id
    )
  );

-- Create function to handle user creation
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (
    id, 
    full_name, 
    username, 
    role, 
    status,
    company_name,
    industry
  )
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    coalesce(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'role', 'user'),
    'active',
    new.raw_user_meta_data->>'company_name',
    new.raw_user_meta_data->>'industry'
  );
  return new;
end;
$$ language plpgsql security definer;

-- Create trigger for new user creation
create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user(); 