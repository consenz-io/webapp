CREATE OR REPLACE FUNCTION core.section_version_hasura_user_vote(section_versions_row core.section_versions, hasura_session json)
    RETURNS TEXT
    LANGUAGE sql
    STABLE
AS $$
    SELECT v.type
    FROM core.votes v LEFT JOIN core.users u ON u.id=v.user_id
    WHERE v.version_id=section_versions_row.id AND u.user_id = hasura_session ->> 'x-hasura-user-id'
    LIMIT 1
$$;
