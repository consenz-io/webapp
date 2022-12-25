CREATE OR REPLACE FUNCTION core.set_author_id()
RETURNS TRIGGER AS $$
DECLARE session_variables json;
BEGIN
  session_variables := current_setting('hasura.user', 't')::JSON;
  NEW.author_id := (SELECT id FROM core.users WHERE user_id = session_variables ->> 'x-hasura-user-id');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_author_id
  BEFORE INSERT ON core.agreements
  FOR EACH ROW EXECUTE PROCEDURE core.set_author_id();
