-- Clean Shopper — products table
-- Paste this into the Supabase SQL editor once, before seed.sql.

create table products (
  id bigint generated always as identity primary key,
  image text not null,
  image_alt text not null,
  brand text not null,
  name text not null,
  verdict text not null check (verdict in ('clean', 'caution', 'avoid')),
  note text not null,
  highlights text[] not null default '{}',
  category text not null,
  created_at timestamptz not null default now()
);

-- Single-user V1, no auth — permissive RLS is intentional, not an oversight.
alter table products enable row level security;

create policy "public read" on products
  for select using (true);

create policy "public insert" on products
  for insert with check (true);
