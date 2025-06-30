import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import { useCart } from "../context/CartContext";

export default function ProductList() {
  const [prods, setProds] = useState([]);
  const { catId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    api
      .get(`/products/${catId}`)
      .then((r) => {
        setProds(r.data);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, [catId]);

  const [quantities, setQuantities] = useState({});
  const [addedStatus, setAddedStatus] = useState({});

  const handleQuantityChange = (id, amount) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + amount),
    }));
  };

  const handleAddToCart = (product) => {
    const qty = quantities[product._id] || 1;
    addToCart(product, qty);
    setAddedStatus((prev) => ({ ...prev, [product._id]: true }));

    // Reset "added" state after 1 second
    setTimeout(() => {
      setAddedStatus((prev) => ({ ...prev, [product._id]: false }));
    }, 1000);
  };

  return (
    <div className="p-6">
      {prods.length === 0 ? (
        <div className="text-center text-gray-600 text-lg font-medium mt-10">
          😔 No products under this category uploaded yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {prods.map((p) => (
            <div key={p._id} className="border p-4 rounded shadow-md bg-white">
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-48 object-contain bg-gray-100 rounded"
              />
              <h4 className="mt-2 font-semibold text-lg">{p.name}</h4>
              <p className="text-green-600 font-medium">
                ₹{Number(p.price).toLocaleString("en-IN")}
              </p>

              {/* Quantity selector */}
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => handleQuantityChange(p._id, -1)}
                  className="bg-gray-300 px-2 rounded"
                >
                  -
                </button>
                <span>{quantities[p._id] || 1}</span>
                <button
                  onClick={() => handleQuantityChange(p._id, 1)}
                  className="bg-gray-300 px-2 rounded"
                >
                  +
                </button>
              </div>

              {/* Buttons */}
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => handleAddToCart(p)}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                >
                  {addedStatus[p._id] ? "✅ Added!" : "Add to Cart"}
                </button>
                <button
                  onClick={() => navigate(`/bulk-enquiry/${p._id}`)}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                >
                  Enquiry For Bulk
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
