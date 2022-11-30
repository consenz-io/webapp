CREATE OR REPLACE FUNCTION core.section_versions_comment_count(section_versions_row core.section_versions)
 RETURNS bigint
 LANGUAGE sql
 STABLE
AS $function$
    SELECT COUNT(*) FROM core.comments WHERE section_version_id = section_versions_row.id
$function$;
