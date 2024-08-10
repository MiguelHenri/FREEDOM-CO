CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS items;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS carts;
DROP TABLE IF EXISTS purchases;
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
    email VARCHAR(120) UNIQUE NOT NULL,
    password_hash VARCHAR(256) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE
);

CREATE TYPE purchase_status AS ENUM ('Pending', 'Confirmed', 'Done');

CREATE TABLE purchases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    status purchase_status NOT NULL,
    username VARCHAR(50) NOT NULL,
    FOREIGN KEY (username) REFERENCES users(username)
);

CREATE TABLE carts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(50) NOT NULL,
    item_id UUID NOT NULL,
    quantity INTEGER NOT NULL,
    size CHAR(3) NOT NULL,
    purchase_id UUID,
    FOREIGN KEY (username) REFERENCES users (username) ON DELETE CASCADE,
    FOREIGN KEY (item_id) REFERENCES items (id) ON DELETE CASCADE,
    FOREIGN KEY (purchase_id) REFERENCES purchases (id) ON DELETE SET NULL
);