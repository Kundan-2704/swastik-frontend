// import { Button, TextField } from "@mui/material";
// import { useFormik } from "formik";
// import React, { useEffect } from "react";
// import { useAppDispatch, useAppSelector } from "../../Redux Toolkit/Store";
// import {
//   sendLoginOtp,
//   verifyLoginOtp,
// } from "../../Redux Toolkit/Features/Seller/SellerAuthenticationSlice";
// import { useNavigate } from "react-router-dom";

// interface Props {
//   embedded?: boolean;
// }

// const SellerLogin: React.FC<Props> = ({ embedded = false }) => {
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();

//   const sellerAuth = useAppSelector(
//     (state) => state.seller.sellerAuth
//   );

//   /* ✅ Redirect ONLY for standalone page */
//   useEffect(() => {
//     if (sellerAuth.jwt) {
//       navigate("/seller", { replace: true });
//     }
//   }, [sellerAuth.jwt, navigate]);

//   const formik = useFormik({
//     initialValues: {
//       email: "",
//       otp: "",
//     },
//     onSubmit: async (values) => {
//       const res: any = await dispatch(
//         verifyLoginOtp(values)
//       );

//       if (res.meta.requestStatus === "fulfilled") {
//         navigate("/seller", { replace: true });
//       }
//     },
//   });

//   const handleSendOtp = () => {
//     if (!formik.values.email.trim()) return;
//     dispatch(sendLoginOtp({ email: formik.values.email }));
//   };

//   const Wrapper = embedded ? React.Fragment : "div";
//   const wrapperProps = embedded
//     ? {}
//     : { className: "min-h-screen flex items-center justify-center bg-[#FFF9F0] px-4" };

//   return (
//     <Wrapper {...wrapperProps}>
//       <div className="w-full max-w-xl bg-[#FFFCF7] border border-[#E6D6B8] rounded-3xl shadow-xl p-10">
//         <h1 className="text-2xl font-semibold text-center text-[#4A1F2A] mb-6">
//           Seller Login
//         </h1>

//         <div className="space-y-6">
//           <TextField
//             fullWidth
//             name="email"
//             label="Email Address"
//             value={formik.values.email}
//             onChange={formik.handleChange}
//           />

//           {sellerAuth.otpSent && (
//             <TextField
//               fullWidth
//               name="otp"
//               label="Enter OTP"
//               value={formik.values.otp}
//               onChange={formik.handleChange}
//             />
//           )}

//           <Button
//             fullWidth
//             onClick={sellerAuth.otpSent ? formik.handleSubmit : handleSendOtp}
//             variant="contained"
//           >
//             {sellerAuth.otpSent ? "Login" : "Send OTP"}
//           </Button>
//         </div>
//       </div>
//     </Wrapper>
//   );
// };

// export default SellerLogin;





import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../Redux Toolkit/Store";
import {
  sendLoginOtp,
  verifyLoginOtp,
} from "../../Redux Toolkit/Features/Seller/SellerAuthenticationSlice";
import { useNavigate } from "react-router-dom";

interface Props {
  embedded?: boolean;
}

const SellerLogin: React.FC<Props> = ({ embedded = false }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const sellerAuth = useAppSelector(
    (state) => state.seller.sellerAuth
  );

  /* ✅ Redirect ONLY for standalone page */
  useEffect(() => {
    if (sellerAuth.jwt) {
      navigate("/seller", { replace: true });
    }
  }, [sellerAuth.jwt, navigate]);

  /* 🔒 Disable scroll ONLY for standalone login page */
  useEffect(() => {
    if (!embedded) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "auto";
      };
    }
  }, [embedded]);

  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
    },
    onSubmit: async (values) => {
      const res: any = await dispatch(
        verifyLoginOtp(values)
      );

      if (res.meta.requestStatus === "fulfilled") {
        navigate("/seller", { replace: true });
      }
    },
  });

  const handleSendOtp = () => {
    if (!formik.values.email.trim()) return;
    dispatch(sendLoginOtp({ email: formik.values.email }));
  };

  /* ✅ STRICT wrapper */
  const Wrapper = embedded ? React.Fragment : "div";
  const wrapperProps = embedded
  ? {}
  : {
      className:
        "fixed inset-0 z-50 flex items-center justify-center bg-[#FFF9F0] px-4 overflow-hidden",
    };


  return (
    <Wrapper {...wrapperProps}>
      <div className="w-full max-w-xl bg-[#FFFCF7] border border-[#E6D6B8] rounded-[32px] shadow-2xl p-10">

        {/* Header */}
        <p className="text-center text-xs tracking-widest text-[#C6A36A] mb-2">
          WELCOME TO SWASTIK
        </p>

        <h1 className="text-3xl font-bold text-center text-[#4A1F2A] mb-2">
          Seller Login
        </h1>

        <p className="text-center text-sm text-gray-500 mb-8">
          Login to your account to manage your store
        </p>

        {/* Form Box */}
        <div className="bg-[#FFF8ED] border border-[#E6D6B8] rounded-2xl p-6 space-y-5 shadow-md">

          <TextField
            fullWidth
            name="email"
            label="Email Address"
            value={formik.values.email}
            onChange={formik.handleChange}
            sx={{
              backgroundColor: "#FFF",
              borderRadius: "14px",
            }}
          />

          {sellerAuth.otpSent && (
            <TextField
              fullWidth
              name="otp"
              label="Enter OTP"
              value={formik.values.otp}
              onChange={formik.handleChange}
              sx={{
                backgroundColor: "#FFF",
                borderRadius: "14px",
              }}
            />
          )}

          <Button
            fullWidth
            onClick={sellerAuth.otpSent ? formik.handleSubmit : handleSendOtp}
            variant="contained"
            sx={{
              mt: 1,
              height: 52,
              borderRadius: "999px",
              background:
                "linear-gradient(90deg, #8B5E34 0%, #D4A373 100%)",
              fontWeight: 600,
              textTransform: "none",
              fontSize: "16px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
              "&:hover": {
                background:
                  "linear-gradient(90deg, #7A4E2A 0%, #C1925E 100%)",
              },
            }}
          >
            {sellerAuth.otpSent ? "Login" : "Send OTP"}
          </Button>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-8">
          New seller?{" "}
          <span className="font-semibold text-[#4A1F2A] cursor-pointer">
            Contact Admin
          </span>
        </p>
      </div>
    </Wrapper>
  );
};

export default SellerLogin;
