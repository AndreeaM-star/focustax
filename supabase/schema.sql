-- FocusTax Manager — Supabase Schema
-- Run this in the Supabase SQL Editor: https://supabase.com/dashboard/project/huaualvggakvfaamdotx/sql

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ── Companies (Firme) ────────────────────────────────────
create table if not exists public.companies (
  id              uuid primary key default uuid_generate_v4(),
  nume            text not null,
  cui             text not null unique,
  forma_juridica  text default 'SRL',
  capital_social  numeric(12,2),
  adresa          text,
  telefon         text,
  email           text,
  banca_principala text,
  iban            text,
  contact_nume    text,
  contact_telefon text,
  contact_email   text,
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);

-- ── Facturi ──────────────────────────────────────────────
create table if not exists public.facturi (
  id              uuid primary key default uuid_generate_v4(),
  company_id      uuid references public.companies(id) on delete cascade,
  numar           text not null,
  client          text not null,
  cui_client      text,
  valoare         numeric(12,2) not null,
  tva             numeric(12,2) not null,
  data            date not null,
  scadenta        date,
  status          text default 'in_asteptare'
    check (status in ('validata','in_asteptare','respinsa','draft')),
  descriere       text,
  anaf_id         text,
  created_at      timestamptz default now(),
  unique(company_id, numar)
);

-- ── Angajati ─────────────────────────────────────────────
create table if not exists public.angajati (
  id              uuid primary key default uuid_generate_v4(),
  company_id      uuid references public.companies(id) on delete cascade,
  nume            text not null,
  functie         text not null,
  brut_lunar      numeric(10,2) not null,
  data_angajare   date,
  nr_copii        integer default 0,
  pontaj          integer default 21 check (pontaj between 0 and 23),
  activ           boolean default true,
  created_at      timestamptz default now()
);

-- ── Tranzactii bancare ───────────────────────────────────
create table if not exists public.tranzactii (
  id            uuid primary key default uuid_generate_v4(),
  company_id    uuid references public.companies(id) on delete cascade,
  banca         text not null,
  tip           text check (tip in ('credit','debit')),
  suma          numeric(12,2) not null,
  descriere     text,
  reconciliat   boolean default false,
  factura_ref   text,
  data          date not null default current_date,
  created_at    timestamptz default now()
);

-- ── ANAF OAuth Tokens ────────────────────────────────────
create table if not exists public.anaf_tokens (
  id            uuid primary key default uuid_generate_v4(),
  access_token  text not null,
  refresh_token text,
  expires_at    timestamptz,
  cui           text,
  created_at    timestamptz default now()
);

-- ── Row Level Security — open for demo ───────────────────
alter table public.companies    enable row level security;
alter table public.facturi      enable row level security;
alter table public.angajati     enable row level security;
alter table public.tranzactii   enable row level security;
alter table public.anaf_tokens  enable row level security;

drop policy if exists "allow_all_companies"  on public.companies;
drop policy if exists "allow_all_facturi"    on public.facturi;
drop policy if exists "allow_all_angajati"   on public.angajati;
drop policy if exists "allow_all_tranzactii" on public.tranzactii;
drop policy if exists "allow_all_tokens"     on public.anaf_tokens;

create policy "allow_all_companies"  on public.companies  for all using (true) with check (true);
create policy "allow_all_facturi"    on public.facturi    for all using (true) with check (true);
create policy "allow_all_angajati"   on public.angajati   for all using (true) with check (true);
create policy "allow_all_tranzactii" on public.tranzactii for all using (true) with check (true);
create policy "allow_all_tokens"     on public.anaf_tokens for all using (true) with check (true);

-- ── Seed data — Demo Company ─────────────────────────────
insert into public.companies (nume, cui, forma_juridica, capital_social, adresa, email, banca_principala, contact_nume, contact_email)
values
  ('Demo SRL', 'RO12345678', 'SRL', 10000, 'Str. Demo 1, București', 'contact@demo.ro', 'BT', 'Ion Manager', 'manager@demo.ro')
on conflict (cui) do nothing;
