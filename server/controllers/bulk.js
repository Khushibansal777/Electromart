import BulkEnquiry from "../models/BulkEnquiry.js";
import Product from "../models/Product.js";
import { sendEnquiryConfirmation } from "../utils/sendEmail1.js";

// ✅ Submit a bulk enquiry
export const submitBulkEnquiry = async (req, res) => {
  try {
    const { name, email, phone, quantity, message, product } = req.body;

    // 🔍 Check if product exists
    const prod = await Product.findById(product);
    if (!prod) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    // 📦 Create the enquiry
    const enquiry = await BulkEnquiry.create({
      name: name?.trim(),
      email: email?.trim(),
      phone: phone?.trim(),
      quantity: quantity?.trim(),
      message: message?.trim(),
      product,
    });

    // 📧 Send confirmation email
    await sendEnquiryConfirmation({
      to: email,
      name,
      product: prod.name,
    });

    res.status(201).json({ message: "Enquiry submitted successfully" });
  } catch (err) {
    console.error("❌ Bulk Enquiry Error:", err);
    res.status(500).json({ message: "Could not submit enquiry" });
  }
};

// 🔐 Get all bulk enquiries (Admin only)
export const getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await BulkEnquiry.find()
      .populate("product", "name price")
      .sort({ createdAt: -1 });

    res.json(enquiries);
  } catch (err) {
    console.error("❌ Fetch Enquiries Error:", err);
    res.status(500).json({ message: "Could not fetch enquiries" });
  }
};

