alter table "core"."users_groups" add constraint "users_groups_user_id_group_id_key" unique ("user_id", "group_id");
