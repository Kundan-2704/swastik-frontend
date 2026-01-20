// import { Box, TextField } from '@mui/material';
// import React from 'react';

// const BecomeSellerStep4 = ({ formik }: any) => {
//   return (
//     <Box>
//       <p className='text-xl font-bold text-center pb-9'>Business Details</p>

//       <div className='space-y-9'>
//         {/* Seller basic details */}

//         <div>
//           <TextField
//             fullWidth
//             id="sellerName"
//             name="sellerName"
//             label="Seller Name"
//             value={formik.values.sellerName}
//             onChange={formik.handleChange}
//             error={formik.touched.sellerName && Boolean(formik.errors.sellerName)}
//             helperText={formik.touched.sellerName && (formik.errors.sellerName as any)}
//           />
//         </div>

//         <div>
//           <TextField
//             fullWidth
//             id="email"
//             name="email"
//             label="Email"
//             value={formik.values.email}
//             onChange={formik.handleChange}
//             error={formik.touched.email && Boolean(formik.errors.email)}
//             helperText={formik.touched.email && (formik.errors.email as any)}
//           />
//         </div>

//         {/* Business details nested object */}

//         <div>
//           <TextField
//             fullWidth
//             id="bussinessDetails.bussinessName"
//             name="bussinessDetails.bussinessName"
//             label="Business Name"
//             value={formik.values.bussinessDetails.bussinessName}
//             onChange={formik.handleChange}
//             error={
//               formik.touched.bussinessDetails?.bussinessName &&
//               Boolean(formik.errors.bussinessDetails?.bussinessName)
//             }
//             helperText={
//               formik.touched.bussinessDetails?.bussinessName &&
//               (formik.errors.bussinessDetails?.bussinessName as any)
//             }
//           />
//         </div>

//         <div>
//           <TextField
//             fullWidth
//             id="bussinessDetails.bussinessEmail"
//             name="bussinessDetails.bussinessEmail"
//             label="Business Email"
//             value={formik.values.bussinessDetails.bussinessEmail}
//             onChange={formik.handleChange}
//             error={
//               formik.touched.bussinessDetails?.bussinessEmail &&
//               Boolean(formik.errors.bussinessDetails?.bussinessEmail)
//             }
//             helperText={
//               formik.touched.bussinessDetails?.bussinessEmail &&
//               (formik.errors.bussinessDetails?.bussinessEmail as any)
//             }
//           />
//         </div>

//         <div>
//           <TextField
//             fullWidth
//             id="bussinessDetails.bussinessMobile"
//             name="bussinessDetails.bussinessMobile"
//             label="Business Mobile"
//             value={formik.values.bussinessDetails.bussinessMobile}
//             onChange={formik.handleChange}
//             error={
//               formik.touched.bussinessDetails?.bussinessMobile &&
//               Boolean(formik.errors.bussinessDetails?.bussinessMobile)
//             }
//             helperText={
//               formik.touched.bussinessDetails?.bussinessMobile &&
//               (formik.errors.bussinessDetails?.bussinessMobile as any)
//             }
//           />
//         </div>

//         <div>
//           <TextField
//             fullWidth
//             id="bussinessDetails.bussinessAddress"
//             name="bussinessDetails.bussinessAddress"
//             label="Business Address"
//             multiline
//             minRows={2}
//             value={formik.values.bussinessDetails.bussinessAddress}
//             onChange={formik.handleChange}
//             error={
//               formik.touched.bussinessDetails?.bussinessAddress &&
//               Boolean(formik.errors.bussinessDetails?.bussinessAddress)
//             }
//             helperText={
//               formik.touched.bussinessDetails?.bussinessAddress &&
//               (formik.errors.bussinessDetails?.bussinessAddress as any)
//             }
//           />
//         </div>

//         {/* If you want file upload later you can replace these with upload components */}
//         <div>
//           <TextField
//             fullWidth
//             id="bussinessDetails.logo"
//             name="bussinessDetails.logo"
//             label="Logo URL (optional)"
//             value={formik.values.bussinessDetails.logo}
//             onChange={formik.handleChange}
//             error={
//               formik.touched.bussinessDetails?.logo &&
//               Boolean(formik.errors.bussinessDetails?.logo)
//             }
//             helperText={
//               formik.touched.bussinessDetails?.logo &&
//               (formik.errors.bussinessDetails?.logo as any)
//             }
//           />
//         </div>

//         <div>
//           <TextField
//             fullWidth
//             id="bussinessDetails.banner"
//             name="bussinessDetails.banner"
//             label="Banner URL (optional)"
//             value={formik.values.bussinessDetails.banner}
//             onChange={formik.handleChange}
//             error={
//               formik.touched.bussinessDetails?.banner &&
//               Boolean(formik.errors.bussinessDetails?.banner)
//             }
//             helperText={
//               formik.touched.bussinessDetails?.banner &&
//               (formik.errors.bussinessDetails?.banner as any)
//             }
//           />
//         </div>

//         {/* Password for login */}

//         <div>
//           <TextField
//             fullWidth
//             id="password"
//             name="password"
//             type="password"
//             label="Create Password"
//             value={formik.values.password}
//             onChange={formik.handleChange}
//             error={formik.touched.password && Boolean(formik.errors.password)}
//             helperText={formik.touched.password && (formik.errors.password as any)}
//           />
//         </div>

//       </div>
//     </Box>
//   );
// };

// export default BecomeSellerStep4;




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
          label="Logo URL (optional)"
          {...formik.getFieldProps("bussinessDetails.logo")}
        />

        <TextField
          fullWidth
          label="Banner URL (optional)"
          {...formik.getFieldProps("bussinessDetails.banner")}
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
