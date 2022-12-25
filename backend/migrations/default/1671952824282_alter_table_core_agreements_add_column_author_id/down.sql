-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "core"."agreements" add column "author_id" integer
--  null;

ALTER TABLE "core"."agreements" DROP COLUMN "author_id";