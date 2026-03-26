-- FocusTax Manager — Supabase Schema
-- Run this in the Supabase SQL Editor: https://supabase.com/dashboard/project/huaualvggakvfaamdotx/sql

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ── Facturi ──────────────────────────────────────────────
create table if not exists public.facturi (
  id          uuid primary key default uuid_generate_v4(),
  numar       text not null unique,
  client      text not null,
  cui_client  text,
  valoare     numeric(12,2) not null,
  tva         numeric(12,2) not null,
  data        date not null,
  scadenta    date,
  status      text default 'in_asteptare'
    check (status in ('validata','in_asteptare','respinsa','draft')),
  descriere   text,
  anaf_id     text,
  created_at  timestamptz default now()
);

-- ── Angajati ─────────────────────────────────────────────
create table if not exists public.angajati (
  id              uuid primary key default uuid_generate_v4(),
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
alter table public.facturi       enable row level security;
alter table public.angajati      enable row level security;
alter table public.tranzactii    enable row level security;
alter table public.anaf_tokens   enable row level security;

drop policy if exists "allow_all_facturi"     on public.facturi;
drop policy if exists "allow_all_angajati"    on public.angajati;
drop policy if exists "allow_all_tranzactii"  on public.tranzactii;
drop policy if exists "allow_all_tokens"      on public.anaf_tokens;

create policy "allow_all_facturi"    on public.facturi    for all using (true) with check (true);
create policy "allow_all_angajati"   on public.angajati   for all using (true) with check (true);
create policy "allow_all_tranzactii" on public.tranzactii for all using (true) with check (true);
create policy "allow_all_tokens"     on public.anaf_tokens for all using (true) with check (true);

-- ── Seed data — Demo SRL ─────────────────────────────────
insert into public.facturi (numar, client, cui_client, valoare, tva, data, scadenta, status, descriere)
values
  ('F2026-0847', 'Alpha Tech SRL',      'RO44556677', 3200,  608,    '2026-03-26', '2026-04-25', 'validata',     'Servicii consultanță IT'),
  ('F2026-0846', 'Beta Construct SA',   'RO11223344', 12450, 2365.5, '2026-03-25', '2026-04-24', 'validata',     'Materiale construcții'),
  ('F2026-0845', 'Gamma Logistic SRL',  'RO88990011', 5800,  1102,   '2026-03-24', '2026-04-23', 'in_asteptare', 'Transport marfă'),
  ('F2026-0844', 'Delta Food SRL',      'RO22334455', 940,   84.6,   '2026-03-23', '2026-04-22', 'in_asteptare', 'Produse alimentare TVA 9%'),
  ('F2026-0843', 'Epsilon Media SRL',   'RO66778899', 2100,  399,    '2026-03-22', '2026-04-21', 'respinsa',     'Servicii publicitate')
on conflict (numar) do nothing;

insert into public.angajati (nume, functie, brut_lunar, data_angajare, nr_copii, pontaj)
values
  ('Ion Popescu',       'Developer Senior',  8500,  '2023-03-01', 1, 21),
  ('Maria Ionescu',     'Project Manager',   9200,  '2022-06-15', 2, 20),
  ('Andrei Georgescu',  'Designer UX',       6800,  '2024-01-10', 0, 21),
  ('Elena Dumitrescu',  'Account Manager',   5500,  '2023-09-01', 0, 19),
  ('Mihai Stanescu',    'DevOps Engineer',   10200, '2021-11-20', 3, 21)
on conflict do nothing;

insert into public.tranzactii (banca, tip, suma, descriere, reconciliat, factura_ref, data)
values
  ('bt',  'credit',  12450, 'Plată client Alpha Tech SRL',     true,  'F2026-0839', '2026-03-26'),
  ('rev', 'debit',  -3200,  'Factură furnizor curent electric', true,  'P2026-0122', '2026-03-26'),
  ('bcr', 'credit',  8900,  'Plată client Beta Construct SA',  true,  'F2026-0835', '2026-03-25'),
  ('bt',  'debit',  -1580,  'Chirie sediu Martie',             false, null,          '2026-03-25'),
  ('rz',  'credit',  5800,  'Plată client Gamma Logistic',     true,  'F2026-0831', '2026-03-24'),
  ('bt',  'debit',  -940,   'Furnizor Delta Food SRL',         false, null,          '2026-03-24'),
  ('bcr', 'credit',  3100,  'Avans proiect client nou',        false, null,          '2026-03-23'),
  ('rev', 'debit',  -2100,  'Publicitate online',              true,  'P2026-0118', '2026-03-23')
on conflict do nothing;
