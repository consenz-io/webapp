CREATE OR REPLACE FUNCTION core.trgfunc_delete_section_row()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
        DECLARE _section_id_to_delete INTEGER;
        DECLARE _is_last_version BOOLEAN;
        DECLARE _versions_count INTEGER;
        DECLARE _chapter_id INTEGER;
    BEGIN
        _section_id_to_delete = OLD.section_id;
        SELECT COUNT(*) INTO _versions_count FROM core.section_versions WHERE section_id = _section_id_to_delete; 
        SELECT chapter_id INTO _chapter_id FROM core.sections WHERE id = _section_id_to_delete; 
        IF _versions_count = 0 THEN
            DELETE FROM core.sections WHERE id = _section_id_to_delete;
            UPDATE core.sections AS s SET index=n.iterator
            FROM (
                SELECT id, ROW_NUMBER() OVER (ORDER BY index) AS iterator
                FROM core.sections
                WHERE chapter_id=_chapter_id
            ) n
            WHERE n.id=s.id AND s.chapter_id=_chapter_id;
        END IF;

        RETURN NULL;
    END;
$BODY$;

CREATE TRIGGER trg_delete_version
  AFTER DELETE 
  ON core.section_versions
  FOR EACH ROW
  EXECUTE PROCEDURE core.trgfunc_delete_section_row();
