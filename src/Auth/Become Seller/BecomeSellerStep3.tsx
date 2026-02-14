import { Box, TextField } from "@mui/material";

const BecomeSellerStep3 = ({ formik }: any) => {
  return (
    <Box>
      <p className="text-xl font-semibold text-center pb-6 text-[#4A1F2A]">
        Bank Details
      </p>

      <div className="space-y-7">
        <TextField
          fullWidth
          label="Account Holder Name"
          {...formik.getFieldProps("bankDetails.accountHolderName")}
        />

        <TextField
          fullWidth
          label="Account Number"
          {...formik.getFieldProps("bankDetails.accountNumber")}
        />

        <TextField fullWidth label="IFSC Code" {...formik.getFieldProps("bankDetails.ifscCode")} />
        <TextField fullWidth label="Bank Name" {...formik.getFieldProps("bankDetails.bankName")} />
        <TextField fullWidth label="Branch Name" {...formik.getFieldProps("bankDetails.branchName")} />
      </div>
    </Box>
  );
};

export default BecomeSellerStep3;
