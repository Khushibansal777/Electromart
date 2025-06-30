import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <div className="grid grid-cols-3 gap-4">
        <button
          onClick={() => navigate("/admin/categories")}
          className="p-4 bg-blue-500 text-white rounded"
        >
          Manage Categories
        </button>
        <button
          onClick={() => navigate("/admin/orders")}
          className="p-4 bg-green-600 text-white rounded"
        >
          View Orders
        </button>
        <button
          onClick={() => navigate("/admin/bulk-enquiries")}
          className="p-4 bg-yellow-400 text-white rounded"
        >
          View enquiries
        </button>
      </div>
    </div>
  );
}
