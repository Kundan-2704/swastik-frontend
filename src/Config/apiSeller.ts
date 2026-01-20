import axios from "axios";

export const apiSeller = axios.create({
 baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiSeller.interceptors.request.use(
  (config) => {
    const sellerToken = localStorage.getItem("jwt"); // ✅ FIX HERE

    if (sellerToken) {
      config.headers.Authorization = `Bearer ${sellerToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);
