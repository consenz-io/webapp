CREATE OR REPLACE FUNCTION core.agreement_threshold(agreements_row core.agreements)
    RETURNS NUMERIC
    LANGUAGE sql
    STABLE
AS $$
    SELECT consensus.* * voters.* AS threshold
    FROM core.agreement_consensus_average(agreements_row.*) consensus
    CROSS JOIN LATERAL core.agreeement_voters_count(agreements_row.*) voters
$$;
