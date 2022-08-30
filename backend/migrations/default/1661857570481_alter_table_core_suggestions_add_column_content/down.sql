-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "core"."suggestions" add column "content" json
--  not null;
alter table "cor"."suggestions" drop column "content";