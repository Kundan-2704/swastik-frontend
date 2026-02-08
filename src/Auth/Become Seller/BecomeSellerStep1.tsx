

// import { Box, TextField } from "@mui/material";


// const BecomeSellerStep1 = ({ formik }: any) => {
//   return (
//     <Box>
//       <p className="text-xl font-semibold text-center pb-6 text-[#4A1F2A]">
//         Tax & Contact Details
//       </p>

//       <div className="space-y-7">
//         <TextField fullWidth label="Mobile Number" {...formik.getFieldProps("mobile")} />

//         <TextField fullWidth label="GSTIN" {...formik.getFieldProps("GSTIN")} />
//       </div>
//     </Box>
//   );
// };

// export default BecomeSellerStep1;




import { Box, TextField, Checkbox, FormControlLabel } from "@mui/material";
import React from "react";

interface Props {
  formik: any;
  acceptedSellerTerms: boolean;
  setAcceptedSellerTerms: (value: boolean) => void;
}

const BecomeSellerStep1: React.FC<Props> = ({
  formik,
  acceptedSellerTerms,
  setAcceptedSellerTerms,
}) => {
  return (
    <Box>
      <p className="text-xl font-semibold text-center pb-6 text-[#4A1F2A]">
        Tax & Contact Details
      </p>

      <div className="space-y-7">
        <TextField
          fullWidth
          label="Mobile Number"
          {...formik.getFieldProps("mobile")}
        />

        <TextField
          fullWidth
          label="GSTIN"
          {...formik.getFieldProps("GSTIN")}
        />

        {/* ✅ SELLER AGREEMENT */}
        <FormControlLabel
          sx={{
    marginLeft: 0,
    alignItems: "center",
    "& .MuiCheckbox-root": {
      padding: "2px",
      marginRight: "6px",
    },
    "& .MuiFormControlLabel-label": {
      fontSize: "12.5px",
      color: "#6B5A4A",
      lineHeight: 1.4,
      marginTop: "2px",
    },
  }}
          control={
            <Checkbox
              checked={acceptedSellerTerms}
              onChange={(e) => setAcceptedSellerTerms(e.target.checked)}
              sx={{
                color: "#C58B4E",
                "&.Mui-checked": {
                  color: "#8B5E34",
                },
              }}
            />
          }
          label={
            <span>
              I agree to the{" "}
              <a
                href="/seller-agreement"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-[#8B5E34] hover:text-[#6B4423]"
              >
                Seller Agreement
              </a>{" "}
              and{" "}
              <a
                href="/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-[#8B5E34] hover:text-[#6B4423]"
              >
                Privacy Policy
              </a>
            </span>
          }
        />
      </div>
    </Box>
  );
};

export default BecomeSellerStep1;
