CREATE TABLE "core"."sections" ("id" serial NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "index" integer NOT NULL, "agreement_id" integer NOT NULL, "topic_id" integer NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("agreement_id") REFERENCES "core"."agreements"("id") ON UPDATE restrict ON DELETE cascade, UNIQUE ("agreement_id", "index"));
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
CREATE TRIGGER "set_core_sections_updated_at"
BEFORE UPDATE ON "core"."sections"
FOR EACH ROW
EXECUTE PROCEDURE "core"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_core_sections_updated_at" ON "core"."sections" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
