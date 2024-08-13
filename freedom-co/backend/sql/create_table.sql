CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS carts CASCADE;
DROP TABLE IF EXISTS purchases CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS items CASCADE;

DROP TYPE IF EXISTS purchase_status;

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

CREATE TABLE users (
    username VARCHAR(50) PRIMARY KEY,
    email VARCHAR(120) NOT NULL UNIQUE,
    password_hash VARCHAR(256) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE,
    address_line_1 VARCHAR(150),
    address_line_2 VARCHAR(150),
    city VARCHAR(100),
    state VARCHAR(100),
    country VARCHAR(100),
    zip_code VARCHAR(20)
);

CREATE TYPE purchase_status AS ENUM ('PENDING', 'CONFIRMED', 'DONE');

CREATE TABLE purchases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    status purchase_status NOT NULL,
    username VARCHAR(50) NOT NULL,
    expires_at TIMESTAMP NOT NULL DEFAULT (NOW() + INTERVAL '10 minutes'),
    value VARCHAR(10),
    FOREIGN KEY (username) REFERENCES users(username)
);

CREATE TABLE carts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(50) NOT NULL,
    item_id UUID NOT NULL,
    quantity INTEGER NOT NULL,
    size CHAR(3) NOT NULL,
    was_purchased BOOLEAN NOT NULL DEFAULT FALSE,
    purchase_id UUID,
    FOREIGN KEY (username) REFERENCES users (username) ON DELETE CASCADE,
    FOREIGN KEY (item_id) REFERENCES items (id) ON DELETE CASCADE,
    FOREIGN KEY (purchase_id) REFERENCES purchases (id) ON DELETE SET NULL
);