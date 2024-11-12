-- Enable RLS (Row Level Security)
alter table auth.users enable row level security;

-- Create custom types
create type user_role as enum ('admin', 'user');
create type listing_status as enum ('pending', 'active', 'rejected');
create type message_status as enum ('unread', 'read', 'archived');
create type report_status as enum ('open', 'in_progress', 'resolved');
create type link_type as enum ('dofollow', 'nofollow', 'both');

-- Create profiles table (extends auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade,
  username text unique not null,
  email text unique not null,
  phone text unique not null,
  whatsapp text,
  telegram text,
  role user_role default 'user',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (id)
);

-- Rest of the schema remains unchanged as it's already role-agnostic
-- Create categories table
create table public.categories (
  id serial primary key,
  name text unique not null,
  slug text unique not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create websites table
create table public.websites (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  url text unique not null,
  title text not null,
  description text not null,
  category_id integer references public.categories not null,
  da integer not null check (da >= 0 and da <= 100),
  traffic text,
  price decimal not null check (price >= 20),
  show_price boolean default true,
  link_type link_type not null,
  status listing_status default 'pending',
  turnaround text not null,
  guidelines text[] not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create requirements table
create table public.requirements (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  category_id integer references public.categories not null,
  description text not null,
  min_da integer not null check (min_da >= 0 and min_da <= 100),
  min_traffic text,
  budget decimal not null check (budget > 0),
  turnaround text not null,
  status listing_status default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create messages table
create table public.messages (
  id uuid default gen_random_uuid() primary key,
  sender_id uuid references auth.users on delete cascade not null,
  receiver_id uuid references auth.users on delete cascade not null,
  website_id uuid references public.websites on delete cascade,
  subject text not null,
  content text not null,
  status message_status default 'unread',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create reports table
create table public.reports (
  id uuid default gen_random_uuid() primary key,
  reporter_id uuid references auth.users on delete cascade not null,
  reported_id uuid references auth.users on delete cascade not null,
  message_id uuid references public.messages on delete cascade,
  reason text not null,
  status report_status default 'open',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  resolved_at timestamp with time zone
);

-- Create notifications table
create table public.notifications (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  title text not null,
  content text not null,
  read boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on all tables
alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.websites enable row level security;
alter table public.requirements enable row level security;
alter table public.messages enable row level security;
alter table public.reports enable row level security;
alter table public.notifications enable row level security;

-- Create RLS policies
-- Profiles: Users can read all profiles but only update their own
create policy "Profiles are viewable by everyone"
  on public.profiles for select
  using (true);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Categories: Everyone can read, only admins can modify
create policy "Categories are viewable by everyone"
  on public.categories for select
  using (true);

create policy "Only admins can modify categories"
  on public.categories for all
  using (exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  ));

-- Websites: Everyone can read active listings, owners can update their own
create policy "Active websites are viewable by everyone"
  on public.websites for select
  using (status = 'active' or auth.uid() = user_id);

create policy "Users can update own websites"
  on public.websites for update
  using (auth.uid() = user_id);

create policy "Users can create websites"
  on public.websites for insert
  with check (auth.uid() = user_id);

-- Requirements: Only admins can see all, users see their own
create policy "Users can view own requirements"
  on public.requirements for select
  using (auth.uid() = user_id or exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  ));

create policy "Users can create requirements"
  on public.requirements for insert
  with check (auth.uid() = user_id);

-- Messages: Users can only see their own messages
create policy "Users can view own messages"
  on public.messages for select
  using (auth.uid() = sender_id or auth.uid() = receiver_id);

create policy "Users can send messages"
  on public.messages for insert
  with check (auth.uid() = sender_id);

-- Reports: Users can create reports, only admins can view all
create policy "Users can create reports"
  on public.reports for insert
  with check (auth.uid() = reporter_id);

create policy "Only admins can view all reports"
  on public.reports for select
  using (exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  ));

-- Notifications: Users can only see their own notifications
create policy "Users can view own notifications"
  on public.notifications for select
  using (auth.uid() = user_id);

-- Create indexes for better performance
create index profiles_username_idx on public.profiles (username);
create index profiles_email_idx on public.profiles (email);
create index websites_user_id_idx on public.websites (user_id);
create index websites_category_id_idx on public.websites (category_id);
create index websites_status_idx on public.websites (status);
create index messages_sender_id_idx on public.messages (sender_id);
create index messages_receiver_id_idx on public.messages (receiver_id);
create index messages_status_idx on public.messages (status);
create index reports_status_idx on public.reports (status);
create index notifications_user_id_idx on public.notifications (user_id);
create index notifications_read_idx on public.notifications (read);

-- Create functions for common operations
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username, email, phone)
  values (new.id, new.raw_user_meta_data->>'username', new.email, new.raw_user_meta_data->>'phone');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger for new user creation
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();