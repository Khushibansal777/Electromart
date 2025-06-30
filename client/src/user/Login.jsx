import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";

export default function Login() {
  const [creds, setCreds] = useState({ email: "", pwd: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await api.post("/auth/login", {
        email: creds.email,
        password: creds.pwd,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      if (data.user?.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/categories");
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError(
        err.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative bg-opacity-40"
      style={{
        backgroundImage: `url('/images/login2.jpg')`, 
      }}
    >
      
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="max-w-md w-full bg-white bg-opacity-90 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Login
          </h2>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 mb-4 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                required
                value={creds.email}
                onChange={(e) =>
                  setCreds((c) => ({ ...c, email: e.target.value }))
                }
                className="w-full border rounded p-2"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Password</label>
              <input
                type="password"
                required
                value={creds.pwd}
                onChange={(e) =>
                  setCreds((c) => ({ ...c, pwd: e.target.value }))
                }
                className="w-full border rounded p-2"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Log In
            </button>
          </form>

          <p className="mt-4 text-center text-sm">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
