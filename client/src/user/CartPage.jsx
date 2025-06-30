import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function CartPage() {
  const { cartItems, removeFromCart } = useCart();

  const total = (cartItems || []).reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  if (cartItems.length === 0) {
    return <div className="p-6 text-center">🛒 Your cart is empty.</div>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cartItems.map((item) => (
        <div
          key={item._id}
          className="border p-4 mb-2 flex justify-between items-center"
        >
          <div>
            <h4 className="font-semibold">{item.name}</h4>
            <p>Qty: {item.quantity}</p>
            <p>Price: ₹{item.price}</p>
          </div>
          <button
            onClick={() => removeFromCart(item._id)}
            className="text-red-500 hover:underline"
          >
            Remove
          </button>
        </div>
      ))}
      <div className="text-right font-bold text-lg mt-4">Total: ₹{total}</div>
      <Link
        to="/confirm"
        className="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Proceed to Checkout
      </Link>
    </div>
  );
}
