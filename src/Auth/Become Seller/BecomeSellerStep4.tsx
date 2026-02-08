import { Box, TextField } from "@mui/material";

const BecomeSellerStep4 = ({ formik }: any) => {
  return (
    <Box>
      <p className="text-xl font-semibold text-center pb-6 text-[#4A1F2A]">
        Business & Store Details
      </p>

      <div className="space-y-7">
        <TextField fullWidth label="Seller Name" {...formik.getFieldProps("sellerName")} />

        <TextField fullWidth label="Email" {...formik.getFieldProps("email")} />

        <TextField
          fullWidth
          label="Business Name"
          {...formik.getFieldProps("bussinessDetails.bussinessName")}
        />

        <TextField
          fullWidth
          label="Business Email"
          {...formik.getFieldProps("bussinessDetails.bussinessEmail")}
        />

        <TextField
          fullWidth
          label="Business Mobile"
          {...formik.getFieldProps("bussinessDetails.bussinessMobile")}
        />

        <TextField
          fullWidth
          multiline
          minRows={2}
          label="Business Address"
          {...formik.getFieldProps("bussinessDetails.bussinessAddress")}
        />

        <TextField
          fullWidth
          label="Pan Holder Name"
          {...formik.getFieldProps("panDetails.panHolderName")}
        />

        <TextField
          fullWidth
          label="Pan Number"
          {...formik.getFieldProps("panDetails.panNumber")}
        />

        <TextField
          fullWidth
          type="password"
          label="Create Password"
          {...formik.getFieldProps("password")}
        />
      </div>
    </Box>
  );
};

export default BecomeSellerStep4;
