
ALTER TABLE "core"."users" ALTER COLUMN "user_id" TYPE text;

alter table "core"."users" add column "provider" text
 null default 'auth0';

alter table "core"."users" alter column "provider" set not null;

BEGIN TRANSACTION;
ALTER TABLE "core"."users" DROP CONSTRAINT "users_pkey";

ALTER TABLE "core"."users"
    ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id", "email", "user_id");
COMMIT TRANSACTION;
