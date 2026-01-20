import { Box, TextField } from "@mui/material";
import React from "react";

const BecomeSellerStep2 = ({ formik }: any) => {
  return (
    <Box>
      <p className="text-xl font-semibold text-center pb-6 text-[#4A1F2A]">
        Pickup Address
      </p>

      <div className="space-y-7">
        <TextField fullWidth label="Contact Person Name" {...formik.getFieldProps("pickupAddress.name")} />

        <TextField fullWidth label="Mobile" {...formik.getFieldProps("pickupAddress.mobile")} />

        <TextField fullWidth multiline minRows={2} label="Address" {...formik.getFieldProps("pickupAddress.address")} />

        <TextField fullWidth label="Locality" {...formik.getFieldProps("pickupAddress.locality")} />

        <div className="grid md:grid-cols-3 gap-6">
          <TextField label="City" {...formik.getFieldProps("pickupAddress.city")} />
          <TextField label="State" {...formik.getFieldProps("pickupAddress.state")} />
          <TextField label="Pin Code" {...formik.getFieldProps("pickupAddress.pinCode")} />
        </div>
      </div>
    </Box>
  );
};

export default BecomeSellerStep2;
