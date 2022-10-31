-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- CREATE OR REPLACE FUNCTION core.set_section_version_author()
-- RETURNS TRIGGER AS $$
-- DECLARE session_variables json;
-- BEGIN
--   session_variables := current_setting('hasura.user', 't')::JSON;
--   NEW.author_id := (SELECT id FROM core.users WHERE user_id = session_variables ->> 'x-hasura-user-id');
--   RETURN NEW;
-- END;
-- $$ LANGUAGE plpgsql;
--
-- CREATE TRIGGER set_section_version_author
--   BEFORE INSERT ON core.section_versions
--   FOR EACH ROW EXECUTE PROCEDURE core.set_section_version_author();
DROP TRIGGER IF EXISTS set_section_version_author ON core.section_versions;
DROP FUNCTION IF EXISTS core.set_section_version_author;