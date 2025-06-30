// seed/products.js

import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/Product.js";
import Category from "../models/Category.js";

dotenv.config();

const products = [
  {
    name: "Dell XPS 13",
    price: 89999,
    image:
      "https://vsprod.vijaysales.com/media/catalog/product/2/3/234770_1.jpg",
    description:
      "(13th Gen Intel Core i7-13650HX/ 16GB DDR5 RAM/ 1TB SSD/ 15.6 Inch (39.62 cm) FHD Display/ 6GB-NVIDIA GeForce RTX 3050 Graphics/ Windows 11/ MS-Office)",
    category: new mongoose.Types.ObjectId("6855585a939d905598c976d0"),
  },
  {
    name: "MacBook Air M2",
    price: 114999,
    image:
      "https://vsprod.vijaysales.com/media/catalog/product/m/i/midnight_1_.jpg",
    description:
      "Apple’s lightest notebook with M2 chip. (16GB RAM/ 256GB SSD/ 13.6 inch (34.46 cm) Liquid Retina Display/ 8-core CPU/ 8-core GPU macOS/ Midnight)",
    category: new mongoose.Types.ObjectId("6855585a939d905598c976d0"),
  },
  {
    name: "iPhone 14",
    price: 79999,
    image:
      "https://vsprod.vijaysales.com/media/catalog/product/2/0/206077-image1_2.jpg",
    description:
      "Apple iPhone 14 with 128GB storage and dual camera. Display: 6.1-inch OLED Display ,Storage: 128 GB Internal Memory",
    category: new mongoose.Types.ObjectId("6855585a939d905598c976d1"),
  },
  {
    name: "Samsung Galaxy S25",
    price: 74999,
    image:
      "https://vsprod.vijaysales.com/media/catalog/product/s/a/samsung-galaxy-s25-ultra-jetblack_1__1.jpg",
    description: "Flagship Samsung phone with Snapdragon 8 Gen 2.",
    category: new mongoose.Types.ObjectId("6855585a939d905598c976d1"),
  },
  {
    name: "Sony Bravia 55-inch 4K",
    price: 65999,
    image:
      "https://vsprod.vijaysales.com/media/catalog/product/2/3/239914_1_.jpg",
    description:
      "Smart TV with Dolby Vision and Android OS.4K Ultra HD LED Google TV - 4K Processor X1, HDR10/HLG, Dolby™ Atmos, Chromecast Built-In, K-55S25M2",
    category: new mongoose.Types.ObjectId("6855585a939d905598c976d2"),
  },
  {
    name: "Mi Smart TV 43-inch",
    price: 29999,
    image:
      "https://vsprod.vijaysales.com/media/catalog/product/2/3/237960_1.jpg",
    description: "Full HD LED TV with PatchWall and Android TV.",
    category: new mongoose.Types.ObjectId("6855585a939d905598c976d2"),
  },
  {
    name: "Voltas 1.5 Ton Inverter AC",
    price: 33999,
    image:
      "https://vsprod.vijaysales.com/media/catalog/product/2/3/239311_1_.jpg",
    description: "Energy-efficient split AC with 5-star rating.",
    category: new mongoose.Types.ObjectId("6855585a939d905598c976d3"),
  },
  {
    name: "LG Dual Inverter AC",
    price: 36999,
    image:
      "https://vsprod.vijaysales.com/media/catalog/product/u/s/us-q18knxe_1_.jpg",
    description: "Silent operation with fast cooling and Wi-Fi.",
    category: new mongoose.Types.ObjectId("6855585a939d905598c976d3"),
  },
  {
    name: "Sony WH-1000XM4",
    price: 24999,
    image:
      "https://vsprod.vijaysales.com/media/catalog/product/2/3/235021_1_.jpg",
    description: "Industry-leading noise cancellation headphones.",
    category: new mongoose.Types.ObjectId("6855585a939d905598c976d4"),
  },
  {
    name: "Boat Rockerz 550",
    price: 1999,
    image:
      "https://vsprod.vijaysales.com/media/catalog/product/2/2/227113-image1_1.jpg?",
    description: "Wireless over-ear headphones with deep bass.",
    category: new mongoose.Types.ObjectId("6855585a939d905598c976d4"),
  },
  {
    name: "PlayStation 5",
    price: 49999,
    image:
      "https://vsprod.vijaysales.com/media/catalog/product/1/8/180133-image1_4.jpg",
    description: "Next-gen gaming console with fast SSD and ray tracing.",
    category: new mongoose.Types.ObjectId("6855585a939d905598c976d5"),
  },
  {
    name: "Xbox Series X",
    price: 48999,
    image:
      "https://vsprod.vijaysales.com/media/catalog/product/1/8/180133-image1_4.jpg",
    description: "Powerful console with 4K gaming experience.",
    category: new mongoose.Types.ObjectId("6855585a939d905598c976d5"),
  },
  {
    name: "Canon EOS 1500D",
    price: 34999,
    image:
      "https://vsprod.vijaysales.com/media/catalog/product/2/1/219342-image1_1.jpeg",
    description: "24.1MP DSLR with Wi-Fi & Bluetooth support.",
    category: new mongoose.Types.ObjectId("6855585a939d905598c976d6"),
  },
  {
    name: "Nikon D3500",
    price: 36999,
    image:
      "https://vsprod.vijaysales.com/media/catalog/product/2/0/204462-image1_2.jpg",
    description: "Compact DSLR for beginners with great battery.",
    category: new mongoose.Types.ObjectId("6855585a939d905598c976d6"),
  },
  {
    name: "TP-Link Archer C6",
    price: 2499,
    image:
      "https://vsprod.vijaysales.com/media/catalog/product/1/9/192947-image1_4.jpg",
    description: "Dual band router with MU-MIMO technology.",
    category: new mongoose.Types.ObjectId("6855585a939d905598c976d7"),
  },
  {
    name: "Netgear Nighthawk AX6",
    price: 8999,
    image:
      "https://vsprod.vijaysales.com/media/catalog/product/1/9/192947-image1_4.jpg",
    description: "WiFi 6 router with ultra-fast speeds.",
    category: new mongoose.Types.ObjectId("6855585a939d905598c976d7"),
  },
];

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    await Product.deleteMany({}); // Clean old products

    await Product.insertMany(products); // Directly insert your prepared array

    console.log("✅ Products seeded successfully!");
    process.exit();
  })
  .catch((err) => {
    console.error("❌ Failed to seed products:", err);
    process.exit(1);
  });
