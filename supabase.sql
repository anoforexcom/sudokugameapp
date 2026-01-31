-- Create profiles table
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  name text,
  email text,
  avatar text,
  total_score bigint default 0,
  credits integer default 50,
  sound_enabled boolean default true,
  music_enabled boolean default true,
  selected_track_index integer default 0,
  referral_code text unique,
  referred_by text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create levels_completed table
create table levels_completed (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  level_id integer not null,
  completed_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, level_id)
);

-- Create purchases table
create table purchases (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  credits integer not null,
  amount numeric(10, 2) not null,
  currency text not null,
  status text check (status in ('pending', 'completed', 'failed')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create chat_messages table
create table chat_messages (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade, -- can be null for bots
  sender text not null,
  text text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS)
alter table profiles enable row level security;
alter table levels_completed enable row level security;
alter table purchases enable row level security;
alter table chat_messages enable row level security;

-- Profiles: Users can view all, but update only their own
create policy "Public profiles are viewable by everyone." on profiles for select using (true);
create policy "Users can update own profile." on profiles for update using (auth.uid() = id);

-- Levels Completed: Users can view all (for leaderboards), but update only their own
create policy "Levels completed are viewable by everyone." on levels_completed for select using (true);
create policy "Users can insert their own progress." on levels_completed for insert with check (auth.uid() = user_id);

-- Purchases: Users can view only their own
create policy "Users can view own purchases." on purchases for select using (auth.uid() = user_id);
create policy "Users can insert own purchases." on purchases for insert with check (auth.uid() = user_id);

-- Chat: Everyone can view, but only authenticated users can insert (bots handle their own)
create policy "Chat messages are viewable by everyone." on chat_messages for select using (true);
create policy "Authenticated users can insert chat messages." on chat_messages for insert with check (auth.role() = 'authenticated');

-- Trigger to automatically create profile on signup
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, name, email, referral_code)
  values (new.id, new.raw_user_meta_data->>'name', new.email, lower(substring(md5(random()::text) from 1 for 8)));
  return new;
end;
$$ language plpgsql security definer;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
