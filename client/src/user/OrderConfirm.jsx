import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import api from "../api";

export default function OrderConfirm() {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart(); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  const handleConfirm = async () => {
    try {
      setLoading(true);
      setError("");

      for (const item of cartItems) {
        await api.post("/orders", {
          product: item._id,
          quantity: item.quantity || 1,
        });
      }

      clearCart();
      navigate("/thank-you");
    } catch (err) {
      console.error("Order error:", err);
      setError("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">🛒 Your cart is empty.</h2>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-3xl mx-auto bg-white shadow rounded text-center">
      <h2 className="text-2xl font-bold mb-6">Confirm Your Cart Order</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="space-y-4 text-left">
        {cartItems.map((item, idx) => (
          <div key={idx} className="flex gap-4 items-center border-b pb-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-contain bg-gray-100 rounded"
            />
            <div>
              <h4 className="font-semibold">{item.name}</h4>
              <p>Quantity: {item.quantity || 1}</p>
              <p>Price: ₹{item.price}</p>
              <p>Total: ₹{(item.quantity || 1) * item.price}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-right font-bold text-lg">
        Total Payable: ₹{total}
      </div>

      <button
        onClick={handleConfirm}
        disabled={loading}
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
      >
        {loading ? "Placing Order..." : "Place Order"}
      </button>
    </div>
  );
}
