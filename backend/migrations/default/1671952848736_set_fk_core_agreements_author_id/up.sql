alter table "core"."agreements"
  add constraint "agreements_author_id_fkey"
  foreign key ("author_id")
  references "core"."users"
  ("id") on update restrict on delete restrict;
