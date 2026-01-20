// import axios from 'axios'

// export const api = axios.create({
//     baseURL: 'http://localhost:5000',
//     headers: {
//         // 'Content-Type': 'application-json'
//         'Content-Type': 'application/json'

//     }
// })

// import axios from "axios";

// export const api = axios.create({
//   baseURL: "http://localhost:5000",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });


// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("jwt");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });



// import axios from "axios";

// export const api = axios.create({
//   baseURL: "http://localhost:5000",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// api.interceptors.request.use(
//   (config) => {
//     const token =
//       localStorage.getItem("seller_jwt") || // 👈 seller token
//       localStorage.getItem("jwt");          // 👈 fallback (user/admin)

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );
