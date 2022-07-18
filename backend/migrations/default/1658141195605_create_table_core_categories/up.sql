CREATE TABLE "core"."categories" ("id" serial NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "group_id" integer NOT NULL, "name" text NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("group_id") REFERENCES "core"."groups"("id") ON UPDATE restrict ON DELETE cascade, UNIQUE ("id"), UNIQUE ("group_id", "name"));COMMENT ON TABLE "core"."categories" IS E'Categories for agreements';
CREATE OR REPLACE FUNCTION "core"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_core_categories_updated_at"
BEFORE UPDATE ON "core"."categories"
FOR EACH ROW
EXECUTE PROCEDURE "core"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_core_categories_updated_at" ON "core"."categories" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
