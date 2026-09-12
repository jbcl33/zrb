-- =============================================================
-- 低压电工题库 云端表（与值日表 roster 同构：id=1 + data jsonb）
-- 在 Supabase 控制台 → SQL Editor 里整段执行一次即可。
-- 之后回到网页「电工刷题」页点「同步题库到云端」按钮上传 868 题。
-- =============================================================

create table if not exists public.qbank (
  id          bigint primary key,
  data        jsonb not null,
  updated_at  timestamptz not null default now()
);

-- 授权给匿名/已登录角色（浏览器用 publishable key 走 anon 角色）
grant all on public.qbank to anon, authenticated;

alter table public.qbank enable row level security;

drop policy if exists "qbank_public_select" on public.qbank;
create policy "qbank_public_select"
  on public.qbank for select using (true);

drop policy if exists "qbank_public_insert" on public.qbank;
create policy "qbank_public_insert"
  on public.qbank for insert with check (true);

drop policy if exists "qbank_public_update" on public.qbank;
create policy "qbank_public_update"
  on public.qbank for update using (true);
