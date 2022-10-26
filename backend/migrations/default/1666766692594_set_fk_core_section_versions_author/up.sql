alter table "core"."section_versions"
  add constraint "section_versions_author_fkey"
  foreign key ("author")
  references "core"."users"
  ("id") on update restrict on delete no action;
