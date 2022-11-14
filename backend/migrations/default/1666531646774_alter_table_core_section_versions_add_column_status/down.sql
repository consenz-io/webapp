-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "core"."section_versions" add column "status" text
--  not null default 'pending';
ALTER TABLE "core"."section_versions" 
DROP COLUMN "status" CASCADE;