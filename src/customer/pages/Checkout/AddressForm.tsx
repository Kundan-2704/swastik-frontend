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
