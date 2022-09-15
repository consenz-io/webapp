CREATE OR REPLACE FUNCTION core.suggestion_count_votes_up(suggestions_row core.suggestions)
    RETURNS BIGINT
    LANGUAGE sql
    STABLE
AS $$
    SELECT COUNT(1) FROM core.votes WHERE suggestion_id=suggestions_row.id AND type='up'
$$;

CREATE OR REPLACE FUNCTION core.suggestion_count_votes_down(suggestions_row core.suggestions)
    RETURNS BIGINT
    LANGUAGE sql
    STABLE
AS $$
    SELECT COUNT(1) FROM core.votes WHERE suggestion_id=suggestions_row.id AND type='down'
$$;
