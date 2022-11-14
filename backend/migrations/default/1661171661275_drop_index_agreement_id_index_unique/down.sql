CREATE  INDEX "agreement_id_index_unique" on
  "core"."sections" using btree ("agreement_id", "index");
