CREATE TABLE "core"."preliminary_agreements" ("id" serial NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "name" text NOT NULL, "group" integer NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("group") REFERENCES "core"."groups"("id") ON UPDATE restrict ON DELETE cascade, UNIQUE ("id"));
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
CREATE TRIGGER "set_core_preliminary_agreements_updated_at"
BEFORE UPDATE ON "core"."preliminary_agreements"
FOR EACH ROW
EXECUTE PROCEDURE "core"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_core_preliminary_agreements_updated_at" ON "core"."preliminary_agreements" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
