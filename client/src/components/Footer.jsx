import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-4 mt-auto">
      <div className="container mx-auto px-4">
        {/* Top: Logo and Social Icons */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-6">
          {/* Logo / Brand */}
          <h1 className="text-2xl font-bold mb-4 md:mb-0 text-white">
            <i className="fas fa-store text-green-400 mr-2"></i> ElectroMart
          </h1>

          {/* Social Links */}
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-500 transition">
              <i className="fab fa-facebook-f text-xl"></i>
            </a>
            <a href="#" className="hover:text-black transition">
              <i className="fab fa-x-twitter text-xl"></i>
            </a>
            <a href="#" className="hover:text-pink-500 transition">
              <i className="fab fa-instagram text-xl"></i>
            </a>
            <a href="#" className="hover:text-red-600 transition">
              <i className="fab fa-youtube text-xl"></i>
            </a>
            <a href="#" className="hover:text-blue-600 transition">
              <i className="fab fa-linkedin-in text-xl"></i>
            </a>
          </div>
        </div>

        {/* Middle: Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-6 text-gray-400">
          <div>
            <h3 className="text-white font-semibold mb-2">Company</h3>
            <ul>
              <li>
                <a href="#" className="hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Press
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2">Support</h3>
            <ul>
              <li>
                <a href="#" className="hover:underline">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Shipping Info
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2">Legal</h3>
            <ul>
              <li>
                <a href="#" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Terms of Use
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Security
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2">Contact</h3>
            <ul>
              <li>
                <a href="#" className="hover:underline">
                  Email Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Live Chat
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  +91 12345 67890
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom: Copyright */}
        <div className="text-center text-sm text-gray-500 border-t border-gray-700 pt-4">
          &copy; {new Date().getFullYear()} ElectroMart. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
