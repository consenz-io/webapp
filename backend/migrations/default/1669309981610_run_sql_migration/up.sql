CREATE OR REPLACE FUNCTION trgfunc_delete_section_row()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
        DECLARE _section_id_to_delete INTEGER;
        DECLARE _is_last_version BOOLEAN;
    BEGIN
        _section_id_to_delete = OLD.section_id;
        SELECT COUNT(id) AS NumberOfVersions FROM core.section_versions WHERE section_id = _section_id_to_delete; 
        -- IF NumberOfVersions = 1 THEN
        --     RAISE EXCEPTION 'aaaaaaaaaaaa';
        -- END IF;

        DELETE FROM core.sections WHERE id = _section_id_to_delete;
        
        RETURN NULL;
    END;
$BODY$;

CREATE TRIGGER trg_delete_version
  AFTER DELETE 
  ON core.section_versions
  FOR EACH ROW
  EXECUTE PROCEDURE trgfunc_delete_section_row();
