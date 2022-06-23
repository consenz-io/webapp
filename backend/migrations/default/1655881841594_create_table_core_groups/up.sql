CREATE TABLE "core"."groups" ("id" serial NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "name" text NOT NULL, "slug" text NOT NULL, PRIMARY KEY ("id") , UNIQUE ("id"), UNIQUE ("slug"));
