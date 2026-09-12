-- =============================================================
-- 低压电工 错题本 云端表（与值日表 roster、题库 qbank 同构：id=1 + data jsonb）
-- 在 Supabase 控制台 → SQL Editor 里整段执行一次即可。
-- 之后回到网页「电工刷题」页，页面加载时会自动把 335 道错题同步到本表。
-- =============================================================

create table if not exists public.wrong (
  id          bigint primary key,
  data        jsonb not null,
  updated_at  timestamptz not null default now()
);

-- 授权给匿名/已登录角色（浏览器用 publishable key 走 anon 角色）
grant all on public.wrong to anon, authenticated;

alter table public.wrong enable row level security;

drop policy if exists "wrong_public_select" on public.wrong;
create policy "wrong_public_select"
  on public.wrong for select using (true);

drop policy if exists "wrong_public_insert" on public.wrong;
create policy "wrong_public_insert"
  on public.wrong for insert with check (true);

drop policy if exists "wrong_public_update" on public.wrong;
create policy "wrong_public_update"
  on public.wrong for update using (true);
