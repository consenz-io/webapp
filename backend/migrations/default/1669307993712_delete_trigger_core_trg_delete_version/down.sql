CREATE TRIGGER "trg_delete_version"
AFTER DELETE ON "core"."section_versions"
FOR EACH ROW EXECUTE FUNCTION trgfunc_delete_section_row();
