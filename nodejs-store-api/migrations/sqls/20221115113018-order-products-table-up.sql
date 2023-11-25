-- Create Order Products Table
CREATE TABLE order_products(
    id SERIAL PRIMARY KEY,
    quantity INTEGER NOT NULL,
    order_id BIGINT REFERENCES orders(id),
    prod_id BIGINT REFERENCES products(id)
);