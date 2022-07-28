alter table "core"."suggestions"
  add constraint "suggestions_section_id_fkey"
  foreign key ("section_id")
  references "core"."sections"
  ("id") on update restrict on delete cascade;
