import React, { useState } from "react";
import {
  Button,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";

import { useAppDispatch, useAppSelector } from "../../Redux Toolkit/Store";
import {
  sendLoginSignupOtp,
  signin,
} from "../../Redux Toolkit/Features/Auth/AuthSlice";

import { auth as firebaseAuth, googleProvider } from "../../Config/firebase";
import api from "../../Config/api.ts";

const LoginForm = ({switchToSignup } : any) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authState = useAppSelector((state) => state.auth);

  // ============================
  // SNACKBAR STATE
  // ============================
  const [snack, setSnack] = useState<{
    open: boolean;
    message: string;
    type: "success" | "error" | "info";
  }>({
    open: false,
    message: "",
    type: "success",
  });

  const showSnack = (
    message: string,
    type: "success" | "error" | "info" = "success"
  ) => {
    setSnack({ open: true, message, type });
  };

  // ============================
  // FORMIK
  // ============================
  // const formik = useFormik({
  //   initialValues: {
  //     email: "",
  //     otp: "",
  //   },
  //   onSubmit: (values) => {
  //     dispatch(signin({ ...values, navigate }));
  //   },
  // });


  const formik = useFormik({
  initialValues: {
    email: "",
    otp: "",
  },

  onSubmit: async (values) => {
    try {
      await dispatch(signin({ ...values, navigate })).unwrap();
    } catch (error: any) {
      showSnack(
        error?.message || "Account not found. Please create an account.",
        "error"
      );
    }
  },
});

  // ============================
  // SEND OTP
  // ============================
  const handleSentOtp = async () => {
    if (!formik.values.email) {
      showSnack("Please enter your email", "info");
      return;
    }

    try {
      const email = "signin_" + formik.values.email;
      await dispatch(sendLoginSignupOtp({ email }));
      showSnack("OTP sent. Please check your email", "success");
    } catch {
      showSnack("Failed to send OTP", "error");
    }
  };

  // ============================
  // GOOGLE LOGIN
  // ============================
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(firebaseAuth, googleProvider);
      const idToken = await result.user.getIdToken(true);
      const res = await api.post("/auth/google-login", { idToken });

      if (res.data?.token) {
        localStorage.setItem("jwt", res.data.token);
        showSnack("Welcome back to Swastik", "success");

        setTimeout(() => {
          window.location.href = "/";
        }, 1500);
        return;
      }

      showSnack("Login failed", "error");
    } catch (error: any) {
      console.error("GOOGLE LOGIN ERROR →", error);
      showSnack(
  "No account found. Please create your account to continue.",
  "error"
);
    }
  };

  // ============================
  // STYLES
  // ============================
  const fieldSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "14px",
      backgroundColor: "#FFFDF9",
      "& fieldset": { borderColor: "#E3D4B6" },
      "&:hover fieldset": { borderColor: "#B9935A" },
      "&.Mui-focused fieldset": {
        borderColor: "#8B5E34",
        boxShadow: "0 0 0 1px rgba(139,94,52,0.18)",
      },
    },
    "& .MuiInputLabel-root": { color: "#7A6A58" },
    "& .MuiInputBase-input": {
      paddingTop: "14px",
      paddingBottom: "14px",
      color: "#3B302A",
    },
  };

  return (
    <>
      <form className="space-y-8">
        <div className="bg-[#FFF8ED] border border-[#E3D4B6] rounded-3xl p-8 shadow-md">
          <div className="space-y-6">
            {/* EMAIL */}
            <TextField
              fullWidth
              label="Email Address"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              sx={fieldSx}
            />

{/* 👇 YAHAN ADD KARO */}
<div className="text-xs text-[#8A7765] mt-3">
  We’ll send you a one-time OTP to login or create your account
</div>
{/* <div className="text-xs text-[#8A7765] -mb-3">
      Enter the OTP sent to your email
    </div> */}
            {/* OTP */}
            {authState.otpSent && (
              <TextField
                fullWidth
                label="OTP"
                id="otp"
                name="otp"
                type="text"
                value={formik.values.otp}
                onChange={formik.handleChange}
                sx={fieldSx}
              />
            )}

            {/* LOGIN BUTTON */}
            <div className="pt-2">
              <Button
                onClick={() =>
                  authState.otpSent ? formik.handleSubmit() : handleSentOtp()
                }
                fullWidth
                type="button"
                variant="contained"
                disabled={authState.loading}
                sx={{
                  py: "12px",
                  borderRadius: "999px",
                  textTransform: "none",
                  fontWeight: 700,
                  fontSize: "15px",
                  background:
                    "linear-gradient(135deg, #8B5E34 0%, #C58B4E 40%, #E5B676 100%)",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #6B4423 0%, #A86C34 40%, #D49A54 100%)",
                    boxShadow: "0 10px 30px rgba(139,94,52,0.3)",
                  },
                }}
              >
                {authState.loading ? "Please wait..." : "Login"}
                {/* {authState.loading
  ? "Please wait..."
  : authState.otpSent
  ? "Verify OTP"
  : "Login / Sign Up"} */}
              </Button>
            </div>

            {/* DIVIDER */}
            <div className="flex items-center gap-3 py-1">
              <div className="flex-1 h-px bg-[#E3D4B6]" />
              <span className="text-xs text-[#8A7765] font-medium">OR</span>
              <div className="flex-1 h-px bg-[#E3D4B6]" />
            </div>

            {/* GOOGLE LOGIN */}
            <Button
              onClick={handleGoogleLogin}
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon sx={{ color: "#8B5E34", opacity: 0.9 }} />}
              sx={{
                py: "12px",
                borderRadius: "999px",
                textTransform: "none",
                fontWeight: 600,
                fontSize: "14px",
                borderColor: "#E3D4B6",
                color: "#4A1F2A",
                backgroundColor: "#FFFDF9",
                "&:hover": {
                  backgroundColor: "rgba(217,168,108,0.08)",
                  borderColor: "#C58B4E",
                },
              }}
            >
              Continue with Google
            </Button>
          </div>
          <div className="text-center pt-2">
  <span className="text-sm text-[#7A6A58]">
    Don’t have an account?
  </span>

  <button
    type="button"
    onClick={switchToSignup}
    className="ml-2 text-[#8B5E34] font-semibold hover:underline cursor-pointer"
  >
    Create Account
  </button>
</div>
        </div>
      </form>

      {/* ============================
          SNACKBAR
      ============================ */}
      <Snackbar
        open={snack.open}
        autoHideDuration={2500}
        onClose={() => setSnack({ ...snack, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity={snack.type}
          sx={{
            backgroundColor: "#FFF8ED",
            color: "#4A1F2A",
            border: "1px solid #E3D4B6",
            borderRadius: "12px",
            fontWeight: 500,
          }}
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default LoginForm;
