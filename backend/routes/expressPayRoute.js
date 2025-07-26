// routes/expresspay.js
const express = require("express");
const axios = require("axios");
const router = express.Router();

const MERCHANT_ID = process.env.EXPRESSPAY_MERCHANT_ID;
const API_KEY = process.env.EXPRESSPAY_API_KEY;
const EXPRESSPAY_API = "https://sandbox.expresspaygh.com/api/expresspay/initialize";

// Simulate a payment
router.post("/pay", async (req, res) => {
  try {
    const { amount, customerName, customerEmail, customerPhone, orderId } = req.body;

    const payload = {
      merchant_id: MERCHANT_ID,
      api_key: API_KEY,
      amount: amount * 100, // convert to pesewas
      currency: "GHS",
      order_id: orderId,
      email: customerEmail,
      phone_number: customerPhone,
      firstname: customerName,
      lastname: "Test",
      return_url: "https://yourdomain.com/payment-callback", // or localhost for testing
      cancel_url: "https://yourdomain.com/payment-cancelled"
    };

    const response = await axios.post(EXPRESSPAY_API, payload);
    const { token, response_code } = response.data;

    if (response_code !== "0000") {
      return res.status(400).json({ error: "ExpressPay initialization failed" });
    }

    const checkoutURL = `https://sandbox.expresspaygh.com/checkout/?token=${token}`;
    res.json({ checkoutURL });
  } catch (err) {
    console.error("🔥 ExpressPay Error:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
