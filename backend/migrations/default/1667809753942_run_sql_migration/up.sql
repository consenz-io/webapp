CREATE OR REPLACE FUNCTION core.agreement_threshold(agreements_row core.agreements)
 RETURNS numeric
 LANGUAGE sql
 STABLE
AS $function$
    SELECT 
        CASE
            WHEN voters.* = 0 OR consensus.* = 0 THEN 2
            ELSE ceil(consensus.* * voters.*)
        END AS threshold
    FROM core.agreement_consensus_average(agreements_row.*) consensus
    CROSS JOIN LATERAL core.agreeement_voters_count(agreements_row.*) voters
$function$;
