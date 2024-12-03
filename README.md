Bike Store API
A RESTful API for managing a bike store, including features such as adding, updating, and deleting bikes, placing orders, and calculating revenue from orders. The API allows users to manage products, process orders, and perform CRUD operations on bikes.


Features:
Create a Bike: Add a new bike to the store with details like name, brand, price, category, description, quantity, and stock status.
Get All Bikes: Retrieve all bikes from the store or search by category, brand, or name.
Get a Specific Bike: Retrieve detailed information about a specific bike using its unique ID.
Update a Bike: Update bike details like price and quantity.
Delete a Bike: Remove a bike from the store.
Order a Bike: Place an order for a bike, which decreases its stock and updates the inventory.
Calculate Revenue from Orders: Calculate the total revenue generated from all orders using MongoDB aggregation.


Tech Stack:
Node.js: JavaScript runtime to build the API.
Express.js: Web framework for Node.js to handle routing and middleware.
MongoDB: NoSQL database to store bike and order data.
Mongoose: ODM (Object Data Modeling) library to interact with MongoDB.
TypeScript: Superset of JavaScript for better type safety and development experience.


API Endpoints:
POST /api/products

Get All Bikes:
GET /api/products
Query Params (Optional): ?searchTerm=category|brand|name

Get a Specific Bike:
Endpoint: GET /api/products/:productId

Update a Bike:
Endpoint: PUT /api/products/:productId

Delete a Bike:
Endpoint: DELETE /api/products/:productId

Order a Bike:
Endpoint: POST /api/orders

Calculate Revenue from Orders:
Endpoint: GET /api/orders/revenue
