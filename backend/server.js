// server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config(); // to load .env variables
const connectDB = require("./config/db");

const app = express();

connectDB(); // Connect to MongoDB
const allowedOrigins = [
  "http://localhost:5500", // for local dev
  "https://chyber-nana.github.io", // for live GitHub Pages
  "https://nova-hub-website.github.io",
  "http://127.0.0.1:5500"
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin like curl or Postman
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(express.json()); // to parse JSON body from requests

const adminRoutes = require("./routes/adminRoutes");
app.use("/api/admin", adminRoutes);

customerRoutes = require("./routes/customerRoutes");
app.use("/api/customers", customerRoutes);

const productRoutes = require("./routes/productRoutes");
app.use("/api/products", productRoutes);

const orderRoutes = require("./routes/ordersRoutes");
app.use("/api/orders", orderRoutes);



// Simple test route
app.get("/", (req, res) => {
  res.send("Backend is working 👌");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
