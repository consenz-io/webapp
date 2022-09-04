-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "core"."chapters" add column "index" integer
--  not null default '-1';
alter table "core"."chapters" drop column "index";
