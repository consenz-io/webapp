-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- CREATE OR REPLACE FUNCTION core.is_agreement_author(agreement core.agreements)
-- RETURNS BOOLEAN
-- LANGUAGE sql
-- STABLE
-- AS $$
--     SELECT agreement.author_id = (SELECT id FROM core.users WHERE user_id = current_setting('hasura.user', 't')::
-- JSON ->> 'x-hasura-user-id')
-- $$;


DROP FUNCTION IF EXISTS core.is_agreement_author;