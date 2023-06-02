CREATE OR REPLACE FUNCTION update_timestamp() RETURNS TRIGGER
    LANGUAGE plpgsql
AS
$$
BEGIN
    NEW.updated = (SELECT CURRENT_TIMESTAMP AT TIME ZONE 'UTC');
    RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION uuid_or_null(str text)
    RETURNS uuid AS $$
BEGIN
    RETURN str::uuid;
EXCEPTION WHEN invalid_text_representation THEN
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

