const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    ImageURL: { type: String, required: true },
    ItemName: { type: String, required: true },
    ItemCategory: { type: String, required: true }, // e.g. 'sim', 'gift card', 'prepaid'
    Price: { type: Number, required: true },
    Stock: { type: Number, default: 0 }, // Number of items available
    Status: {
      type: String,
      enum: ["available", "unavailable"],
      default: "available",
    }, // Status of the product
    Notes: { type: String },
    InStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
