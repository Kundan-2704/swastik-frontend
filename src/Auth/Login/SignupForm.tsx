


import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { sendLoginSignupOtp, signup } from "../../Redux Toolkit/Features/Auth/AuthSlice";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../Redux Toolkit/Store";

// import { signInWithPopup } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";

import { auth, googleProvider } from "../../Config/firebase";
import api from "../../Config/apiBase";


const SignupForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // select only auth slice
  const authState  = useAppSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      password: "",
      confirmPassword: "",
      otp: "",
    },
    onSubmit: (values) => {
  dispatch(
    signup({
      email: values.email,
      fullName: values.name, // ✅ correct mapping
      otp: values.otp,
      navigate,
    })
  );
},

  });

  const fieldSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "12px",
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
      paddingTop: "12px",
      paddingBottom: "12px",
      color: "#3B302A",
    },
  };

  const handleSentOtp = () => {
    if (!formik.values.email) return;
    dispatch(sendLoginSignupOtp({ email: formik.values.email }));
  };

const handleGoogleSignup = async () => {
  try {
    // 1️⃣ Google popup
    const result = await signInWithPopup(auth, googleProvider);

    // 2️⃣ Firebase ID token
    const idToken = await result.user.getIdToken(true);

    // 3️⃣ Backend signup
    const res = await api.post("/auth/google-signup", {
      idToken,
      autoLogin: false, // future UX ke liye
    });

    alert(res.data.message);

    // 4️⃣ redirect
    navigate("/login", { replace: true });


  } catch (error: any) {
    console.error("FRONTEND GOOGLE SIGNUP ERROR →", error);

    alert(
      error?.response?.data?.message ||
      error?.message ||
      "Google signup failed"
    );
  }
};






  return (
    <div className="space-y-6">
      <div className="bg-[#FFF8ED] border border-[#E3D4B6] rounded-2xl p-6 shadow-sm">
        <div className="space-y-4">

          {authState .otpSent && (
            <div>
              <TextField
                fullWidth
                label="Full Name"
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                sx={fieldSx}
              />
            </div>
          )}

          <div>
            <TextField
              fullWidth
              label="Email Address"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              sx={fieldSx}
            />
          </div>

          {authState.otpSent && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextField
                fullWidth
                label="Otp"
                id="otp"
                name="otp"
                type="text"
                value={formik.values.otp}
                onChange={formik.handleChange}
                sx={fieldSx}
              />
            </div>
          )}

          <Button
            onClick={authState.otpSent ? formik.handleSubmit : handleSentOtp}
            fullWidth
            type="button"
            disabled={authState.loading}
            variant="contained"
            sx={{
              py: "12px",
              borderRadius: "999px",
              textTransform: "none",
              fontWeight: 700,
              background:
                "linear-gradient(135deg, #8B5E34 0%, #C58B4E 40%, #E5B676 100%)",
              "&:hover": {
                background:
                  "linear-gradient(135deg, #6B4423 0%, #A86C34 40%, #D49A54 100%)",
                boxShadow: "0 8px 24px rgba(139,94,52,0.28)",
              },
            }}
          >
            {authState.loading ? "Please wait..." : "Create Account"}
          </Button>

          <Button
  onClick={handleGoogleSignup}
  fullWidth
  variant="outlined"
  sx={{
    py: "12px",
    borderRadius: "999px",
    textTransform: "none",
    fontWeight: 700,
    borderColor: "#E3D4B6",
    color: "#4A1F2A",
    "&:hover": {
      backgroundColor: "rgba(217,168,108,0.08)",
    },
  }}
>
  Sign up with Google
</Button>


          {authState.error && (
            <p className="text-sm text-red-600 text-center">
              {authState.error}
            </p>
          )}

        </div>
      </div>
    </div>
  );
};

export default SignupForm;
