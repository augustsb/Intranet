CREATE TABLE IF NOT EXISTS example (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  value TEXT
);
INSERT INTO example (value)
VALUES ('Hello World, Intranet Application');