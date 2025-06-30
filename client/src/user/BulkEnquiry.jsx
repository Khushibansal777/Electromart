import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api";

export default function BulkEnquiry() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    quantity: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  // Fetch product info
  useEffect(() => {
    const cleanId = decodeURIComponent(productId.trim());

    api

      .get(`/products/single/${cleanId}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Product fetch error", err));
  }, [productId]);

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/bulk-enquiries", {
      ...form,
      product: productId,
    });
    setSubmitted(true);
    setForm({ name: "", email: "", phone: "", quantity: "", message: "" });
  };

  if (!product) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4 text-center">Bulk Enquiry</h2>

      {/*  Product Details */}
      <div className="flex gap-6 border p-6 rounded shadow mb-8 bg-white">
        <img
          src={product.image}
          alt={product.name}
          className="w-48 h-48 object-contain bg-gray-100 rounded"
        />
        <div>
          <h3 className="text-xl font-semibold">{product.name}</h3>
          <p className="text-gray-600 mt-1">{product.description}</p>
          <p className="text-green-600 font-bold mt-2 text-lg">
            ₹{product.price}
          </p>
        </div>
      </div>

      {/* Enquiry Form */}
      {submitted ? (
        <div className="text-center space-y-4">
          <p className="text-green-600 text-lg">
             Enquiry submitted successfully! We’ll get back to you soon.
          </p>
          <Link
            to="/categories"
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow space-y-4"
        >
          <input
            type="text"
            name="name"
            required
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          />
          <input
            type="email"
            name="email"
            required
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          />
          <input
            type="tel"
            name="phone"
            required
            placeholder="Your Phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          />
          <input
            type="number"
            name="quantity"
            required
            placeholder="Quantity"
            value={form.quantity}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          />
          <textarea
            name="message"
            rows="4"
            placeholder="Additional Message (Optional)"
            value={form.message}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          ></textarea>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Submit Enquiry
          </button>
        </form>
      )}
    </div>
  );
}
