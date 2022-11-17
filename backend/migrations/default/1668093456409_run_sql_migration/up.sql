create or replace function core.chapter_to_agreement(chapter_id_new int)
    returns int as $$
    declare
        agreement_id_found int;
    begin
        select agreement_id from core.sections s 
        left join core.chapters c on chapter_id_new=c.id 
        left join core.agreements a on c.agreement_id=a.id 
        limit(1)
        into agreement_id_found;
        return agreement_id_found;
    end;
    $$ language plpgsql;

create or replace function core.reorder_indexes()
returns trigger as $$
    DECLARE
        rec RECORD;
        inserted_chapter_id integer;
        inserted_agreement_id integer;
        row_agreement_id integer;
    begin
        inserted_chapter_id=NEW.chapter_id;
        select * from core.chapter_to_agreement(inserted_chapter_id) into inserted_agreement_id;
        inserted_agreement_id := core.chapter_to_agreement(inserted_chapter_id);
        FOR rec IN
            select * from core.sections
        LOOP
        row_agreement_id := (core.chapter_to_agreement(rec.chapter_id));
        update core.sections
        set index = rec.index +1
        where id = rec.id and rec.index >= NEW.index and id != NEW.id and row_agreement_id=inserted_agreement_id;
    END LOOP;
    RETURN NEW;
    end;
$$ language plpgsql;

create trigger run_reorder_indexes before Insert on core.sections for each row execute PROCEDURE core.reorder_indexes();