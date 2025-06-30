// // utils/generateInvoice.js
// import PDFDocument from "pdfkit";
// import fs from "fs";
// import path from "path";

// export const generateInvoicePDF = (order, user) => {
//   return new Promise((resolve, reject) => {
//     const doc = new PDFDocument();
//     const filePath = path.join("invoices", `invoice-${order._id}.pdf`);

//     // Ensure "invoices" folder exists
//     if (!fs.existsSync("invoices")) fs.mkdirSync("invoices");

//     const stream = fs.createWriteStream(filePath);
//     doc.pipe(stream);

//     doc.fontSize(20).text("Invoice", { align: "center" });
//     doc.moveDown();

//     doc.fontSize(12).text(`Order ID: ${order._id}`);
//     doc.text(`Order Date: ${new Date(order.createdAt).toLocaleDateString()}`);
//     doc.text(`Customer: ${user.name}`);
//     doc.text(`Email: ${user.email}`);
//     doc.moveDown();

//     doc.fontSize(14).text("Product Details:");
//     let totalAmount = 0;

//     order.items.forEach((item, index) => {
//       const product = item.product;
//       const quantity = item.quantity || 1;
//       const price = product?.price || 0;
//       const subtotal = quantity * price;
//       totalAmount += subtotal;

//       doc.fontSize(12).text(`\n${index + 1}. ${product?.name || "N/A"}`);
//       doc.text(`   Description: ${product?.description || "N/A"}`);
//       doc.text(`   Quantity: ${quantity}`);
//       doc.text(`   Price per unit: ₹${price}`);
//       doc.text(`   Subtotal: ₹${subtotal}`);
//     });

//     doc.moveDown();
//     doc.fontSize(14).text(`Grand Total: ₹${totalAmount}`, { align: "right" });
//     doc.moveDown();

//     doc.text("Thank you for shopping with us!", { align: "center" });

//     doc.end();

//     stream.on("finish", () => resolve(filePath));
//     stream.on("error", (err) => reject(err));
//   });
// };

// utils/generateInvoice.js
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

export const generateInvoicePDF = (order, user, product) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const filePath = path.join("invoices", `invoice-${order._id}.pdf`);

    // Create "invoices" folder if not exists
    if (!fs.existsSync("invoices")) fs.mkdirSync("invoices");

    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    doc.fontSize(20).text("Invoice", { align: "center" });
    doc.moveDown();

    doc.fontSize(12).text(`Order ID: ${order._id}`);
    doc.text(`Order Date: ${new Date(order.createdAt).toLocaleDateString()}`);
    doc.text(`Customer: ${user.name}`);
    doc.text(`Email: ${user.email}`);
    doc.moveDown();

    doc.fontSize(14).text("Product Details:");
    doc.fontSize(12).text(`- Product: ${product.name}`);
    doc.text(`- Description: ${product.description || "N/A"}`);
    doc.text(`- Quantity: ${order.quantity}`);
    doc.text(`- Price per unit: ₹${product.price}`);
    doc.text(`- Total: ₹${order.quantity * product.price}`);
    doc.moveDown();

    doc.text("Thank you for shopping with us!", { align: "center" });

    doc.end();

    stream.on("finish", () => {
      resolve(filePath);
    });

    stream.on("error", (err) => {
      reject(err);
    });
  });
};
