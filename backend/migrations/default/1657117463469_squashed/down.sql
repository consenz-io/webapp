
alter table "core"."agreements" rename column "group_id" to "group";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "core"."agreements" add column "name" text
--  not null;
alter table "core"."agreements" drop column "name";
DROP TABLE "core"."agreements";
