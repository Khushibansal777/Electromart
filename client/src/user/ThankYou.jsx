import { Link } from "react-router-dom";

export default function ThankYou() {
  return (
    <div className="text-center mt-20">
      <h1 className="text-2xl font-bold mb-4">🎉 Thank you for your order!</h1>
      <p className="text-gray-600 mb-6">
        Your order has been placed successfully.
      </p>

      <Link
        to="/categories"
        className="inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Continue Shopping
      </Link>
    </div>
  );
}

