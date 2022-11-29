CREATE OR REPLACE FUNCTION trgfunc_delete_section_row()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
        DECLARE _id_to_delete INTEGER;
    BEGIN
        _id_to_delete = OLD.section_id;
        DELETE FROM core.sections WHERE id = _id_to_delete;
        
        RETURN NULL;
    END;
$BODY$;

CREATE TRIGGER trg_delete_version
  AFTER DELETE 
  ON core.section_versions
  FOR EACH ROW
  EXECUTE PROCEDURE trgfunc_delete_section_row();