-- Populating items table
INSERT INTO items (image, title, description, value, type, oldValue, tagColor, tag, size_quantity_pairs) VALUES
('/images/whitetee.png', 
    'Basic Tee', 
    'Basic cotton t-shirt.', 
    '$19.99', 
    'tee',
    '$24.99', 
    'green', 
    'SALE', 
    '{"P": 10, "M": 15, "G": 10, "GG": 5}');

INSERT INTO items (image, title, description, value, type, size_quantity_pairs) VALUES
('/images/blacktee.png', 
    'Over Tee', 
    'Basic cotton oversized t-shirt.', 
    '$24.99', 
    'tee',
    '{"P": 5, "M": 10, "G": 10, "GG": 5}');

INSERT INTO items (image, title, description, value, type, tagColor, tag, size_quantity_pairs) VALUES
('/images/bluetee.png', 
    'New Over Tee', 
    'New cotton oversized t-shirt.', 
    '$29.99', 
    'tee',
    'blue', 
    'NEW', 
    '{"P": 0, "M": 0, "G": 5, "GG": 5}');

INSERT INTO items (image, title, description, value, type, oldValue, tagColor, tag, size_quantity_pairs) VALUES
('/images/greenpant.png', 
    'Basic Pant', 
    'Basic cargo pant.', 
    '$39.99', 
    'pant',
    '$49.99', 
    'green', 
    'SALE', 
    '{"P": 10, "M": 15, "G": 10, "GG": 5}');

INSERT INTO items (image, title, description, value, type, size_quantity_pairs) VALUES
('/images/whitepant.png', 
    'Basic Pant', 
    'Basic cargo pant.', 
    '$44.99', 
    'pant',
    '{"P": 5, "M": 10, "G": 10, "GG": 5}');

INSERT INTO items (image, title, description, value, type, tagColor, tag, size_quantity_pairs) VALUES
('/images/jeanspant.png', 
    'New Pant', 
    'New baggy jeans!', 
    '$59.99', 
    'pant',
    'blue', 
    'NEW', 
    '{"P": 10, "M": 20, "G": 15, "GG": 10}');

INSERT INTO items (image, title, description, value, type, oldValue, tagColor, tag, size_quantity_pairs) VALUES
('/images/whitecap.png', 
    'Cap', 
    'Basic cap.', 
    '$19.99', 
    'accessory',
    '$24.99', 
    'green', 
    'SALE', 
    '{"P": 10, "M": 15, "G": 10, "GG": 5}');

INSERT INTO items (image, title, description, value, type, size_quantity_pairs) VALUES
('/images/buckethat.png', 
    'Bucket hat', 
    'Cool bucket hat.', 
    '$29.99', 
    'accessory',
    '{"P": 5, "M": 10, "G": 10, "GG": 5}');

INSERT INTO items (image, title, description, value, type, tagColor, tag, size_quantity_pairs) VALUES
('images/shoulderbag.png', 
    'New bag', 
    'New shoulder bag.', 
    '$39.99', 
    'accessory',
    'blue', 
    'NEW', 
    '{"P": 10, "M": 20, "G": 15, "GG": 10}');