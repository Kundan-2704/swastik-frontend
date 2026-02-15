import { useState } from "react";
import { Button, TextField, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../../Config/api.ts";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../Config/firebase";

import { useEffect } from "react";
import { apiAdmin } from "../../Config/apiAdmin.ts";


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

      await apiAdmin.post("/auth/send/login-signup-otp", {
        email: email,
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

      const res = await apiAdmin.post("/auth/signin", {
        email:  email,
        otp,
      });

      if (res.data.role !== "ROLE_ADMIN") {
        throw new Error("Not an admin account");
      }

      // localStorage.setItem("admin_jwt", res.data.token);
      localStorage.setItem("admin_jwt", res.data.jwt);
localStorage.setItem("role", res.data.role); // ⭐ IMPORTANT

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
