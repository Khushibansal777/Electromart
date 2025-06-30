// tools/addAdmin.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

await mongoose.connect(
  "mongodb+srv://khushibansal787:P4tyVfVMSiBXIJTw@cluster0.lqlc9tv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);

const password = await bcrypt.hash("123", 12);
await User.create({
  name: "admin",
  email: "admin@example.com",
  password,
  role: "admin",
});

console.log("Admin user created ✅");
process.exit();
