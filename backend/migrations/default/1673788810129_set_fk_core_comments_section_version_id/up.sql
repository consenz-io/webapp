alter table "core"."comments" drop constraint "comments_section_version_id_fkey",
  add constraint "comments_section_version_id_fkey"
  foreign key ("section_version_id")
  references "core"."section_versions"
  ("id") on update restrict on delete cascade;
