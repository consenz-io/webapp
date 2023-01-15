-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
CREATE OR REPLACE FUNCTION core.section_version_score(version_row core.section_versions)
  RETURNS NUMERIC
  LANGUAGE plpgsql
  STABLE
AS $$
DECLARE
  upvotes float;
  downvotes float;
  total_agreement_users float;
BEGIN
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
