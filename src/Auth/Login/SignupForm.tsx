// // import { Button, TextField } from "@mui/material";
// import { useFormik } from "formik";
// import { sendLoginSignupOtp, signup } from "../../Redux Toolkit/Features/Auth/AuthSlice";
// import { useNavigate } from "react-router";

// const SignupForm = () => {
  
//   const navigate = useNavigate();
//   const formik = useFormik({
//     initialValues: {
//       name: "",
//       email: "",
//       mobile: "",
//       password: "",
//       confirmPassword: "",
//     },
//     onSubmit: (values) => {
//       console.log("Customer signup:", values);
//       // TODO: call signup API
//       dispatch(signup({...values,navigate}))
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

//   const handleSentOtp=()=>{
//     dispatch(sendLoginSignupOtp({email:formik.values.email}))
//   }

//   return (
//     <div  className="space-y-6">
//       <div className="bg-[#FFF8ED] border border-[#E3D4B6] rounded-2xl p-6 shadow-sm">
//         <div className="space-y-4">
          
//           {auth.otpSent && <div>
//             <TextField
//             fullWidth
//             label="Full Name"
//             id="name"
//             name="name"
//             value={formik.values.name}
//             onChange={formik.handleChange}
//             sx={fieldSx}
//           />
//           </div>}

//          <div>
//            <TextField
//             fullWidth
//             label="Email Address"
//             id="email"
//             name="email"
//             value={formik.values.email}
//             onChange={formik.handleChange}
//             sx={fieldSx}
//           />
//          </div>

     

//           {auth.otpSent && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <TextField
//               fullWidth
//               label="Otp"
//               id="otp"
//               name="otp"
//               type="otp"
//               value={formik.values.password}
//               onChange={formik.handleChange}
//               sx={fieldSx}
//             />

//           </div>}

//           <Button
//           onClick={auth.otpSent?formik.handleSubmit:handleSentOtp}
//             fullWidth
//             type="submit"
//             variant="contained"
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
//             Create Account
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignupForm;


import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { sendLoginSignupOtp, signup } from "../../Redux Toolkit/Features/Auth/AuthSlice";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../Redux Toolkit/Store";

const SignupForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // select only auth slice
  const auth = useAppSelector((state) => state.auth);

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

  return (
    <div className="space-y-6">
      <div className="bg-[#FFF8ED] border border-[#E3D4B6] rounded-2xl p-6 shadow-sm">
        <div className="space-y-4">

          {auth.otpSent && (
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

          {auth.otpSent && (
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
            onClick={auth.otpSent ? formik.handleSubmit : handleSentOtp}
            fullWidth
            type="button"
            disabled={auth.loading}
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
            {auth.loading ? "Please wait..." : "Create Account"}
          </Button>

          {auth.error && (
            <p className="text-sm text-red-600 text-center">
              {auth.error}
            </p>
          )}

        </div>
      </div>
    </div>
  );
};

export default SignupForm;
