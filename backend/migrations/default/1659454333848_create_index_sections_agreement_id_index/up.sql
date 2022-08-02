CREATE  INDEX "sections_agreement_id_index" on
  "core"."sections" using btree ("agreement_id", "index");
