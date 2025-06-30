// models/BulkEnquiry.js
import mongoose from "mongoose";
const BulkSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    quantity: Number,
    message: String,
    product: { type: mongoose.Types.ObjectId, ref: "Product" },
  },
  { timestamps: true }
);
export default mongoose.model("BulkEnquiry", BulkSchema);
