// src/admin/PrivateAdminRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function PrivateAdminRoute() {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/admin/login" />;

  try {
    const decoded = jwtDecode(token);
    if (decoded.role !== "admin") return <Navigate to="/admin/login" />;
  } catch {
    return <Navigate to="/admin/login" />;
  }

  return <Outlet />;
}
