import { useState, useEffect } from "react";
import api from "../api";

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch orders
  useEffect(() => {
    api
      .get("/orders")
      .then((res) => setOrders(res.data))
      .catch((err) => {
        console.error("Failed to fetch orders", err);
        setOrders([]); // fallback to empty
      })
      .finally(() => setLoading(false));
  }, []);

  // Confirm an order
  const confirm = (id) => {
    api
      .patch(`/orders/${id}`)
      .then(() =>
        setOrders((prev) =>
          prev.map((order) =>
            order._id === id ? { ...order, confirmed: true } : order
          )
        )
      )
      .catch((err) => {
        console.error("Failed to confirm order", err);
      });
  };

  if (loading) return <div className="p-4">Loading orders...</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Incoming Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="mb-2 border p-2 rounded shadow-sm">
            <p>
              <strong>User:</strong> {order.user?.name || "N/A"}
            </p>
            <p>
              <strong>Product:</strong> {order.product?.name || "N/A"}
            </p>
            {!order.confirmed ? (
              <button
                onClick={() => confirm(order._id)}
                className="mt-2 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Confirm
              </button>
            ) : (
              <span className="text-green-700 font-semibold">✅ Confirmed</span>
            )}
          </div>
        ))
      )}
    </div>
  );
}

