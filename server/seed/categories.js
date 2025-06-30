// seed/categories.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Category from "../models/Category.js";

dotenv.config();

const categories = [
  {
    name: "Laptops",
    image: "https://via.placeholder.com/300x200?text=Laptops",
    group: "Computers & Accessories",
  },
  {
    name: "Smartphones",
    image: "https://via.placeholder.com/300x200?text=Smartphones",
    group: "Mobile Phones & Tablets",
  },
  {
    name: "Televisions",
    image: "https://via.placeholder.com/300x200?text=TVs",
    group: "TV & Entertainment",
  },
  {
    name: "Air Conditioners",
    image: "https://via.placeholder.com/300x200?text=AC",
    group: "Home Appliances",
  },
  {
    name: "Headphones",
    image: "https://via.placeholder.com/300x200?text=Headphones",
    group: "Audio Devices",
  },
  {
    name: "Gaming Consoles",
    image: "https://via.placeholder.com/300x200?text=Gaming+Consoles",
    group: "Gaming",
  },
  {
    name: "DSLR Cameras",
    image: "https://via.placeholder.com/300x200?text=Cameras",
    group: "Cameras & Accessories",
  },
  {
    name: "Wi-Fi Routers",
    image: "https://via.placeholder.com/300x200?text=Wi-Fi+Router",
    group: "Networking Devices",
  },
  {
    name: "Smart Lights",
    image: "https://via.placeholder.com/300x200?text=Smart+Lights",
    group: "Smart Home & Security",
  },
  {
    name: "Solar Panels",
    image: "https://via.placeholder.com/300x200?text=Solar+Panels",
    group: "Power & Energy",
  },
  {
    name: "Arduino Kits",
    image: "https://via.placeholder.com/300x200?text=Arduino",
    group: "Electronics Components & DIY",
  },
  {
    name: "Soldering Tools",
    image: "https://via.placeholder.com/300x200?text=Tools",
    group: "Tools & Equipment",
  },
];

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    await Category.deleteMany({});
    await Category.insertMany(categories);
    console.log("✅ Categories seeded successfully!");
    process.exit();
  })
  .catch((err) => {
    console.error("❌ Failed to seed categories:", err);
    process.exit(1);
  });
