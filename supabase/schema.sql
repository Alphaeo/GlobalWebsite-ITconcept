-- ─────────────────────────────────────────
-- IT-CONCEPT Global Website — Supabase Schema
-- Run this in Supabase SQL Editor
-- ─────────────────────────────────────────

-- ARTICLES
create table if not exists articles (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title_fr text not null default '',
  title_en text not null default '',
  title_ko text not null default '',
  excerpt_fr text default '',
  excerpt_en text default '',
  excerpt_ko text default '',
  content_fr text default '',
  content_en text default '',
  content_ko text default '',
  author text default '',
  tags text[] default '{}',
  cover_url text,
  published boolean default false,
  published_at timestamptz,
  created_at timestamptz default now()
);

-- EVENTS
create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  title_fr text not null default '',
  title_en text not null default '',
  title_ko text not null default '',
  description_fr text default '',
  description_en text default '',
  description_ko text default '',
  event_date timestamptz not null,
  location text default '',
  registration_url text,
  published boolean default false,
  created_at timestamptz default now()
);

-- JOB OFFERS
create table if not exists job_offers (
  id uuid primary key default gen_random_uuid(),
  title_fr text not null default '',
  title_en text not null default '',
  title_ko text not null default '',
  description_fr text default '',
  description_en text default '',
  description_ko text default '',
  contract_type text default 'CDI',
  location text default 'Seoul, Korea',
  deadline timestamptz,
  published boolean default false,
  created_at timestamptz default now()
);

-- RLS: allow public read of published content
alter table articles enable row level security;
alter table events enable row level security;
alter table job_offers enable row level security;

create policy "Public can read published articles"
  on articles for select using (published = true);

create policy "Public can read published events"
  on events for select using (published = true);

create policy "Public can read published jobs"
  on job_offers for select using (published = true);

-- Admin (authenticated) can do everything
create policy "Authenticated users can manage articles"
  on articles for all using (auth.role() = 'authenticated');

create policy "Authenticated users can manage events"
  on events for all using (auth.role() = 'authenticated');

create policy "Authenticated users can manage jobs"
  on job_offers for all using (auth.role() = 'authenticated');

-- Storage bucket for article covers
insert into storage.buckets (id, name, public) values ('covers', 'covers', true)
  on conflict do nothing;

create policy "Public can view covers"
  on storage.objects for select using (bucket_id = 'covers');

create policy "Authenticated can upload covers"
  on storage.objects for insert with check (bucket_id = 'covers' and auth.role() = 'authenticated');

create policy "Authenticated can delete covers"
  on storage.objects for delete using (bucket_id = 'covers' and auth.role() = 'authenticated');
