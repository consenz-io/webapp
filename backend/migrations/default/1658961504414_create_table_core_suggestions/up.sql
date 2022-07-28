CREATE TABLE "core"."suggestions" ("id" serial NOT NULL, "created_at" Timestamp NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "section_id" integer NOT NULL, "content" text NOT NULL, PRIMARY KEY ("id") );
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
CREATE TRIGGER "set_core_suggestions_updated_at"
BEFORE UPDATE ON "core"."suggestions"
FOR EACH ROW
EXECUTE PROCEDURE "core"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_core_suggestions_updated_at" ON "core"."suggestions" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
