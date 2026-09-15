-- =============================================================
-- 理论笔记 云端表（与值日表 roster、题库 qbank、错题本 wrong 同构：id=1 + data jsonb）
-- 在 Supabase 控制台 → SQL Editor 里整段执行一次即可。
-- 之后回到网页，页面加载时会自动把理论笔记同步到本表。
-- =============================================================

create table if not exists public.notes (
  id          bigint primary key,
  data        jsonb not null,
  updated_at  timestamptz not null default now()
);

-- 授权给匿名/已登录角色（浏览器用 publishable key 走 anon 角色）
grant all on public.notes to anon, authenticated;

alter table public.notes enable row level security;

drop policy if exists "notes_public_select" on public.notes;
create policy "notes_public_select"
  on public.notes for select using (true);

drop policy if exists "notes_public_insert" on public.notes;
create policy "notes_public_insert"
  on public.notes for insert with check (true);

drop policy if exists "notes_public_update" on public.notes;
create policy "notes_public_update"
  on public.notes for update using (true);
