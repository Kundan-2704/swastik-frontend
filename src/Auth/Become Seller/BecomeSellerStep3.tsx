// import { Box, TextField } from '@mui/material';
// import React from 'react';

// const BecomeSellerStep3 = ({ formik }: any) => {
//   return (
//     <Box>
//       <p className='text-xl font-bold text-center pb-9'>Bank Details</p>

//       <div>
//         <div className='space-y-9'>
        
//         <div>
//             <TextField
//             fullWidth
//             id="bankDetails.accountHolderName"
//             name="bankDetails.accountHolderName"
//             label="Account Holder Name"
//             value={formik.values.bankDetails.accountHolderName}
//             onChange={formik.handleChange}
//             error={
//               formik.touched.bankDetails?.accountHolderName &&
//               Boolean(formik.errors.bankDetails?.accountHolderName)
//             }
//             helperText={
//               formik.touched.bankDetails?.accountHolderName &&
//               (formik.errors.bankDetails?.accountHolderName as any)
//             }
//           />
//         </div>

//         </div>

//         <div>
//           <TextField
//             fullWidth
//             id="bankDetails.accountNumber"
//             name="bankDetails.accountNumber"
//             label="Account Number"
//             value={formik.values.bankDetails.accountNumber}
//             onChange={formik.handleChange}
//             error={
//               formik.touched.bankDetails?.accountNumber &&
//               Boolean(formik.errors.bankDetails?.accountNumber)
//             }
//             helperText={
//               formik.touched.bankDetails?.accountNumber &&
//               (formik.errors.bankDetails?.accountNumber as any)
//             }
//           />
//         </div>

//         <div>
//           <TextField
//             fullWidth
//             id="bankDetails.ifscCode"
//             name="bankDetails.ifscCode"
//             label="IFSC Code"
//             value={formik.values.bankDetails.ifscCode}
//             onChange={formik.handleChange}
//             error={
//               formik.touched.bankDetails?.ifscCode &&
//               Boolean(formik.errors.bankDetails?.ifscCode)
//             }
//             helperText={
//               formik.touched.bankDetails?.ifscCode &&
//               (formik.errors.bankDetails?.ifscCode as any)
//             }
//           />
//         </div>

//       </div>
//     </Box>
//   );
// };

// export default BecomeSellerStep3;




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
