alter table "core"."sections" add constraint "agreement_id_index_unique" unique (agreement_id, index) deferrable initially deferred;
