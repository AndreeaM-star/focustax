-- Abonați la alertele fiscale pe e-mail (calendar personalizat)
create table if not exists public.abonati_alerte (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  profile text[] not null default '{}',
  sursa text,
  consimtamant_la timestamptz not null default now(),
  dezabonat_la timestamptz,
  token_dezabonare uuid not null default gen_random_uuid(),
  created_at timestamptz not null default now()
);

-- Accesul se face doar din API (cheia service role); fără politici publice
alter table public.abonati_alerte enable row level security;

create index if not exists abonati_alerte_token_idx on public.abonati_alerte (token_dezabonare);
