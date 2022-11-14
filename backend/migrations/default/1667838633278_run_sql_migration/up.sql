CREATE OR REPLACE FUNCTION core.set_comments_author()
RETURNS TRIGGER AS $$
DECLARE session_variables json;
BEGIN
  session_variables := current_setting('hasura.user', 't')::JSON;
  NEW.author_id := (SELECT id FROM core.users WHERE user_id = session_variables ->> 'x-hasura-user-id');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_comments_author
  BEFORE INSERT ON core.comments
  FOR EACH ROW EXECUTE PROCEDURE core.set_comments_author();
