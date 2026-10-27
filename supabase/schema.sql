-- ===========================================================================
-- BLACK FORTRESS × DWIGHT HOWARD — applications schema + access rules
--
-- How to apply: Supabase Dashboard → SQL Editor → New query → paste → Run.
-- Safe to re-run (idempotent). No Supabase Auth setup is needed.
--
-- ACCESS MODEL (matches the app's static /admin password, by request):
--   The site talks to Supabase with the publishable key only. Key-holders may
--   * INSERT applications — but only the 6 content columns; id/status/
--     timestamps come from defaults, and new rows are forced to 'pending';
--   * SELECT, DELETE, and UPDATE of the status column ONLY (applicant data
--     itself can never be edited).
--   All values are re-validated here with CHECK constraints, so a hand-made
--   REST call cannot store garbage.
--
--   ⚠ LIMITATION, stated plainly: because the admin password is checked in
--   the browser, read/delete rights belong to the PUBLISHABLE KEY, not to a
--   verified admin. Anyone who extracts the key from the site could list or
--   delete applications via the REST API. Acceptable for a small pre-launch
--   tool; if that ever stops being acceptable, switch to a Supabase Auth
--   admin user + authenticated-only policies (ask and this can be restored).
-- ===========================================================================

-- ---------------------------------------------------------------------------
-- 1) Table
-- ---------------------------------------------------------------------------
create table if not exists public.applications (
  id               uuid primary key default gen_random_uuid(),
  first_name       text not null,
  last_name        text not null,
  email            text not null,
  phone            text not null,           -- normalized: optional +, 7-15 digits
  youtube_url      text not null,           -- original link (https-normalized)
  youtube_video_id text not null,           -- canonical 11-char id
  status           text not null default 'pending',
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),

  constraint applications_first_name_len
    check (char_length(btrim(first_name)) between 1 and 100),
  constraint applications_last_name_len
    check (char_length(btrim(last_name)) between 1 and 100),
  constraint applications_email_format
    check (char_length(email) <= 254
           and email ~* '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]{2,}$'),
  constraint applications_phone_format
    check (phone ~ '^\+?[0-9]{7,15}$'),
  constraint applications_youtube_url_shape
    check (char_length(youtube_url) <= 2048
           and youtube_url ~* '^https://((www\.|m\.)?youtube\.com|(www\.)?youtu\.be)/'),
  constraint applications_video_id_format
    check (youtube_video_id ~ '^[A-Za-z0-9_-]{11}$'),
  constraint applications_status_allowed
    check (status in ('pending', 'reviewing', 'reviewed'))
);

comment on table  public.applications is
  'Pre-registration applications submitted from the public landing page.';
comment on column public.applications.youtube_video_id is
  'Parsed client-side from an allowlisted YouTube host, re-validated here.';
comment on column public.applications.status is
  'pending → reviewing → reviewed; the only column that may be updated.';

create index if not exists applications_created_at_idx
  on public.applications (created_at desc);
create index if not exists applications_status_idx
  on public.applications (status);

-- ---------------------------------------------------------------------------
-- 2) updated_at trigger (fires regardless of the caller's column privileges)
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists applications_set_updated_at on public.applications;
create trigger applications_set_updated_at
  before update on public.applications
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- 3) Privileges (hard gate, checked before RLS; replaces Supabase's broad
--    default grants on new tables)
-- ---------------------------------------------------------------------------
revoke all on table public.applications from anon;
revoke all on table public.applications from authenticated;

-- Inserts may only supply the application fields; id/status/timestamps come
-- from column defaults, so a status can never be set on insert.
grant insert (first_name, last_name, email, phone, youtube_url, youtube_video_id)
  on table public.applications to anon, authenticated;

-- Admin operations (performed with the publishable key — see header note):
-- read + delete + update of status ONLY. updated_at needs no grant — the
-- trigger sets it, and column privileges apply only to columns named in the
-- UPDATE statement itself.
grant select, delete on table public.applications to anon, authenticated;
grant update (status) on table public.applications to anon, authenticated;

-- ---------------------------------------------------------------------------
-- 4) Row Level Security
-- ---------------------------------------------------------------------------
alter table public.applications enable row level security;

drop policy if exists "anon can submit pending applications" on public.applications;
drop policy if exists "submit pending applications" on public.applications;
create policy "submit pending applications"
  on public.applications for insert
  to anon, authenticated
  with check (status = 'pending');

drop policy if exists "admin can read applications" on public.applications;
drop policy if exists "read applications" on public.applications;
create policy "read applications"
  on public.applications for select
  to anon, authenticated
  using (true);

drop policy if exists "admin can update application status" on public.applications;
drop policy if exists "update application status" on public.applications;
create policy "update application status"
  on public.applications for update
  to anon, authenticated
  using (true)
  with check (status in ('pending', 'reviewing', 'reviewed'));

drop policy if exists "admin can delete applications" on public.applications;
drop policy if exists "delete applications" on public.applications;
create policy "delete applications"
  on public.applications for delete
  to anon, authenticated
  using (true);
