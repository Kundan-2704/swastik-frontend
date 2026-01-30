// import { Box, Button, Grid, TextField } from "@mui/material";
// import { useFormik } from "formik";
// import { useAppDispatch } from "../../../Redux Toolkit/Store";
// import {
//   createAddress,
//   fetchUserAddresses,
// } from "../../../Redux Toolkit/Features/Customer/AddressSlice";

// const AddressForm = ({ onClose }: { onClose?: () => void }) => {
//   const dispatch = useAppDispatch();

//   const formik = useFormik({
//     initialValues: {
//       name: "",
//       mobile: "",
//       address: "",
//       city: "",
//       state: "",
//       pinCode: "",
//       locality: "",
//     },

//     // 🔥 LOGIC SAME AS SECOND CODE
//     onSubmit: async (value, { resetForm }) => {
//       try {
//         await dispatch(
//           createAddress({
//             address: value,
//             jwt: localStorage.getItem("jwt") || "",
//           })
//         ).unwrap();

//         dispatch(fetchUserAddresses(localStorage.getItem("jwt") || ""));
//         resetForm();
//         onClose && onClose();
//       } catch (error) {
//         console.error("Address save failed", error);
//       }
//     },
//   });

//   return (
//     <Box sx={{ maxWidth: 620, mx: "auto" }}>

//       {/* TITLE */}
//       <p className="text-2xl font-semibold text-center pb-6 text-[#4A1F2A] tracking-wide">
//         Add New Address
//       </p>

//       <form onSubmit={formik.handleSubmit}>
//         <Grid container spacing={3}>

//           {/* NAME */}
//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               name="name"
//               label="Full Name"
//               value={formik.values.name}
//               onChange={formik.handleChange}
//               InputLabelProps={{ style: { color: "#7A6A58" } }}
//               sx={inputStyle}
//             />
//           </Grid>

//           {/* MOBILE */}
//           <Grid item xs={12} sm={6}>
//             <TextField
//               fullWidth
//               name="mobile"
//               label="Mobile Number"
//               value={formik.values.mobile}
//               onChange={formik.handleChange}
//               InputLabelProps={{ style: { color: "#7A6A58" } }}
//               sx={inputStyle}
//             />
//           </Grid>

//           {/* PIN CODE */}
//           <Grid item xs={12} sm={6}>
//             <TextField
//               fullWidth
//               name="pinCode"
//               label="Pin Code"
//               value={formik.values.pinCode}
//               onChange={formik.handleChange}
//               InputLabelProps={{ style: { color: "#7A6A58" } }}
//               sx={inputStyle}
//             />
//           </Grid>

//           {/* ADDRESS */}
//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               name="address"
//               label="House No, Building, Street"
//               value={formik.values.address}
//               onChange={formik.handleChange}
//               InputLabelProps={{ style: { color: "#7A6A58" } }}
//               sx={inputStyle}
//             />
//           </Grid>

//           {/* LOCALITY */}
//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               name="locality"
//               label="Locality / Town"
//               value={formik.values.locality}
//               onChange={formik.handleChange}
//               InputLabelProps={{ style: { color: "#7A6A58" } }}
//               sx={inputStyle}
//             />
//           </Grid>

//           {/* CITY */}
//           <Grid item xs={12} sm={6}>
//             <TextField
//               fullWidth
//               name="city"
//               label="City"
//               value={formik.values.city}
//               onChange={formik.handleChange}
//               InputLabelProps={{ style: { color: "#7A6A58" } }}
//               sx={inputStyle}
//             />
//           </Grid>

//           {/* STATE */}
//           <Grid item xs={12} sm={6}>
//             <TextField
//               fullWidth
//               name="state"
//               label="State"
//               value={formik.values.state}
//               onChange={formik.handleChange}
//               InputLabelProps={{ style: { color: "#7A6A58" } }}
//               sx={inputStyle}
//             />
//           </Grid>

//           {/* SUBMIT */}
//           <Grid item xs={12}>
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{
//                 py: "14px",
//                 borderRadius: "999px",
//                 background:
//                   "linear-gradient(135deg, #4A1F2A, #7A3E4C, #B9935A)",
//                 fontWeight: 600,
//                 "&:hover": {
//                   background:
//                     "linear-gradient(135deg, #34121C, #693042, #A98340)",
//                 },
//               }}
//             >
//               Save Address
//             </Button>
//           </Grid>

//         </Grid>
//       </form>
//     </Box>
//   );
// };

// export default AddressForm;

// /* ================= STYLES ================= */

// const inputStyle = {
//   "& .MuiOutlinedInput-root": {
//     borderRadius: "14px",
//     background: "#FFF9F1",
//     "& fieldset": { borderColor: "#E3D4B6" },
//     "&:hover fieldset": { borderColor: "#B9935A" },
//     "&.Mui-focused fieldset": { borderColor: "#4A1F2A" },
//   },
// };







import { Box, Button, Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useAppDispatch } from "../../../Redux Toolkit/Store";
import {
  createAddress,
  fetchUserAddresses,
} from "../../../Redux Toolkit/Features/Customer/AddressSlice";

const AddressForm = ({ onClose }: { onClose?: () => void }) => {
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      mobile: "",
      address: "",
      city: "",
      state: "",
      pinCode: "",
      locality: "",
    },

    onSubmit: async (value, { resetForm }) => {
      try {
        await dispatch(
          createAddress({
            address: value,
            jwt: localStorage.getItem("jwt") || "",
          })
        ).unwrap();

        dispatch(fetchUserAddresses(localStorage.getItem("jwt") || ""));
        resetForm();
        onClose && onClose();
      } catch (error) {
        console.error("Address save failed", error);
      }
    },
  });

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: { xs: "100%", sm: 620 },
        mx: "auto",
        px: { xs: 2, sm: 3 },
        py: { xs: 2, sm: 3 },
      }}
    >
      {/* TITLE */}
      <p
        style={{
          textAlign: "center",
          fontWeight: 600,
          color: "#4A1F2A",
          fontSize: "clamp(1.1rem, 4vw, 1.5rem)",
          marginBottom: "1rem",
        }}
      >
        Add New Address
      </p>

      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField fullWidth name="name" label="Full Name" {...formik.getFieldProps("name")} sx={inputStyle} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField fullWidth name="mobile" label="Mobile Number" {...formik.getFieldProps("mobile")} sx={inputStyle} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField fullWidth name="pinCode" label="Pin Code" {...formik.getFieldProps("pinCode")} sx={inputStyle} />
          </Grid>

          <Grid item xs={12}>
            <TextField fullWidth name="address" label="House No, Building, Street" {...formik.getFieldProps("address")} sx={inputStyle} />
          </Grid>

          <Grid item xs={12}>
            <TextField fullWidth name="locality" label="Locality / Town" {...formik.getFieldProps("locality")} sx={inputStyle} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField fullWidth name="city" label="City" {...formik.getFieldProps("city")} sx={inputStyle} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField fullWidth name="state" label="State" {...formik.getFieldProps("state")} sx={inputStyle} />
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                py: "12px",
                borderRadius: "999px",
                fontWeight: 600,
                background:
                  "linear-gradient(135deg, #4A1F2A, #7A3E4C, #B9935A)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #34121C, #693042, #A98340)",
                },
              }}
            >
              Save Address
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AddressForm;

const inputStyle = {
  "& .MuiOutlinedInput-root": {
    height: 48,
    borderRadius: "14px",
    background: "#FFF9F1",
    "& fieldset": { borderColor: "#E3D4B6" },
    "&:hover fieldset": { borderColor: "#B9935A" },
    "&.Mui-focused fieldset": { borderColor: "#4A1F2A" },
  },
};
