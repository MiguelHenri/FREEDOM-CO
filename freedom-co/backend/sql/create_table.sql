CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS items;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS carts;

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

DROP TABLE IF EXISTS users;

CREATE TABLE users (
    username VARCHAR(50) PRIMARY KEY,
    email VARCHAR(120) UNIQUE NOT NULL,
    password_hash VARCHAR(256) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE
);

CREATE TABLE carts (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    item_id UUID NOT NULL,
    quantity INT NOT NULL,
    size CHAR(3) NOT NULL,
    FOREIGN KEY (username) REFERENCES users(username),
    FOREIGN KEY (item_id) REFERENCES items(id)
);