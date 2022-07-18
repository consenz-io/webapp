alter table "core"."agreements"
  add constraint "agreements_category_fkey"
  foreign key ("category")
  references "core"."categories"
  ("id") on update restrict on delete set null;
