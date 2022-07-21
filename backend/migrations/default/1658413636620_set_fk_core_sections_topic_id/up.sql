alter table "core"."sections"
  add constraint "sections_topic_id_fkey"
  foreign key ("topic_id")
  references "core"."topics"
  ("id") on update restrict on delete cascade;
