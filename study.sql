-- =============================================================
-- 学习课程表 云端表（与值日表 roster、题库 qbank、错题本 wrong、理论笔记 notes 同构：id=1 + data jsonb）
-- 在 Supabase 控制台 → SQL Editor 里整段执行一次即可。
-- 之后回到网页「学习课程表」页，编辑内容会自动同步到本表。
-- =============================================================

create table if not exists public.study (
  id          bigint primary key,
  data        jsonb not null,
  updated_at  timestamptz not null default now()
);

-- 授权给匿名/已登录角色（浏览器用 publishable key 走 anon 角色）
grant all on public.study to anon, authenticated;

alter table public.study enable row level security;

drop policy if exists "study_public_select" on public.study;
create policy "study_public_select"
  on public.study for select using (true);

drop policy if exists "study_public_insert" on public.study;
create policy "study_public_insert"
  on public.study for insert with check (true);

drop policy if exists "study_public_update" on public.study;
create policy "study_public_update"
  on public.study for update using (true);
