import mongoose from "mongoose";
const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: "User" },
  product: { type: mongoose.Types.ObjectId, ref: "Product" },
  quantity: { type: Number, default: 1 },
  confirmed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});
export default mongoose.model("Order", OrderSchema);
