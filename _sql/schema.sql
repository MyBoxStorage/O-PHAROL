-- ─────────────────────────────────────────────
-- O PHAROL — Schema v1
-- Rodar no Supabase: SQL Editor → New query
-- ─────────────────────────────────────────────

-- Tabela de reservas
create table if not exists public.reservas (
  id          uuid default gen_random_uuid() primary key,
  user_id     uuid references auth.users(id) on delete cascade not null,
  data        text not null,
  horario     text not null,
  pessoas     text not null,
  mesa        text not null,
  observacoes text,
  status      text default 'pending'
              check (status in ('pending', 'confirmed', 'cancelled')),
  created_at  timestamptz default now()
);

-- Tabela de avaliações
create table if not exists public.avaliacoes (
  id          uuid default gen_random_uuid() primary key,
  user_id     uuid references auth.users(id) on delete cascade not null,
  nota        integer not null check (nota between 1 and 5),
  comentario  text,
  data_visita text,
  created_at  timestamptz default now()
);

-- Row Level Security
alter table public.reservas   enable row level security;
alter table public.avaliacoes enable row level security;

-- Políticas: cada cliente só acessa seus próprios dados
create policy "select_own_reservas"   on public.reservas   for select using (auth.uid() = user_id);
create policy "insert_own_reservas"   on public.reservas   for insert with check (auth.uid() = user_id);
create policy "update_own_reservas"   on public.reservas   for update using (auth.uid() = user_id);

create policy "select_own_avaliacoes" on public.avaliacoes for select using (auth.uid() = user_id);
create policy "insert_own_avaliacoes" on public.avaliacoes for insert with check (auth.uid() = user_id);
