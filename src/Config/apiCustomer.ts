import axios from "axios";

export const apiCustomer = axios.create({
 baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiCustomer.interceptors.request.use(
  (config) => {
    const userToken = localStorage.getItem("jwt");

    if (userToken) {
      config.headers.Authorization = `Bearer ${userToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);




