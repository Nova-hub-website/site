const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Customer = require("../models/Customer");

const router = express.Router();

// Add a new customer
router.post("/register", async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;

    // Check if user exists
    const existingCustomer = await Customer.findOne({ username });
    if (existingCustomer) return res.status(400).json({ message: "Customer already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save new admin
    const newCustomer = new Customer({ username: username, password: hashedPassword, email: email, phone:  phone });
    await newCustomer.save();

    res.status(201).json({ message: "Customer registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Logging in a customer
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const customer = await Customer.findOne({ username });
    if (!customer) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, customer.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: customer._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token });
  } catch (err) {
    console.error("🔥 LOGIN ERROR:", err); // Show full error trace
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/add-order/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { order } = req.body;

    // Find customer and update order history
    const customer = await Customer.findById(id);
    if (!customer) return res.status(404).json({ message: "Customer not found" });
    customer.orderHistory.push(req.body);
    await customer.save();
    res.status(200).json({ message: "Order added successfully", order });
  } catch (err) {
    console.error("🔥 ADD ORDER ERROR:", err); // Show full error trace
    res.status(500).json({ message: "Server error" });
  }
});

// Get all customers
router.get("/all", async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (err) {
    console.error("🔥 GET CUSTOMERS ERROR:", err); // Show full error trace
    //  
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
// Export the router to be used in server.js
