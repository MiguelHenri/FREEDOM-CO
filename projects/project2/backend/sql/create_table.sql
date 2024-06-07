DROP TABLE IF EXISTS items;

CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    image VARCHAR(200) NOT NULL,
    title VARCHAR(200) NOT NULL,
    description VARCHAR(500),
    value VARCHAR(100) NOT NULL,
    oldValue VARCHAR(100),
    tagColor VARCHAR(50),
    tag VARCHAR(50),
    size_quantity_pairs JSONB
);