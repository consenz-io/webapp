alter table "core"."section_versions" add constraint "status_is_valid_value" check (status = ANY (ARRAY['pending'::text, 'accepted'::text, 'rejected'::text]));
