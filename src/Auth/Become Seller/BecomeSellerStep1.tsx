

import { Box, TextField } from "@mui/material";
import React from "react";

const BecomeSellerStep1 = ({ formik }: any) => {
  return (
    <Box>
      <p className="text-xl font-semibold text-center pb-6 text-[#4A1F2A]">
        Tax & Contact Details
      </p>

      <div className="space-y-7">
        <TextField fullWidth label="Mobile Number" {...formik.getFieldProps("mobile")} />

        <TextField fullWidth label="GSTIN" {...formik.getFieldProps("GSTIN")} />
      </div>
    </Box>
  );
};

export default BecomeSellerStep1;
