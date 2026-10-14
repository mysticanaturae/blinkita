create table if not exists public.younique_profiles (
    id uuid primary key references auth.users(id) on delete cascade,
    full_name text not null default '',
    avatar_url text,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create table if not exists public.younique_memberships (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references auth.users(id) on delete cascade,
    plan text not null default 'FREE'
        check (plan in ('FREE', 'BASIC', 'PREMIUM', 'VIP')),
    status text not null default 'inactive'
        check (status in (
            'inactive', 'pending', 'active',
            'past_due', 'cancelled'
        )),
    provider text,
    provider_subscription_id text unique,
    current_period_end timestamptz,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create index if not exists younique_memberships_user_id_idx
    on public.younique_memberships(user_id);

alter table public.younique_profiles enable row level security;
alter table public.younique_memberships enable row level security;

revoke all on public.younique_profiles from anon;
revoke all on public.younique_memberships from anon;

grant select, update on public.younique_profiles to authenticated;
grant select on public.younique_memberships to authenticated;

drop policy if exists "Users can read own Younique profile"
    on public.younique_profiles;

create policy "Users can read own Younique profile"
    on public.younique_profiles
    for select to authenticated
    using ((select auth.uid()) = id);

drop policy if exists "Users can update own Younique profile"
    on public.younique_profiles;

create policy "Users can update own Younique profile"
    on public.younique_profiles
    for update to authenticated
    using ((select auth.uid()) = id)
    with check ((select auth.uid()) = id);

drop policy if exists "Users can read own Younique membership"
    on public.younique_memberships;

create policy "Users can read own Younique membership"
    on public.younique_memberships
    for select to authenticated
    using ((select auth.uid()) = user_id);

create or replace function public.younique_handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $function$
begin
    insert into public.younique_profiles (id, full_name)
    values (
        new.id,
        coalesce(new.raw_user_meta_data ->> 'full_name', '')
    )
    on conflict (id) do nothing;

    return new;
end;
$function$;

drop trigger if exists on_younique_auth_user_created on auth.users;

create trigger on_younique_auth_user_created
after insert on auth.users
for each row execute function public.younique_handle_new_user();

insert into public.younique_profiles (id, full_name)
select
    u.id,
    coalesce(u.raw_user_meta_data ->> 'full_name', '')
from auth.users as u
on conflict (id) do nothing;