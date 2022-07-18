-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "core"."agreements" add column "category" integer
--  null unique;
alter table "core"."agreements" drop column "category";