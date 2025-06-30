// client/src/admin/AdminLogin.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from "../api";


export default function AdminLogin() {
  const [creds, setCreds] = useState({ email: '', pwd: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // 1) send credentials to /auth/login
      const { data } = await api.post('/auth/login', {
        email: creds.email,
        password: creds.pwd
      });

      // 2) save token
      localStorage.setItem('token', data.token);

      // 3) OPTIONAL: verify that this user is an admin
      
      if (data.user?.role !== 'admin') {
        setError('Access denied: you must be an admin to log in here.');
        return;
      }

      // 4) redirect into the admin dashboard
      navigate('/admin/dashboard');
    } catch (err) {
      console.error('Admin login failed:', err);
      setError(
        err.response?.data?.message ||
        'Login failed. Please check your email and password.'
      );
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>

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
            placeholder="admin@example.com"
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
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
        >
          Log In as Admin
        </button>
      </form>

      <p className="mt-4 text-center text-sm">
        Back to{' '}
        <Link to="/login" className="text-indigo-600 hover:underline">
          User Login
        </Link>
      </p>
    </div>
  );
}