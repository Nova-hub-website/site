const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    userName: { type: String, required: true }, // Name of the user who placed the order
    userEmail: { type: String, required: true }, // Email of the user who placed the order
    productsNames: { type: Array, required: true },
    quantity: { type: Array, required: true}, // Quantity of the product ordered
    price: { type: Array, required: true }, // Price per unit of the product
    totalPrice: { type: Number, required: true },
    reference: { type: String} // e.g. 'pending', 'completed', 'cancelled'
}, { timestamps: true });

module.exports = mongoose.model("Orders", productSchema);
