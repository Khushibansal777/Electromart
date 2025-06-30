import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function CategoryList() {
  const [cats, setCats] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filters, setFilters] = useState(["All"]);
  const [activeFilter, setActiveFilter] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/categories")
      .then((r) => {
        const allCats = r.data;

        setCats(allCats);
        setFiltered(allCats);

        // Extract unique groups for filters
        const uniqueGroups = Array.from(
          new Set(allCats.map((cat) => cat.group).filter(Boolean))
        );

        setFilters(["All", ...uniqueGroups]);
      })
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  const handleFilter = (filter) => {
    setActiveFilter(filter);
    if (filter === "All") {
      setFiltered(cats);
    } else {
      const filteredCats = cats.filter(
        (cat) => cat.group?.toLowerCase() === filter.toLowerCase()
      );
      setFiltered(filteredCats);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex gap-6">
      {/* Sidebar Filters */}
      <aside className="w-64 bg-white p-4 rounded-xl shadow h-fit">
        <h2 className="text-xl font-bold mb-4 text-gray-700">Filters</h2>
        <ul className="space-y-2">
          {filters.map((filter) => (
            <li key={filter}>
              <button
                onClick={() => handleFilter(filter)}
                className={`block w-full text-left px-4 py-2 rounded-md transition ${
                  activeFilter === filter
                    ? "bg-gray-700 text-white"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                {filter}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Category Cards */}
      <main className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.length > 0 ? (
          filtered.map((c) => (
            <div
              key={c._id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 h-[250px]"
            >
              {" "}
              <div className="h-28 w-full bg-gray-100 flex items-center justify-center overflow-hidden rounded-t-xl">
                <img
                  src={c.image || "https://placehold.co/300x200?text=No+Image"}
                  alt={c.name}
                  className="max-h-20 object-contain"
                  onError={(e) => {
                    e.target.src = "https://placehold.co/300x200?text=No+Image";
                  }}
                />
              </div>
              <div className="p-4 flex flex-col justify-between h-[120px]">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
                  {c.name}
                </h3>
                <button
                  onClick={() => navigate(`/products/${c._id}`)}
                  className="text-sm text-blue-600 hover:underline self-start"
                >
                  View Products →
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 col-span-full">No categories found.</p>
        )}
      </main>
    </div>
  );
}

