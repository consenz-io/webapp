alter table "core"."sections"
  add constraint "sections_agreement_id_fkey"
  foreign key (agreement_id)
  references "core"."agreements"
  (id) on update restrict on delete cascade;
alter table "core"."sections" alter column "agreement_id" drop not null;
alter table "core"."sections" add column "agreement_id" int4;
