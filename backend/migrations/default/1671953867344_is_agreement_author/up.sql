CREATE OR REPLACE FUNCTION core.is_agreement_author(agreement core.agreements, hasura_session json)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
AS $$
    SELECT agreement.author_id = (SELECT id FROM core.users WHERE user_id = hasura_session ->> 'x-hasura-user-id')
$$;
