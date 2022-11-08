CREATE OR REPLACE VIEW core.users_public AS
  SELECT id, full_name
    FROM core.users;
