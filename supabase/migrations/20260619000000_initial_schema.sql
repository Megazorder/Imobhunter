-- Sprint 2: initial database model for ImobHunter
-- PostgreSQL/Supabase migration with UUID primary keys, timestamps, FKs, indexes and RLS.

create extension if not exists pgcrypto;

create type public.company_member_role as enum ('owner', 'admin', 'agent');
create type public.property_status as enum ('draft', 'available', 'reserved', 'sold', 'rented', 'archived');
create type public.property_purpose as enum ('sale', 'rent', 'sale_or_rent');
create type public.client_status as enum ('active', 'inactive', 'converted', 'archived');
create type public.lead_status as enum ('new', 'contacted', 'qualified', 'proposal', 'won', 'lost', 'archived');
create type public.lead_source as enum ('site', 'portal', 'referral', 'social_media', 'whatsapp', 'phone', 'email', 'other');
create type public.interaction_type as enum ('note', 'call', 'email', 'whatsapp', 'meeting', 'visit', 'proposal', 'status_change');

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  phone text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.companies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  legal_name text,
  document_number text,
  phone text,
  email text,
  website text,
  address_line text,
  city text,
  state text,
  postal_code text,
  country text not null default 'BR',
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint companies_document_number_unique unique (document_number)
);

create table public.company_members (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  role public.company_member_role not null default 'agent',
  invited_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint company_members_company_profile_unique unique (company_id, profile_id)
);

create table public.properties (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  created_by uuid references public.profiles(id) on delete set null,
  assigned_to uuid references public.profiles(id) on delete set null,
  title text not null,
  description text,
  status public.property_status not null default 'draft',
  purpose public.property_purpose not null,
  property_type text not null,
  price numeric(14,2),
  condominium_fee numeric(14,2),
  iptu_amount numeric(14,2),
  bedrooms integer,
  bathrooms integer,
  suites integer,
  parking_spaces integer,
  private_area numeric(10,2),
  total_area numeric(10,2),
  address_line text not null,
  address_number text,
  address_complement text,
  neighborhood text,
  city text not null,
  state text not null,
  postal_code text,
  latitude numeric(10,7),
  longitude numeric(10,7),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint properties_price_non_negative check (price is null or price >= 0),
  constraint properties_bedrooms_non_negative check (bedrooms is null or bedrooms >= 0),
  constraint properties_bathrooms_non_negative check (bathrooms is null or bathrooms >= 0),
  constraint properties_parking_non_negative check (parking_spaces is null or parking_spaces >= 0)
);

create table public.property_images (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  storage_path text not null,
  alt_text text,
  display_order integer not null default 0,
  is_cover boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.property_documents (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  storage_path text not null,
  document_type text not null,
  file_name text not null,
  mime_type text,
  file_size_bytes bigint,
  uploaded_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint property_documents_file_size_non_negative check (file_size_bytes is null or file_size_bytes >= 0)
);

create table public.clients (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  assigned_to uuid references public.profiles(id) on delete set null,
  full_name text not null,
  email text,
  phone text,
  document_number text,
  status public.client_status not null default 'active',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.leads (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  property_id uuid references public.properties(id) on delete set null,
  client_id uuid references public.clients(id) on delete set null,
  assigned_to uuid references public.profiles(id) on delete set null,
  full_name text not null,
  email text,
  phone text,
  source public.lead_source not null default 'other',
  status public.lead_status not null default 'new',
  message text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.lead_interactions (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads(id) on delete cascade,
  profile_id uuid references public.profiles(id) on delete set null,
  interaction_type public.interaction_type not null,
  content text not null,
  next_follow_up_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index companies_created_by_idx on public.companies(created_by);
create index company_members_profile_id_idx on public.company_members(profile_id);
create index company_members_company_id_idx on public.company_members(company_id);
create index properties_company_id_idx on public.properties(company_id);
create index properties_status_idx on public.properties(status);
create index properties_city_state_idx on public.properties(city, state);
create index property_images_property_id_idx on public.property_images(property_id);
create index property_documents_property_id_idx on public.property_documents(property_id);
create index clients_company_id_idx on public.clients(company_id);
create index clients_assigned_to_idx on public.clients(assigned_to);
create index leads_company_id_idx on public.leads(company_id);
create index leads_property_id_idx on public.leads(property_id);
create index leads_client_id_idx on public.leads(client_id);
create index leads_status_idx on public.leads(status);
create index lead_interactions_lead_id_idx on public.lead_interactions(lead_id);

create trigger set_profiles_updated_at before update on public.profiles for each row execute function public.set_updated_at();
create trigger set_companies_updated_at before update on public.companies for each row execute function public.set_updated_at();
create trigger set_company_members_updated_at before update on public.company_members for each row execute function public.set_updated_at();
create trigger set_properties_updated_at before update on public.properties for each row execute function public.set_updated_at();
create trigger set_property_images_updated_at before update on public.property_images for each row execute function public.set_updated_at();
create trigger set_property_documents_updated_at before update on public.property_documents for each row execute function public.set_updated_at();
create trigger set_clients_updated_at before update on public.clients for each row execute function public.set_updated_at();
create trigger set_leads_updated_at before update on public.leads for each row execute function public.set_updated_at();
create trigger set_lead_interactions_updated_at before update on public.lead_interactions for each row execute function public.set_updated_at();

create or replace function public.current_user_company_ids()
returns setof uuid
language sql
security definer
set search_path = public
stable
as $$
  select cm.company_id
  from public.company_members cm
  where cm.profile_id = auth.uid()
$$;

create or replace function public.is_company_member(target_company_id uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from public.company_members cm
    where cm.company_id = target_company_id
      and cm.profile_id = auth.uid()
  )
$$;

create or replace function public.is_company_admin(target_company_id uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from public.company_members cm
    where cm.company_id = target_company_id
      and cm.profile_id = auth.uid()
      and cm.role in ('owner', 'admin')
  )
$$;

alter table public.profiles enable row level security;
alter table public.companies enable row level security;
alter table public.company_members enable row level security;
alter table public.properties enable row level security;
alter table public.property_images enable row level security;
alter table public.property_documents enable row level security;
alter table public.clients enable row level security;
alter table public.leads enable row level security;
alter table public.lead_interactions enable row level security;

create policy "Users can read their own profile and company peers" on public.profiles
  for select using (
    id = auth.uid()
    or exists (
      select 1
      from public.company_members viewer
      join public.company_members peer on peer.company_id = viewer.company_id
      where viewer.profile_id = auth.uid()
        and peer.profile_id = profiles.id
    )
  );
create policy "Users can insert their own profile" on public.profiles
  for insert with check (id = auth.uid());
create policy "Users can update their own profile" on public.profiles
  for update using (id = auth.uid()) with check (id = auth.uid());

create policy "Members can read their companies" on public.companies
  for select using (public.is_company_member(id));
create policy "Authenticated users can create companies" on public.companies
  for insert with check (auth.uid() is not null and created_by = auth.uid());
create policy "Company admins can update companies" on public.companies
  for update using (public.is_company_admin(id)) with check (public.is_company_admin(id));
create policy "Company owners can delete companies" on public.companies
  for delete using (
    exists (select 1 from public.company_members cm where cm.company_id = companies.id and cm.profile_id = auth.uid() and cm.role = 'owner')
  );

create policy "Members can read memberships in their companies" on public.company_members
  for select using (public.is_company_member(company_id));
create policy "Company admins can add members" on public.company_members
  for insert with check (public.is_company_admin(company_id));
create policy "Company admins can update members" on public.company_members
  for update using (public.is_company_admin(company_id)) with check (public.is_company_admin(company_id));
create policy "Company admins can remove members" on public.company_members
  for delete using (public.is_company_admin(company_id));

create policy "Members can read company properties" on public.properties
  for select using (public.is_company_member(company_id));
create policy "Members can create company properties" on public.properties
  for insert with check (public.is_company_member(company_id));
create policy "Members can update company properties" on public.properties
  for update using (public.is_company_member(company_id)) with check (public.is_company_member(company_id));
create policy "Company admins can delete properties" on public.properties
  for delete using (public.is_company_admin(company_id));

create policy "Members can read property images" on public.property_images
  for select using (exists (select 1 from public.properties p where p.id = property_images.property_id and public.is_company_member(p.company_id)));
create policy "Members can create property images" on public.property_images
  for insert with check (exists (select 1 from public.properties p where p.id = property_images.property_id and public.is_company_member(p.company_id)));
create policy "Members can update property images" on public.property_images
  for update using (exists (select 1 from public.properties p where p.id = property_images.property_id and public.is_company_member(p.company_id))) with check (exists (select 1 from public.properties p where p.id = property_images.property_id and public.is_company_member(p.company_id)));
create policy "Members can delete property images" on public.property_images
  for delete using (exists (select 1 from public.properties p where p.id = property_images.property_id and public.is_company_member(p.company_id)));

create policy "Members can read property documents" on public.property_documents
  for select using (exists (select 1 from public.properties p where p.id = property_documents.property_id and public.is_company_member(p.company_id)));
create policy "Members can create property documents" on public.property_documents
  for insert with check (exists (select 1 from public.properties p where p.id = property_documents.property_id and public.is_company_member(p.company_id)));
create policy "Members can update property documents" on public.property_documents
  for update using (exists (select 1 from public.properties p where p.id = property_documents.property_id and public.is_company_member(p.company_id))) with check (exists (select 1 from public.properties p where p.id = property_documents.property_id and public.is_company_member(p.company_id)));
create policy "Members can delete property documents" on public.property_documents
  for delete using (exists (select 1 from public.properties p where p.id = property_documents.property_id and public.is_company_admin(p.company_id)));

create policy "Members can read company clients" on public.clients
  for select using (public.is_company_member(company_id));
create policy "Members can create company clients" on public.clients
  for insert with check (public.is_company_member(company_id));
create policy "Members can update company clients" on public.clients
  for update using (public.is_company_member(company_id)) with check (public.is_company_member(company_id));
create policy "Company admins can delete clients" on public.clients
  for delete using (public.is_company_admin(company_id));

create policy "Members can read company leads" on public.leads
  for select using (public.is_company_member(company_id));
create policy "Members can create company leads" on public.leads
  for insert with check (public.is_company_member(company_id));
create policy "Members can update company leads" on public.leads
  for update using (public.is_company_member(company_id)) with check (public.is_company_member(company_id));
create policy "Company admins can delete leads" on public.leads
  for delete using (public.is_company_admin(company_id));

create policy "Members can read lead interactions" on public.lead_interactions
  for select using (exists (select 1 from public.leads l where l.id = lead_interactions.lead_id and public.is_company_member(l.company_id)));
create policy "Members can create lead interactions" on public.lead_interactions
  for insert with check (exists (select 1 from public.leads l where l.id = lead_interactions.lead_id and public.is_company_member(l.company_id)));
create policy "Members can update lead interactions" on public.lead_interactions
  for update using (exists (select 1 from public.leads l where l.id = lead_interactions.lead_id and public.is_company_member(l.company_id))) with check (exists (select 1 from public.leads l where l.id = lead_interactions.lead_id and public.is_company_member(l.company_id)));
create policy "Company admins can delete lead interactions" on public.lead_interactions
  for delete using (exists (select 1 from public.leads l where l.id = lead_interactions.lead_id and public.is_company_admin(l.company_id)));
