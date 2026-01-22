// import axios from "axios";

// export const apiAdmin = axios.create({
//     baseURL: import.meta.env.VITE_API_BASE_URL,
//     headers: {
//         "Content-Type": "application/json",
//     },
// });
// apiAdmin.interceptors.request.use(
//     (config) => {
//         const adminToken = localStorage.getItem("admin_jwt");

//         if (adminToken) {
//             config.headers.Authorization = `Bearer ${adminToken}`;
//         }

//         return config;
//     },
//     (error) => Promise.reject(error)
// );



// import axios from "axios";

// export const apiAdmin = axios.create({
//     baseURL: import.meta.env.VITE_API_BASE_URL,
//     headers: {
//         "Content-Type": "application/json",
//     },
// });
// apiAdmin.interceptors.response.use(
//   res => res,
//   err => {
//     if (err.response?.status === 401) {
//       localStorage.removeItem("admin_jwt");
//       window.location.href = "/admin/login";
//     }
//     return Promise.reject(err);
//   }
// );





import axios from "axios";

export const apiAdmin = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiAdmin.interceptors.request.use((config) => {
  const token = localStorage.getItem("admin_jwt");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiAdmin.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem("admin_jwt");
      window.location.href = "/admin/login";
    }
    return Promise.reject(err);
  }
);
