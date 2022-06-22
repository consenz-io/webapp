-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "core"."users" add column "user_id" uuid
--  not null unique;
alter table "core"."users" drop column "user_id";
