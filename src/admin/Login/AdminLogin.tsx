// import { useState } from "react";
// import { Button, TextField, Alert } from "@mui/material";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const AdminLogin = () => {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState("");
//   const [otpSent, setOtpSent] = useState(false);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
  

//   const sendOtp = async () => {
//     try {
//       setError("");
//       setLoading(true);

//       await axios.post("http://127.0.0.1:5000/auth/send/login-signup-otp", {
//         email,
//       });

//       setOtpSent(true);
//     } catch (err: any) {
//       setError(err.response?.data?.message || "Failed to send OTP");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const verifyOtp = async () => {
//     try {
//       setError("");
//       setLoading(true);

//       const res = await axios.post(
//         "http://127.0.0.1:5000/auth/signin",
//         { email, otp }
//       );

//       if (res.data.role !== "ROLE_ADMIN") {
//         throw new Error("Not an admin account");
//       }

//       localStorage.setItem("admin_jwt", res.data.jwt);
//       navigate("/Admin");


//     } catch (err: any) {
//       setError(err.response?.data?.message || "Invalid OTP");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#FFFCF7]">
//       <div className="bg-white p-6 rounded-2xl w-96 shadow border">
//         <h2 className="text-2xl font-semibold text-center mb-6">
//           Admin Login (OTP)
//         </h2>

//         {error && <Alert severity="error">{error}</Alert>}

//         <TextField
//           fullWidth
//           label="Admin Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           margin="normal"
//         />

//         {otpSent && (
//           <TextField
//             fullWidth
//             label="Enter OTP"
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//             margin="normal"
//           />
//         )}

//         {!otpSent ? (
//           <Button
//             fullWidth
//             variant="contained"
//             onClick={sendOtp}
//             disabled={loading}
//             sx={{ mt: 3 }}
//           >
//             {loading ? "Sending OTP..." : "Send OTP"}
//           </Button>
//         ) : (
//           <Button
//             fullWidth
//             variant="contained"
//             onClick={verifyOtp}
//             disabled={loading}
//             sx={{ mt: 3 }}
//           >
//             {loading ? "Verifying..." : "Verify & Login"}
//           </Button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminLogin;





// import { useState } from "react";
// import { Button, TextField, Alert } from "@mui/material";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const AdminLogin = () => {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState("");
//   const [otpSent, setOtpSent] = useState(false);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const API = import.meta.env.VITE_API_BASE_URL;

//   const sendOtp = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       await axios.post(`${API}/auth/send/login-signup-otp`, { email });
//       setOtpSent(true);
//     } catch (e: any) {
//       setError(e.response?.data?.message || "OTP send failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const verifyOtp = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const res = await axios.post(`${API}/auth/signin`, {
//         email,
//         otp,
//       });

//       if (res.data.role !== "ROLE_ADMIN") {
//         throw new Error("Not admin account");
//       }

//       localStorage.setItem("admin_jwt", res.data.jwt);
//       navigate("/admin");
//     } catch (e: any) {
//       setError(e.response?.data?.message || "Invalid OTP");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#FFFCF7]">
//       <div className="bg-white p-6 rounded-2xl w-96 shadow border">
//         <h2 className="text-2xl font-semibold text-center mb-6">
//           Admin Login (OTP)
//         </h2>

//         {error && <Alert severity="error">{error}</Alert>}

//         <TextField
//           fullWidth
//           label="Admin Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           margin="normal"
//         />

//         {otpSent && (
//           <TextField
//             fullWidth
//             label="Enter OTP"
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//             margin="normal"
//           />
//         )}

//         {!otpSent ? (
//           <Button
//             fullWidth
//             variant="contained"
//             onClick={sendOtp}
//             disabled={loading}
//             sx={{ mt: 3 }}
//           >
//             {loading ? "Sending OTP..." : "Send OTP"}
//           </Button>
//         ) : (
//           <Button
//             fullWidth
//             variant="contained"
//             onClick={verifyOtp}
//             disabled={loading}
//             sx={{ mt: 3 }}
//           >
//             {loading ? "Verifying..." : "Verify & Login"}
//           </Button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminLogin;





// import { useState } from "react";
// import { Button, TextField, Alert } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import api from "../../Config/api.ts";
// import { signInWithPopup } from "firebase/auth";
// import { auth, googleProvider } from "../../Config/firebase";

// const AdminLogin = () => {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState("");
//   const [otpSent, setOtpSent] = useState(false);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   /* ================= OTP LOGIN ================= */

//   const sendOtp = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       await api.post("/auth/send/login-signup-otp", {
//         email: "admin_" + email,
//       });

//       setOtpSent(true);
//     } catch (e: any) {
//       setError(e.response?.data?.message || "OTP send failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const verifyOtp = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const res = await api.post("/auth/signin", {
//         email: "admin_" + email,
//         otp,
//       });

//       if (res.data.user.role !== "ADMIN") {
//         throw new Error("Not an admin account");
//       }

//       localStorage.setItem("admin_jwt", res.data.token);

//       // 🔥 HARD redirect (NO BUG, NO GUARD ISSUE)
//       window.location.replace("/admin");
//     } catch (e: any) {
//       setError(e.response?.data?.message || "Invalid OTP");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ================= GOOGLE LOGIN ================= */

//   const handleGoogleLogin = async () => {
//     try {
//       const result = await signInWithPopup(auth, googleProvider);
//       const idToken = await result.user.getIdToken(true);

//       const res = await api.post("/auth/google-login", { idToken });

//       if (res.data.role !== "ADMIN") {
//         throw new Error("Not an admin account");
//       }

//       localStorage.setItem("admin_jwt", res.data.token);

//       // 🔥 backend redirect (best)
//       window.location.replace(res.data.redirect || "/admin");

//     } catch (error: any) {
//       console.error("GOOGLE ADMIN LOGIN ERROR →", error);
//       alert(error?.response?.data?.message || error.message || "Google login failed");
//     }
//   };

//   /* ================= UI ================= */

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#FFFCF7]">
//       <div className="bg-white p-6 rounded-2xl w-96 shadow border">
//         <h2 className="text-2xl font-semibold text-center mb-6">
//           Admin Login
//         </h2>

//         {error && <Alert severity="error">{error}</Alert>}

//         <TextField
//           fullWidth
//           label="Admin Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           margin="normal"
//         />

//         {otpSent && (
//           <TextField
//             fullWidth
//             label="Enter OTP"
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//             margin="normal"
//           />
//         )}

//         {!otpSent ? (
//           <Button
//             fullWidth
//             variant="contained"
//             onClick={sendOtp}
//             disabled={loading}
//             sx={{ mt: 3 }}
//           >
//             {loading ? "Sending OTP..." : "Send OTP"}
//           </Button>
//         ) : (
//           <Button
//             fullWidth
//             variant="contained"
//             onClick={verifyOtp}
//             disabled={loading}
//             sx={{ mt: 3 }}
//           >
//             {loading ? "Verifying..." : "Login as Admin"}
//           </Button>
//         )}

//         {/* 🔥 GOOGLE LOGIN */}
//         <Button
//           fullWidth
//           variant="outlined"
//           onClick={handleGoogleLogin}
//           sx={{ mt: 2 }}
//         >
//           Login with Google
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default AdminLogin;






import { useState } from "react";
import { Button, TextField, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../../Config/api.ts";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../Config/firebase";

import { useEffect } from "react";


const AdminLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /* ================= OTP LOGIN ================= */

  const sendOtp = async () => {
    try {
      setLoading(true);
      setError("");

      await api.post("/auth/send/login-signup-otp", {
        email: "admin_" + email,
      });

      setOtpSent(true);
    } catch (err: any) {
      setError(err.response?.data?.message || "OTP send failed");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await api.post("/auth/signin", {
        email: "admin_" + email,
        otp,
      });

      if (res.data.user?.role !== "ADMIN") {
        throw new Error("Not an admin account");
      }

      localStorage.setItem("admin_jwt", res.data.token);

      // 🔥 SIMPLE NAVIGATE (no extra verify)
      navigate("/admin", { replace: true });
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  /* ================= GOOGLE LOGIN ================= */

 

useEffect(() => {
  const token = localStorage.getItem("admin_jwt");
  const role = localStorage.getItem("role"); // ROLE_ADMIN

  if (token && (role === "ROLE_ADMIN" || role === "ADMIN")) {
    navigate("/admin", { replace: true });
  }
}, [navigate]);





const handleGoogleLogin = async () => {
  try {
    setLoading(true);
    setError("");

    const result = await signInWithPopup(auth, googleProvider);
    const idToken = await result.user.getIdToken(true);

    const res = await api.post("/auth/google-login", { idToken });

    const role = res.data.user?.role;

    // 🔥 normalize role (MOST IMPORTANT)
    const isAdmin =
      role === "ADMIN" ||
      role === "ROLE_ADMIN" ||
      role === "admin";

    if (!isAdmin) {
      throw new Error("Not an admin account");
    }

    if (!res.data.token) {
      throw new Error("Token not received");
    }

    localStorage.setItem("admin_jwt", res.data.token);

    // 🔥 GUARANTEED redirect
    navigate("/admin", { replace: true });

  } catch (err: any) {
    console.error("ADMIN GOOGLE LOGIN ERROR:", err);
    setError(
      err.response?.data?.message ||
      err.message ||
      "Google login failed"
    );
  } finally {
    setLoading(false);
  }
};


  /* ================= UI ================= */

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFCF7]">
      <div className="bg-white p-6 rounded-2xl w-96 shadow border">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Admin Login
        </h2>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <TextField
          fullWidth
          label="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
        />

        {otpSent && (
          <TextField
            fullWidth
            label="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            margin="normal"
          />
        )}

        {!otpSent ? (
          <Button
            fullWidth
            variant="contained"
            onClick={sendOtp}
            disabled={loading}
            sx={{ mt: 3 }}
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </Button>
        ) : (
          <Button
            fullWidth
            variant="contained"
            onClick={verifyOtp}
            disabled={loading}
            sx={{ mt: 3 }}
          >
            {loading ? "Verifying..." : "Login as Admin"}
          </Button>
        )}

        <Button
          fullWidth
          variant="outlined"
          onClick={handleGoogleLogin}
          disabled={loading}
          sx={{ mt: 2 }}
        >
          Login with Google
        </Button>
      </div>
    </div>
  );
};

export default AdminLogin;
