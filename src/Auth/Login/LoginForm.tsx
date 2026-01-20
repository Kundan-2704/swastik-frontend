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





import React from "react";
import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "../../Redux Toolkit/Store";
import { sendLoginSignupOtp, signin } from "../../Redux Toolkit/Features/Auth/AuthSlice";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const auth = useAppSelector(state => state.auth);

  const formik = useFormik({
    initialValues: { email: "", otp: "" },
    onSubmit: (values) => {
      dispatch(signin({ ...values, navigate }));
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
    const email = "signin_" + formik.values.email;
    dispatch(sendLoginSignupOtp({ email }));
  };

  return (
    <form className="space-y-6">
      <div className="bg-[#FFF8ED] border border-[#E3D4B6] rounded-2xl p-6 shadow-sm">
        <div className="space-y-4">

          <TextField
            fullWidth
            label="Email Address"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            sx={fieldSx}
          />

          {auth.otpSent && (
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
          )}

          <Button
            onClick={auth.otpSent ? formik.handleSubmit : handleSentOtp}
            fullWidth
            type="button"
            variant="contained"
            disabled={auth.loading}
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
            {auth.loading ? "Please wait..." : "Login"}
          </Button>

        </div>
      </div>
    </form>
  );
};

export default LoginForm;
