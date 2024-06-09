CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS items;

CREATE TABLE items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    image VARCHAR(200) NOT NULL,
    title VARCHAR(200) NOT NULL,
    description VARCHAR(500),
    value VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL,
    oldValue VARCHAR(100),
    tagColor VARCHAR(50),
    tag VARCHAR(50),
    size_quantity_pairs JSONB
);