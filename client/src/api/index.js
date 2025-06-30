// client/src/api/index.js
// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:5000/api", // Adjust based on your backend
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// export default api;
// client/src/api/index.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://electromart-server-eh9w.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
