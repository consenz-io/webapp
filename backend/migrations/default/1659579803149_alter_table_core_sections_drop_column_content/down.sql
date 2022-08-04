alter table "core"."sections" alter column "content" drop not null;
alter table "core"."sections" add column "content" text;
