import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";
import { sendEmail } from "../utils/sendEmail.js";
import { generateInvoicePDF } from "../utils/generateInvoice.js";
import path from "path";

// Place a new order
export const placeOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { product: productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(400).json({ message: "Invalid product" });
    }

    const order = await Order.create({
      user: userId,
      product: productId,
      quantity: quantity || 1,
    });
    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Could not place order" });
  }
};

// List all orders (admin only)
export const listOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("product", "name price");

    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Could not list orders" });
  }
};

// Confirm order and send email with invoice
export const confirmOrder = async (req, res) => {
  try {
    const { id } = req.params;

    //  Update order as confirmed and fetch full details
    const order = await Order.findByIdAndUpdate(
      id,
      { confirmed: true },
      { new: true }
    )
      .populate("user", "email name")
      .populate("product", "name description price");

    if (!order) return res.status(404).json({ message: "Order not found" });

    const user = order.user;
    const product = order.product;

    //  Generate invoice PDF
    const pdfPath = await generateInvoicePDF(order, user, product);

    //  Compose HTML email
    const html = `
      <h2>Order Confirmation </h2>
      <p>Hi <strong>${user.name}</strong>,</p>
      <p>Your order has been confirmed. Here are your order details:</p>
      <ul>
        <li><strong>Product:</strong> ${product.name}</li>
        <li><strong>Description:</strong> ${product.description || "N/A"}</li>
        <li><strong>Quantity:</strong> ${order.quantity}</li>
        <li><strong>Price per unit:</strong> ₹${product.price}</li>
        <li><strong>Total:</strong> ₹${order.quantity * product.price}</li>
        <li><strong>Order Date:</strong> ${new Date(
          order.createdAt
        ).toLocaleDateString()}</li>
        <li><strong>Order ID:</strong> ${order._id}</li>
      </ul>
      <p>We've also attached a PDF invoice for your reference.</p>
      <p>Thank you for shopping with us!<br><strong>- The  ElectroMart Team</strong></p>
    `;

    // Send email with invoice attached
    await sendEmail({
      to: user.email,
      subject: "Order Confirmed ✅ - Invoice Attached",
      text: `Hello ${user.name}, your order for ${product.name} has been confirmed.`,
      html,
      attachments: [
        {
          filename: `invoice-${order._id}.pdf`,
          path: path.resolve(pdfPath),
          contentType: "application/pdf",
        },
      ],
    });

    res.json(order);
  } catch (err) {
    console.error("❌ Error confirming order:", err);
    res.status(500).json({ message: "Could not confirm order" });
  }
};
