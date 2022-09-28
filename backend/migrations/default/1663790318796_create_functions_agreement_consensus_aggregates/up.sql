CREATE OR REPLACE FUNCTION core.agreement_consensus_average(agreements_row core.agreements)
    RETURNS NUMERIC
    LANGUAGE sql
    STABLE
AS $$
    SELECT AVG(sv.consensus)::NUMERIC(10,2)
    FROM core.chapters c LEFT JOIN core.sections s ON s.chapter_id=c.id LEFT JOIN core.section_versions sv ON sv.section_id=s.id
    WHERE c.agreement_id=agreements_row.id AND sv.consensus IS NOT NULL
$$;

CREATE OR REPLACE FUNCTION core.agreeement_voters_count(agreements_row core.agreements)
    RETURNS BIGINT
    LANGUAGE sql
    STABLE
AS $$
    SELECT COUNT(DISTINCT v.user_id)
    FROM core.chapters c LEFT JOIN core.sections s ON s.chapter_id=c.id LEFT JOIN core.section_versions sv ON sv.section_id=s.id LEFT JOIN core.votes v ON v.version_id=sv.id
    WHERE c.agreement_id=agreements_row.id
$$;
