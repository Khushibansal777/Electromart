import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";

// User pages
import Register from "./user/Register";
import Login from "./user/Login";
import CategoryList from "./user/CategoryList";
import ProductList from "./user/ProductList";
import OrderConfirm from "./user/OrderConfirm";
import ThankYou from "./user/ThankYou";
import CartPage from "./user/CartPage";
import BulkEnquiry from "./user/BulkEnquiry";
import Footer from "./components/Footer";

// Admin pages
import AdminDashboard from "./admin/AdminDashboard";
import CategoryManager from "./admin/CategoryManager";
import OrderList from "./admin/OrderList";
import AdminBulkEnquiries from "./admin/AdminBulkEnquiries";
import PrivateAdminRoute from "./admin/PrivateAdminRoute";

function PrivateRoute({ children, adminOnly = false, loginPath = "/login" }) {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to={loginPath} replace />;

  if (adminOnly) {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "admin") {
      return <Navigate to={loginPath} replace />;
    }
  }

  return children;
}

function AppLayout() {
  const location = useLocation();
  const path = location.pathname;

  const hideNavbar =
    path === "/login" || path === "/register" || path.startsWith("/admin");

  const showFooter = path === "/categories";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* Public routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* User routes */}
        <Route
          path="/categories"
          element={
            <PrivateRoute>
              <CategoryList />
            </PrivateRoute>
          }
        />
        <Route
          path="/bulk-enquiry/:productId"
          element={
            <PrivateRoute>
              <BulkEnquiry />
            </PrivateRoute>
          }
        />
        <Route
          path="/products/:catId"
          element={
            <PrivateRoute>
              <ProductList />
            </PrivateRoute>
          }
        />
        <Route
          path="/confirm"
          element={
            <PrivateRoute>
              <OrderConfirm />
            </PrivateRoute>
          }
        />
        <Route
          path="/thank-you"
          element={
            <PrivateRoute>
              <ThankYou />
            </PrivateRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <CartPage />
            </PrivateRoute>
          }
        />

        {/* Admin routes */}
        <Route path="/admin" element={<PrivateAdminRoute />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="categories" element={<CategoryManager />} />
          <Route path="orders" element={<OrderList />} />
          <Route path="bulk-enquiries" element={<AdminBulkEnquiries />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>

      {/* Show footer only on /categories */}
      {showFooter && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}
