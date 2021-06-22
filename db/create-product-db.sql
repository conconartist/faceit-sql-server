

CREATE TABLE products (
    id INT PRIMARY KEY auto_increment,
    brand VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(5,2) DEFAULT 0.00, 
    price_sign VARCHAR(1) DEFAULT '$', 
    currency VARCHAR(4) DEFAULT 'USD', 
    image_link VARCHAR(1000), 
    product_link VARCHAR(1000), 
    website_link VARCHAR(1000), 
    description VARCHAR(10000), 
    product_type VARCHAR(50) NOT NULL, 
    cruelty_free BOOLEAN,
    fair_trade BOOLEAN,
    organic BOOLEAN, 
    vegan BOOLEAN,
    zero_waste BOOLEAN
    )