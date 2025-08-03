const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Customer = require("../models/Customer");

const router = express.Router();

// Add a new customer
router.post("/add", async (req, res) => {
    console.log("📥 Add Customer route hit");
    console.log("Body:", req.body);
    
    try {
        const customerData = req.body;
    
        // Check if customer already exists
        const existingCustomer = await Customer.findOne({ email: customerData.email });
        if (existingCustomer) {
        return res.status(400).json({ message: "Customer already exists" });
        }
    
        const newCustomer = new Customer(customerData);
        await newCustomer.save();
    
        res.status(201).json({ message: "✅ Customer added", customer: newCustomer });
    } catch (err) {
        console.error("🔥 Add customer error:", err.message);
        res.status(500).json({ message: "Server error", error: err.message });
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
