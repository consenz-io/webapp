CREATE OR REPLACE FUNCTION core.section_version_score(version_row core.section_versions)
  RETURNS NUMERIC
  LANGUAGE plpgsql
  STABLE
AS $$
DECLARE 
  upvotes float;
  downvotes float;
  total_agreement_users float;
  current_version int;
BEGIN
  SELECT current_version_id FROM core.sections WHERE id=version_row.section_id INTO current_version;
  IF (current_version = version_row.id) THEN
    RETURN 0;
  END IF;
  SELECT core.section_versions_count_votes_up(version_row) INTO upvotes;
  SELECT core.section_versions_count_votes_down(version_row) INTO downvotes;
  SELECT core.agreeement_voters_count(a) INTO total_agreement_users
    FROM core.agreements a
    LEFT JOIN core.chapters c ON c.agreement_id=a.id 
    LEFT JOIN core.sections s ON s.chapter_id=c.id 
    LEFT JOIN core.section_versions sv ON sv.section_id=s.id 
    WHERE sv.id=version_row.id
    LIMIT 1
  ;
  IF (total_agreement_users > 0) THEN 
    RETURN ((upvotes - downvotes) / total_agreement_users);
  ELSE
    return 0;
  END IF;
END;
$$;
