alter table "core"."chapters" alter column "index" drop not null;
alter table "core"."chapters" add column "index" int4;
