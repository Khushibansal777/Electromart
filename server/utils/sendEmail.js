import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// Create a reusable transporter object using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail address (via .env)
    pass: process.env.EMAIL_PASS, // App password (not regular Gmail password)
  },
});

/**
 * Send email using Nodemailer
 *
 * @param {Object} options - Email options
 * @param {string} options.to - Recipient email address
 * @param {string} options.subject - Email subject line
 * @param {string} [options.text] - Plain text body (fallback if HTML fails)
 * @param {string} [options.html] - HTML formatted email body (preferred)
 * @param {Array}  [options.attachments] - Optional list of attachments (e.g., PDF invoice)
 *
 * @returns {Promise<Object>} - Response from Nodemailer
 */
export const sendEmail = async ({ to, subject, text, html, attachments }) => {
  // Setup email configuration
  const mailOptions = {
    from: `"The Team" <${process.env.EMAIL_USER}>`, // From name and email
    to, // Recipient
    subject, // Subject line
    text, // Fallback plain text
    html, // Optional HTML body
    attachments, // Optional file attachments
  };

  // Send the email and return the result
  return transporter.sendMail(mailOptions);
};
