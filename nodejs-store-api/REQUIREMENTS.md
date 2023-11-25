# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index
- Show
- Create [token required]
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

👉 index:   '/api/products'         [GET]
👉 show:    '/api/products/:id'     [GET]
👉 create:  '/api/products'         [POST]
👉 update:  '/api/products/:id'     [PATCH]
👉 delete:  '/api/products/:id'     [DELETE]
👉 prodCat: '/api/products/category/:category'  [GET]

#### Users
- Index [token required]
- Show [token required]
- Create N[token required]

👉 index:   '/api/users'             [GET]
👉 show:    '/api/users/id'          [GET]
👉 create:  '/api/user'              [POST]
👉 update:  '/api/users/:id'         [PATCH]
👉 delete:  '/api/users/:id'         [DELETE]
👉 auth:    '/api/users/authenticate'[POST]


#### Orders
- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

👉 Current:  '/api/orders/id'         [GET]
👉 addProd:  '/api/orders/:id/product'[POST]
👉 Complete: '/api/orders/:id/status' [GET]



## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

👉 should be provided
TABLE: products(id SERIAL PRIMARY KEY, name VARCHAR NOT NULL, price INTEGER NOT NULL, category VARCHAR NOT NULL)

#### User
- id
- firstName
- lastName
- password

👉 should be provided
TABLE: users(id SERIAL PRIMARY KEY, user_name VARCHAR NOT NULL UNIQUE,first_name VARCHAR NOT NULL, last_name VARCHAR NOT NULL, email VARCHAR NOT NULL UNIQUE, password Varchar NOT NULL)

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

Here I have made Two Tables .. One for orders and another for Product Orders
👉 should be provided
TABLE: orders(id SERIAL PRIMARY KEY, status VARCHAR NOT NULL, user_id BIGINT REFERENCES users(id) [foreign key to users table])

👉 anthor table should be provided
TABLE: order_products(id SERIAL PRIMARY KEY, quantity INTEGER NOT NULL,order_id BIGINT REFERENCES orders(id) [foreign key to orders table], prod_id BIGINT REFERENCES products(id) [foreign key to products table])