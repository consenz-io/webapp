CREATE OR REPLACE FUNCTION core.update_current_version_and_consensus()
RETURNS trigger AS $$
  -- Cast INTEGER values to NUMERIC to get decimal precision from the new_consensus formula below.
  DECLARE upvotes NUMERIC;
  DECLARE downvotes NUMERIC;
  DECLARE threshold NUMERIC;
  DECLARE total_agreement_users NUMERIC;
  DECLARE new_consensus NUMERIC(6,3);
BEGIN
  -- Load voting and threshold data for the new/updated vote's section and version.
  SELECT COUNT(DISTINCT user_id) INTO upvotes
    FROM core.votes v
    WHERE type='up' AND version_id=NEW.version_id
  ;
  SELECT COUNT(DISTINCT user_id) INTO downvotes
    FROM core.votes v
    WHERE v.type='down' AND v.version_id=NEW.version_id
  ;
  SELECT sv.threshold INTO threshold
    FROM core.section_versions sv
    WHERE sv.id=NEW.version_id
  ;
  SELECT core.agreeement_voters_count(a) INTO total_agreement_users
    FROM core.agreements a
    LEFT JOIN core.chapters c ON c.agreement_id=a.id 
    LEFT JOIN core.sections s ON s.chapter_id=c.id 
    LEFT JOIN core.section_versions sv ON sv.section_id=s.id 
    WHERE sv.id=NEW.version_id
    LIMIT 1
  ;
  -- If section version upvotes - downvotes >= threshold change current_version of the relevant section to this version.
  IF ((upvotes - downvotes) >= threshold) THEN
    UPDATE core.sections AS s
      SET current_version_id=NEW.version_id
      FROM core.section_versions sv 
      WHERE s.id=sv.section_id AND sv.id=NEW.version_id
    ;
  END IF;
  -- Set the agreement consensus to upvotes - downvotes / total_agreement_users
  new_consensus := ((upvotes - downvotes) / total_agreement_users);
  IF (total_agreement_users > 0) THEN 
    UPDATE core.section_versions AS sv
      SET consensus=new_consensus
      WHERE sv.id=NEW.version_id
    ;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_current_version_and_consensus_on_vote
  AFTER INSERT OR UPDATE ON core.votes
  FOR EACH ROW EXECUTE PROCEDURE core.update_current_version_and_consensus();
