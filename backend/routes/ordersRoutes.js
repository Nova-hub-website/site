const express = require("express");
const Order = require("../models/Orders");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const order = new Order({
      userName: req.body.userName,
      userEmail: req.body.userEmail,
      productsNames: req.body.productsNames,
      quantity: req.body.quantity,
      price: req.body.price,
      totalPrice: req.body.totalPrice,
      reference: req.body.reference,
      orderStatus: "active"
    });

    await order.save();
    res.status(201).json({ message: "Order saved", order });
  } catch (err) {
    res.status(500).json({ message: "Error saving order", error: err.message });
  }
});

// Get all order
router.get("/all", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching orders" });
  }
});

module.exports = router;
