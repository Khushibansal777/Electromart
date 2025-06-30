import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.svg";

export default function Navbar() {
  const { cartItems } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const logoutt = () => {
    localStorage.removeItem("token"); // Remove token
    navigate("/login"); // Redirect to login page (or "/")
  };

  return (
    <nav className="bg-gray-900 text-white px-4 py-3 flex items-center justify-between shadow-md sticky top-0 z-50">
      <Link
        to="/categories"
        className="text-xl font-bold flex items-center gap-2"
      >
        <div className="flex items-center gap-2">
          <img src={Logo} alt="ElectroMart Logo" className="h-12 w-12" />
          <span className="text-xl font-bold text-sky-600">ElectroMart</span>
        </div>
      </Link>

      <div className="space-x-6 flex items-center">
        <Link
          to="/cart"
          className="relative flex items-center border border-blue-500 text-blue-500 px-3 py-1 rounded hover:bg-blue-500 hover:text-white transition"
        >
          <span className="text-xl">🛒</span>
          <span className="ml-2">Cart</span>

          {cartItems?.length > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full animate-bounce shadow-md">
              {cartItems.length}
            </span>
          )}
        </Link>

        {user ? (
          <>
            <span className="text-green-600 font-semibold ">
              Welcome , {user.name} !
            </span>

            <button
              onClick={logoutt}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
            <Link to="/register" className="hover:underline">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
