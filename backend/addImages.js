require("dotenv").config();
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;

// 🔌 MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// 🧠 Product Model (adjust the path accordingly)
const Product = require("./models/Product");

// 🔐 Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// 📁 Folder with images
const imagesFolder = path.join(__dirname, "../Images/Imagesss");

// 🔍 Find matching image regardless of extension
function findImageForProduct(productName) {
  const base = path.join(imagesFolder, productName);
  const extensions = [".png", ".jpg", ".jpeg", ".webp"];
  for (const ext of extensions) {
    const filePath = base + ext;
    if (fs.existsSync(filePath)) return filePath;
  }
  return null;
}

(async () => {
  try {
    const products = await Product.find();

    for (const product of products) {
      const imagePath = findImageForProduct(product.ItemName);
      if (imagePath && product.ItemCategory === "virtual credit cards" && product.ItemName !== "Vanilla visa Card ") {
        console.log(`📤 Uploading image for ${product.ItemName}...`);
        const result = await cloudinary.uploader.upload(imagePath, {
          folder: "novahub",
          public_id: path.parse(imagePath).name,
        });

        // ✅ Update product in DB
        product.ImageURL = result.secure_url;
        await product.save();
        console.log(`✅ Updated ${product.ItemName}`);
      } else {
        console.warn(`⚠️ No image found for: ${product.ItemName}`);
      }
    }

    console.log("🎉 All done!");
    process.exit();
  } catch (err) {
    console.error("❌ Script error:", err);
    process.exit(1);
  }
})();
