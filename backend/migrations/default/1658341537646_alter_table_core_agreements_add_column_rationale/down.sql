-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "core"."agreements" add column "rationale" text
--  null;
alter table "core"."agreements" drop column "rationale";