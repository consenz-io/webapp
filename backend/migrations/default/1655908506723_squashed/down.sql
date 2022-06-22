
alter table "core"."users" drop constraint "users_pkey";
alter table "core"."users"
    add constraint "users_pkey"
    primary key ("id", "email");

alter table "core"."users" alter column "provider" drop not null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "core"."users" add column "provider" text
--  null default 'auth0';

alter table "core"."users" drop column "provider";

ALTER TABLE "core"."users" ALTER COLUMN "user_id" TYPE uuid;
