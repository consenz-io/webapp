-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- CREATE OR REPLACE FUNCTION core.section_versions_count_votes_up(section_versions_row core.section_versions)
--     RETURNS bigint
--     LANGUAGE sql
--     STABLE
-- AS $function$
--     SELECT COUNT(1) FROM core.votes WHERE version_id=section_versions_row.id AND type='up'
-- $function$;
