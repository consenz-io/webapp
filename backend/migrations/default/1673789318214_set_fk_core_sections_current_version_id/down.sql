alter table "core"."sections" drop constraint "sections_current_version_id_fkey",
  add constraint "sections_current_version_id_fkey"
  foreign key ("current_version_id")
  references "core"."section_versions"
  ("id") on update restrict on delete restrict;
