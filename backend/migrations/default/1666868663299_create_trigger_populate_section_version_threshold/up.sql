CREATE OR REPLACE FUNCTION core.calculate_section_version_threshold()
RETURNS trigger AS $$
DECLARE threshold INTEGER;
BEGIN
  -- populate section version threshold by the same function used to calculate agreement threshold
  SELECT core.agreement_threshold(a) INTO threshold
    FROM core.agreements a
    LEFT JOIN core.chapters c ON c.agreement_id=a.id
    LEFT JOIN core.sections s ON s.chapter_id=c.id
    WHERE s.id=NEW.section_id 
    LIMIT 1;
  NEW.threshold := threshold;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER populate_section_version_threshold
  BEFORE INSERT ON core.section_versions
  FOR EACH ROW EXECUTE PROCEDURE core.calculate_section_version_threshold();
