import axios from "axios";

export const apiAdmin = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});
apiAdmin.interceptors.request.use(
    (config) => {
        const adminToken = localStorage.getItem("admin_jwt");

        if (adminToken) {
            config.headers.Authorization = `Bearer ${adminToken}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);