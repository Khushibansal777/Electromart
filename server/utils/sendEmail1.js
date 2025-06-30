import nodemailer from "nodemailer";

export const sendEnquiryConfirmation = async ({ to, name, product }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"MFolks" <${process.env.EMAIL_USER}>`,
      to,
      subject: `We received your bulk enquiry for ${product}`,
      html: `
        <h3>Hello ${name},</h3>
        <p>Thank you for showing interest in our product: <b>${product}</b>.</p>
        <p>We’ve received your enquiry and will get back to you shortly.</p>
        <br/>
        <p>Best Regards,<br>MFolks Team</p>
      `,
    });

    console.log("✅ Confirmation email sent to user:", to);
  } catch (error) {
    console.error("❌ Failed to send confirmation email:", error);
  }
};
