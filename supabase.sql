create table if not exists idea_projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  payload jsonb not null,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

alter table idea_projects enable row level security;

create policy "anon insert idea projects"
  on idea_projects for insert
  to anon
  with check (true);

create policy "anon select idea projects"
  on idea_projects for select
  to anon
  using (true);
