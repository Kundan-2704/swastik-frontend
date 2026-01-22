// import React, { use } from "react";
// import { Button, TextField } from "@mui/material";
// import { useFormik } from "formik";
// import { useAppDispatch, useAppSelector } from "../../Redux Toolkit/Store";
// import { sendLoginSignupOtp, signin } from "../../Redux Toolkit/Features/Auth/AuthSlice";
// import { useNavigate } from "react-router";


// const LoginForm = () => {
//   const { auth } = useAppSelector(store => store)
//   const navigate=useNavigate();
//   const formik = useFormik({
//     initialValues: { email: "", otp: "" },
//     onSubmit: (values) => {
//       console.log("Customer login:", values);
//       // TODO: replace with API call
//       dispatch(signin({ ...values, navigate }));
//     },
//   });

//   const dispatch=useAppDispatch();

//   const fieldSx = {
//     "& .MuiOutlinedInput-root": {
//       borderRadius: "12px",
//       backgroundColor: "#FFFDF9",
//       "& fieldset": { borderColor: "#E3D4B6" },
//       "&:hover fieldset": { borderColor: "#B9935A" },
//       "&.Mui-focused fieldset": {
//         borderColor: "#8B5E34",
//         boxShadow: "0 0 0 1px rgba(139,94,52,0.18)",
//       },
//     },
//     "& .MuiInputLabel-root": { color: "#7A6A58" },
//     "& .MuiInputBase-input": {
//       paddingTop: "12px",
//       paddingBottom: "12px",
//       color: "#3B302A",
//     },
//   };

//   const handleSentOtp = () => {
//     if (!formik.values.email) return;
//     dispatch(sendLoginSignupOtp({ email: formik.values.email }));
//   };


//   return (
//     <form onSubmit={formik.handleSubmit} className="space-y-6">
//       <div className="bg-[#FFF8ED] border border-[#E3D4B6] rounded-2xl p-6 shadow-sm">
//         <div className="space-y-4">
//           <TextField
//             fullWidth
//             label="Email Address"
//             id="email"
//             name="email"
//             value={formik.values.email}
//             onChange={formik.handleChange}
//             sx={fieldSx}
//           />

//           {auth.otpSent && <div>
//             <TextField
//               fullWidth
//               label="Otp"
//               id="otp"
//               name="otp"
//               type="otp"
//               value={formik.values.otp}
//               onChange={formik.handleChange}
//               sx={fieldSx}
//             />
//           </div>}

//           <div>
//             <Button
//               onClick={auth.otpSent ? formik.handleSubmit : handleSentOtp}
//               fullWidth
//               type="submit"
//               variant="contained"
//               sx={{
//                 py: "12px",
//                 borderRadius: "999px",
//                 textTransform: "none",
//                 fontWeight: 700,
//                 background:
//                   "linear-gradient(135deg, #8B5E34 0%, #C58B4E 40%, #E5B676 100%)",
//                 "&:hover": {
//                   background:
//                     "linear-gradient(135deg, #6B4423 0%, #A86C34 40%, #D49A54 100%)",
//                   boxShadow: "0 8px 24px rgba(139,94,52,0.28)",
//                 },
//               }}
//             >
//               Login
//             </Button>
//           </div>

//         </div>
//       </div>
//     </form>
//   );
// };

// export default LoginForm;





// import { Button, TextField } from "@mui/material";
// import { useFormik } from "formik";
// import { useAppDispatch, useAppSelector } from "../../Redux Toolkit/Store";
// import { sendLoginSignupOtp, signin } from "../../Redux Toolkit/Features/Auth/AuthSlice";
// import { useNavigate } from "react-router-dom";

// import { signInWithPopup } from "firebase/auth";
// import { auth as firebaseAuth, googleProvider } from "../../Config/firebase";

// import api from "../../Config/api.ts";


// const LoginForm = () => {
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();

//   // const auth = useAppSelector(state => state.auth);
//   const authState = useAppSelector(state => state.auth);

//   const formik = useFormik({
//     initialValues: { email: "", otp: "" },
//     onSubmit: (values) => {
//       dispatch(signin({ ...values, navigate }));
//     },
//   });

//   const fieldSx = {
//     "& .MuiOutlinedInput-root": {
//       borderRadius: "12px",
//       backgroundColor: "#FFFDF9",
//       "& fieldset": { borderColor: "#E3D4B6" },
//       "&:hover fieldset": { borderColor: "#B9935A" },
//       "&.Mui-focused fieldset": {
//         borderColor: "#8B5E34",
//         boxShadow: "0 0 0 1px rgba(139,94,52,0.18)",
//       },
//     },
//     "& .MuiInputLabel-root": { color: "#7A6A58" },
//     "& .MuiInputBase-input": {
//       paddingTop: "12px",
//       paddingBottom: "12px",
//       color: "#3B302A",
//     },
//   };

//   const handleSentOtp = () => {
//     if (!formik.values.email) return;
//     const email = "signin_" + formik.values.email;
//     dispatch(sendLoginSignupOtp({ email }));
//   };


// const handleGoogleLogin = async () => {
//   try {
//     const result = await signInWithPopup(firebaseAuth, googleProvider);

//     const idToken = await result.user.getIdToken(true);

//     const res = await api.post("/auth/google-login", {
//       idToken,
//     });

//     localStorage.setItem("jwt", res.data.token);

//     alert("Login successful");
//     // navigate("/");

//     const role = res.data.user.role;

// if (role === "customer") {
//   navigate("/"); // homepage
// } else if (role === "seller") {
//   navigate("/seller/dashboard");
// } else if (role === "admin") {
//   navigate("/admin");
// }


//   } catch (error: any) {
//     console.error("GOOGLE LOGIN ERROR →", error);
//     alert(error?.response?.data?.message || "Google login failed");
//   }
// };




//   return (
//     <form className="space-y-6">
//       <div className="bg-[#FFF8ED] border border-[#E3D4B6] rounded-2xl p-6 shadow-sm">
//         <div className="space-y-4">

//           <TextField
//             fullWidth
//             label="Email Address"
//             id="email"
//             name="email"
//             value={formik.values.email}
//             onChange={formik.handleChange}
//             sx={fieldSx}
//           />

//           {authState.otpSent && (
//             <TextField
//               fullWidth
//               label="Otp"
//               id="otp"
//               name="otp"
//               type="text"
//               value={formik.values.otp}
//               onChange={formik.handleChange}
//               sx={fieldSx}
//             />
//           )}

//           <Button
//             onClick={() =>
//               authState.otpSent ? formik.handleSubmit() : handleSentOtp()
//             }
//             fullWidth
//             type="button"
//             variant="contained"
//             disabled={authState.loading}
//             sx={{
//               py: "12px",
//               borderRadius: "999px",
//               textTransform: "none",
//               fontWeight: 700,
//               background:
//                 "linear-gradient(135deg, #8B5E34 0%, #C58B4E 40%, #E5B676 100%)",
//               "&:hover": {
//                 background:
//                   "linear-gradient(135deg, #6B4423 0%, #A86C34 40%, #D49A54 100%)",
//                 boxShadow: "0 8px 24px rgba(139,94,52,0.28)",
//               },
//             }}
//           >
//             {authState.loading ? "Please wait..." : "Login"}
//           </Button>

//           <Button
//   onClick={handleGoogleLogin}
//   fullWidth
//   variant="outlined"
// >
//   Login with Google
// </Button>



//         </div>
//       </div>
//     </form>
//   );
// };

// export default LoginForm;







import React, { useEffect } from "react";
import { Button, TextField } from "@mui/material";
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

// ======================================================
// LOGIN FORM
// ======================================================
const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authState = useAppSelector((state) => state.auth);

  // ======================================================
  // FORMIK
  // ======================================================
  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
    },
    onSubmit: (values) => {
      dispatch(signin({ ...values, navigate }));
    },
  });

  // ======================================================
  // AUTO REDIRECT IF ALREADY LOGGED IN
  // ======================================================



  // ======================================================
  // SEND OTP
  // ======================================================
  const handleSentOtp = () => {
    if (!formik.values.email) return;
    const email = "signin_" + formik.values.email;
    dispatch(sendLoginSignupOtp({ email }));
  };

  // ======================================================
  // GOOGLE LOGIN
  // ======================================================
const handleGoogleLogin = async () => {
  try {
    const result = await signInWithPopup(firebaseAuth, googleProvider);
    const idToken = await result.user.getIdToken(true);

    const res = await api.post("/auth/google-login", { idToken });

    // 🔥 even if backend sends extra fields
    if (res.data?.token) {
      localStorage.setItem("jwt", res.data.token);

      // FORCE customer homepage
      window.location.href = "/";
      return;
    }

    alert("Login failed");

  } catch (error: any) {
    console.error("GOOGLE LOGIN ERROR →", error);

    // 🔥 TEMPORARY BYPASS (DEV ONLY)
    if (error?.response?.status === 403) {
      alert("Backend role issue – forcing login as customer");
      window.location.href = "/";
      return;
    }

    alert("Google login failed");
  }
};


  // ======================================================
  // UI
  // ======================================================
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

  return (
    <form className="space-y-6">
      <div className="bg-[#FFF8ED] border border-[#E3D4B6] rounded-2xl p-6 shadow-sm">
        <div className="space-y-4">
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
              background:
                "linear-gradient(135deg, #8B5E34 0%, #C58B4E 40%, #E5B676 100%)",
              "&:hover": {
                background:
                  "linear-gradient(135deg, #6B4423 0%, #A86C34 40%, #D49A54 100%)",
                boxShadow: "0 8px 24px rgba(139,94,52,0.28)",
              },
            }}
          >
            {authState.loading ? "Please wait..." : "Login"}
          </Button>

          {/* GOOGLE LOGIN */}
          <Button
            onClick={handleGoogleLogin}
            fullWidth
            variant="outlined"
            sx={{ borderRadius: "999px" }}
          >
            Login with Google
          </Button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
