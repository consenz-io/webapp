CREATE OR REPLACE FUNCTION core.recalculate_section_version_thresholds()
RETURNS trigger AS $$
DECLARE new_threshold INTEGER;
BEGIN
  -- has the section's current version changed?
  IF (NEW.current_version_id <> OLD.current_version_id) THEN
    -- recalculate the agreement's current threshold
    SELECT core.agreement_threshold(a) INTO new_threshold
      FROM core.agreements a
      LEFT JOIN core.chapters c ON c.agreement_id=a.id
      WHERE c.id=NEW.chapter_id
      LIMIT 1;
    -- repopulate threshold value on all other of the section's versions (i.e., all but the new current version)
    UPDATE core.section_versions AS sv SET threshold=new_threshold
      WHERE sv.section_id=NEW.id AND sv.id <> NEW.current_version_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER recalculate_section_version_thresholds
  AFTER UPDATE ON core.sections
  FOR EACH ROW EXECUTE PROCEDURE core.recalculate_section_version_thresholds();
