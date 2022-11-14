-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "core"."agreements" add column "is_archived" boolean
--  not null default 'false';
alter table "core"."agreements" drop column "is_archived";