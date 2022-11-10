create or replace function core.reorder_indexes()
returns trigger as $$
    DECLARE
        rec RECORD;
    begin
        FOR rec IN
            select * from core.sections order by index
        LOOP
        update core.sections
        set index = rec.index +1
        where id = rec.id and rec.index >= NEW.index and id != NEW.id;
    END LOOP;
    RETURN NEW;
    end;
$$ language plpgsql;

create trigger run_reorder_indexes before Insert on core.sections for each row execute PROCEDURE core.reorder_indexes();
