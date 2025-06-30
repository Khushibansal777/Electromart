import React, { useState, useEffect } from "react";
import api from "../api";

const groupOptions = [
  "Computers & Accessories",
  "Mobile Phones & Tablets",
  "TV & Entertainment",
  "Home Appliances",
  "Audio Devices",
  "Gaming",
  "Cameras & Accessories",
  "Networking Devices",
];

export default function CategoryManager() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: "",
    image: "",
    group: groupOptions[0],
  });
  const [editing, setEditing] = useState({
    id: null,
    name: "",
    image: "",
    group: groupOptions[0],
  });

  const loadCategories = async () => {
    try {
      const { data } = await api.get("/categories");
      setCategories(data);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.name) return;
    try {
      await api.post("/categories", form);
      setForm({ name: "", image: "", group: groupOptions[0] });
      loadCategories();
    } catch (err) {
      console.error("Add failed", err);
    }
  };

  const startEdit = (cat) => {
    setEditing({
      id: cat._id,
      name: cat.name,
      image: cat.image,
      group: cat.group || groupOptions[0],
    });
  };

  const cancelEdit = () => {
    setEditing({ id: null, name: "", image: "", group: groupOptions[0] });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.patch(`/categories/${editing.id}`, {
        name: editing.name,
        image: editing.image,
        group: editing.group,
      });
      cancelEdit();
      loadCategories();
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;
    try {
      await api.delete(`/categories/${id}`);
      loadCategories();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div className="p-4 w-full">
      <h2 className="text-xl font-bold mb-4">Category Manager</h2>

      {/* Add form */}
      <form
        onSubmit={handleAdd}
        className="mb-6 grid grid-cols-1 sm:grid-cols-4 gap-2"
      >
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          className="border rounded p-2"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={form.image}
          onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
          className="border rounded p-2"
        />
        <select
          value={form.group}
          onChange={(e) => setForm((f) => ({ ...f, group: e.target.value }))}
          className="border rounded p-2"
        >
          {groupOptions.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add
        </button>
      </form>

      {/* Category list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <div
            key={cat._id}
            className="border rounded-xl p-4 bg-white shadow hover:shadow-md transition"
          >
            {editing.id === cat._id ? (
              <form onSubmit={handleUpdate} className="space-y-2">
                <input
                  type="text"
                  value={editing.name}
                  onChange={(e) =>
                    setEditing((ed) => ({ ...ed, name: e.target.value }))
                  }
                  className="border rounded p-2 w-full"
                />
                <input
                  type="text"
                  value={editing.image}
                  onChange={(e) =>
                    setEditing((ed) => ({ ...ed, image: e.target.value }))
                  }
                  className="border rounded p-2 w-full"
                />
                <select
                  value={editing.group}
                  onChange={(e) =>
                    setEditing((ed) => ({ ...ed, group: e.target.value }))
                  }
                  className="border rounded p-2 w-full"
                >
                  {groupOptions.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
                <div className="flex space-x-2">
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div className="h-28 w-full bg-gray-100 flex items-center justify-center overflow-hidden rounded">
                  <img
                    src={
                      cat.image || "https://placehold.co/300x200?text=No+Image"
                    }
                    alt={cat.name}
                    className="max-h-20 object-contain"
                    onError={(e) => {
                      e.target.src =
                        "https://placehold.co/300x200?text=No+Image";
                    }}
                  />
                </div>
                <h3 className="mt-2 font-semibold text-gray-800">{cat.name}</h3>
                <p className="text-sm text-gray-500">
                  Group: {cat.group || "—"}
                </p>
                <div className="mt-4 flex space-x-2">
                  <button
                    onClick={() => startEdit(cat)}
                    className="text-sm bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(cat._id)}
                    className="text-sm bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
