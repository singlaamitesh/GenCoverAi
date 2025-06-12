# Supabase Setup Instructions

## 1. Get Your Supabase Credentials

1. Go to your Supabase project dashboard
2. Navigate to Project Settings > API
3. Copy the following values:
   - Project URL (use as `NEXT_PUBLIC_SUPABASE_URL`)
   - Anon/public key (use as `NEXT_PUBLIC_SUPABASE_ANON_KEY`)

## 2. Create a `.env.local` File

Create a new file called `.env.local` in the root of your project with the following content:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

Replace `your-supabase-project-url` and `your-supabase-anon-key` with the values from your Supabase project.

## 3. Set Up Database Tables

Run the following SQL in your Supabase SQL editor to create the necessary tables:

```sql
-- Create a table for designs
create table if not exists public.designs (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  description text,
  price numeric not null,
  image_url text not null,
  style text not null,
  prompt text,
  user_id uuid references auth.users(id) on delete set null
);

-- Create a table for orders
create table if not exists public.orders (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  status text not null default 'pending',
  total numeric not null,
  shipping_address jsonb not null,
  payment_method text not null,
  payment_status text not null default 'pending'
);

-- Create a table for order items
create table if not exists public.order_items (
  id uuid default gen_random_uuid() primary key,
  order_id uuid references public.orders(id) on delete cascade not null,
  design_id uuid references public.designs(id) on delete set null,
  quantity integer not null,
  price numeric not null,
  case_type text not null,
  phone_model jsonb not null
);

-- Create a table for user profiles
create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  updated_at timestamp with time zone,
  username text unique,
  full_name text,
  avatar_url text,
  website text
);

-- Set up Row Level Security (RLS)
alter table public.designs enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.profiles enable row level security;

-- Create policies for public access to designs
create policy "Public designs are viewable by everyone." on public.designs
  for select using (true);

-- Create policies for user-specific data
create policy "Users can insert their own designs." on public.designs
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own designs." on public.designs
  for update using (auth.uid() = user_id);

-- Create a function to handle new user signups
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

-- Create a trigger to handle new user signups
create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

## 4. Enable Authentication

1. Go to the Authentication section in your Supabase dashboard
2. Enable "Email/Password" authentication
3. Optionally, enable other authentication providers as needed

## 5. Configure CORS

1. Go to Project Settings > API
2. Add your development and production domains to the "Site URL" and "Additional Redirect URLs"

## 6. Restart Your Development Server

After setting up the environment variables, restart your Next.js development server for the changes to take effect.

```bash
npm run dev
```
