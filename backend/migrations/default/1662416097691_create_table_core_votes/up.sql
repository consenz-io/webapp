CREATE TABLE "core"."votes" ("user_id" integer NOT NULL, "suggestion_id" integer NOT NULL, "type" text NOT NULL, PRIMARY KEY ("user_id","suggestion_id") , FOREIGN KEY ("user_id") REFERENCES "core"."users"("id") ON UPDATE cascade ON DELETE cascade, FOREIGN KEY ("suggestion_id") REFERENCES "core"."suggestions"("id") ON UPDATE cascade ON DELETE cascade, CONSTRAINT "type_is_valid_value" CHECK (type IN ('up', 'down')));