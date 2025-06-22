// Load environment variables
require("dotenv").config();

// Core dependencies
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const morgan = require("morgan");

// Initialize app
const app = express();
const PORT = process.env.PORT || 5000;

// Database connections
const connectMongo = require("./config/db.mongo");
// const mysqlPool = require("./config/db.mysql"); // if used somewhere later

// Connect MongoDB
connectMongo();

// Middleware setup
app.use(helmet()); // Secure HTTP headers
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies
app.use(mongoSanitize()); // Prevent NoSQL injection
app.use(morgan("dev")); // Log HTTP requests

// Rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Routes
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const productRoutes = require("./routes/product.routes");
const orderRoutes = require("./routes/order.routes");

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// Error handling middleware (keep it after routes)
const errorHandler = require("./middlewares/error.middleware");
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("🚀 Welcome to the E-commerce Backend API!");
});


// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});


// ✅ Export app for server.js or testing //ONLY FOR TESTING
// module.exports = app;













/*
=======[1]=============== Register User ======================

POST /api/auth/register

📍 URL: http://localhost:5000/api/auth/register

{
  "name": "Krishna",
  "email": "krishna@example.com",
  "password": "123456",
  "role": "admin"
}
  ---
  {
    "message": "User created",
    "user": {
        "name": "Krishna",
        "email": "krishna@example.com",
        "password": "$2b$10$vAWw5zFYG9Rs3VBo5d/IdOjTaysufFl1rvrZtISJuTBAcB1fn/H6.",
        "role": "admin",
        "_id": "6857ea352468bf453a8b9f0a",
        "__v": 0
    }
}
======[2]=======================Login User=========================

POST   http://localhost:5000/api/auth/login

{
  "email": "krishna@example.com",
  "password": "123456"
}
----
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NTdlYTM1MjQ2OGJmNDUzYThiOWYwYSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc1MDU5MjEzOSwiZXhwIjoxNzUwNTk1NzM5fQ.AhsL-SUSkLi--veq8Mpb4Jq9Q-Yfi9BHkoOjYUsDZcU",

=====[3]================== Create Product (Admin Only)=====================

POST   http://localhost:5000/api/products

{
  "name": "iPhone 15",
  "price": 999,
  "category": "Mobile"
}
Headers:

Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NTdlYTM1MjQ2OGJmNDUzYThiOWYwYSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc1MDU5MjEzOSwiZXhwIjoxNzUwNTk1NzM5fQ.AhsL-SUSkLi--veq8Mpb4Jq9Q-Yfi9BHkoOjYUsDZcU


{
    "name": "iPhone 14 Pro",
    "price": 999.99,
    "category": "electronics",
    "_id": "6857ebc82468bf453a8b9f0d",
    "__v": 0
}
=======[4]===============GET ALL PRODUCTS=========================

GET   http://localhost:5000/api/products

[
  {
    "_id": "abc123",
    "name": "iPhone 15",
    "price": 999,
    "category": "Mobile"
  }
]
=========[5]================== Create Order ======================
// POST   http://localhost:5000/api/orders


{
  "products": [
    {
      "productId": "6857ebc82468bf453a8b9f0d",
      "quantity": 2
    }
  ],
  "shippingAddress": "Jaunpur, UP",
  "paymentMethod": "COD"
}
-------
Authorization  Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NTdlYTM1MjQ2OGJmNDUzYThiOWYwYSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc1MDU5MjEzOSwiZXhwIjoxNzUwNTk1NzM5fQ.AhsL-SUSkLi--veq8Mpb4Jq9Q-Yfi9BHkoOjYUsDZcU

response--

{
    "products": [
        {
            "productId": "6857ebc82468bf453a8b9f0d",
            "quantity": 2,
            "_id": "6857ee24a0d87f76d070de15"
        }
    ],
    "shippingAddress": "Jaunpur, UP",
    "paymentMethod": "COD",
    "status": "pending",
    "_id": "6857ee24a0d87f76d070de14",
    "createdAt": "2025-06-22T11:51:00.512Z",
    "updatedAt": "2025-06-22T11:51:00.512Z",
    "__v": 0
}
    //=======[6]================== GET ALL ORDERS (Admin Only) ======================
    // GET   http://localhost:5000/api/orders
    // Headers: Authorization: Bearer  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NTdlYTM1MjQ2OGJmNDUzYThiOWYwYSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc1MDU5MjEzOSwiZXhwIjoxNzUwNTk1NzM5fQ.AhsL-SUSkLi--veq8Mpb4Jq9Q-Yfi9BHkoOjYUsDZcU

==============[7]=====LOGIN WITH HTML UI PAGE================

open login.html page on browser 
fill form with email and password

  "email": "krishna@example.com",
  "password": "123456"


click login button
// You should see a message "Login successful" .  and Token is saved in localStorage

Check Saved Token
Open DevTools → Application → Local Storage → token will be visible there.

AND IN CONSOLE WILL SHOE--

User: {id: '6857ea352468bf453a8b9f0a', name: 'Krishna', role: 'admin'}
arg1 = {id: '6857ea352468bf453a8b9f0a', name: 'Krishna', role: 'admin'}
//=============================
*/