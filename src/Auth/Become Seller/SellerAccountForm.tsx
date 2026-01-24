



// import { Button, Step, StepLabel, Stepper } from "@mui/material";
// import { useFormik } from "formik";
// import BecomeSellerStep1 from "./BecomeSellerStep1";
// import BecomeSellerStep2 from "./BecomeSellerStep2";
// import BecomeSellerStep3 from "./BecomeSellerStep3";
// import BecomeSellerStep4 from "./BecomeSellerStep4";
// import { useAppDispatch } from "../../Redux Toolkit/Store";
// import { createSeller } from "../../Redux Toolkit/Features/Seller/SellerAuthenticationSlice";

// const steps = [
//   "Tax & Contact",
//   "Pickup Address",
//   "Bank Details",
//   "Business Details",
// ];

// const SellerAccountForm = () => {
//   const [activeStep, setActiveStep] = React.useState(0);

//   const dispatch = useAppDispatch();

 
//   const formik = useFormik({
//     initialValues: {
//       sellerName: "",
//       email: "",
//       mobile: "",
//       password: "",
//       GSTIN: "",

//       pickupAddress: {
//         addressLine1: "",
//         addressLine2: "",
//         city: "",
//         state: "",
//         pinCode: "",
//         locality: ""
//       },

//       bankDetails: {
//         accountHolderName: "",
//         accountNumber: "",
//         ifscCode: "",
//         bankName: "",
//         branchName: ""
//       },

//       businessDetails: {
//         businessName: "",
//         businessEmail: "",
//         businessMobile: "",
//         businessAddress: ""
//       }
//     },

//     onSubmit: (values) => {
//       const payload = {
//         sellerName: values.sellerName,
//         email: values.email,
//         mobile: values.mobile,
//         password: values.password,
//         GSTIN: values.GSTIN,

//         pickupAddress: {
//           name: values.sellerName,
//           mobile: values.mobile,
//           address:
//             values.pickupAddress.addressLine1 +
//             " " +
//             values.pickupAddress.addressLine2,
//           locality:
//             values.pickupAddress.locality ||
//             values.pickupAddress.city,
//           city: values.pickupAddress.city,
//           state: values.pickupAddress.state,
//           pinCode: values.pickupAddress.pinCode
//         },

//         bankDetails: values.bankDetails,
//         businessDetails: values.businessDetails
//       };

//       dispatch(createSeller(payload));
//     }
//   });






//   return (
//     <div className="space-y-10">

//       {/* PREMIUM STEPPER */}
//       <Stepper
//         activeStep={activeStep}
//         alternativeLabel
//         sx={{
//           "& .MuiStepLabel-label": { color: "#7A6A58", fontSize: 13 },
//           "& .Mui-active .MuiStepLabel-label": { color: "#4A1F2A", fontWeight: 600 },
//           "& .MuiStepIcon-root": { color: "#E3D4B6" },
//           "& .MuiStepIcon-root.Mui-active": { color: "#B9935A" },
//           "& .MuiStepIcon-root.Mui-completed": { color: "#B9935A" },
//         }}
//       >
//         {steps.map((label) => (
//           <Step key={label}>
//             <StepLabel>{label}</StepLabel>
//           </Step>
//         ))}
//       </Stepper>

//       {/* FORM BOX */}
//       <div className="bg-[#FFF8ED] border border-[#E3D4B6] shadow-sm rounded-2xl p-6">
//         {{
//           0: <BecomeSellerStep1 formik={formik} />,
//           1: <BecomeSellerStep2 formik={formik} />,
//           2: <BecomeSellerStep3 formik={formik} />,
//           3: <BecomeSellerStep4 formik={formik} />,
//         }[activeStep]}
//       </div>

//       {/* BUTTONS */}
//       <div className="flex justify-between">
//         <Button
//           variant="outlined"
//           disabled={activeStep === 0}
//           onClick={() => setActiveStep(activeStep - 1)}
//           sx={{
//             px: 4,
//             borderRadius: "999px",
//             textTransform: "none",
//             color: "#4A1F2A",
//             borderColor: "#D9B27C",
//             "&:hover": { background: "#FFF5E7", borderColor: "#B9935A" },
//           }}
//         >
//           Back
//         </Button>

//         <Button
//           variant="contained"
//           onClick={
//             activeStep === steps.length - 1
//               ? formik.handleSubmit
//               : () => setActiveStep(activeStep + 1)
//           }
//           sx={{
//             px: 5,
//             py: 1,
//             borderRadius: "999px",
//             textTransform: "none",
//             fontWeight: 600,
//             background:
//               "linear-gradient(135deg, #8B5E34 0%, #C58B4E 40%, #E5B676 100%)",
//             "&:hover": {
//               background:
//                 "linear-gradient(135deg, #6B4423 0%, #A86C34 40%, #D49A54 100%)",
//             },
//           }}
//         >
//           {activeStep === steps.length - 1 ? "Create Account" : "Next"}
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default SellerAccountForm;








import React from "react";
import { Button, Step, StepLabel, Stepper } from "@mui/material";
import { useFormik } from "formik";
import { useAppDispatch } from "../../Redux Toolkit/Store";
import { createSeller } from "../../Redux Toolkit/Features/Seller/SellerAuthenticationSlice";

import BecomeSellerStep1 from "./BecomeSellerStep1";
import BecomeSellerStep2 from "./BecomeSellerStep2";
import BecomeSellerStep3 from "./BecomeSellerStep3";
import BecomeSellerStep4 from "./BecomeSellerStep4";

const steps = [
  "Tax & Contact",
  "Pickup Address",
  "Bank Details",
  "Business Details",
];

interface Props {
  onSuccess: () => void;
}

const SellerAccountForm: React.FC<Props> = ({ onSuccess }) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      sellerName: "",
      email: "",
      mobile: "",
      password: "",
      GSTIN: "",

      pickupAddress: {
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        pinCode: "",
        locality: "",
      },

      bankDetails: {
        accountHolderName: "",
        accountNumber: "",
        ifscCode: "",
        bankName: "",
        branchName: "",
      },

      businessDetails: {
        businessName: "",
        businessEmail: "",
        businessMobile: "",
        businessAddress: "",
      },
    },

    onSubmit: async (values, { setSubmitting }) => {
      const payload = {
        sellerName: values.sellerName,
        email: values.email,
        mobile: values.mobile,
        password: values.password,
        GSTIN: values.GSTIN,

        pickupAddress: {
          name: values.sellerName,
          mobile: values.mobile,
          address:
            values.pickupAddress.addressLine1 +
            " " +
            values.pickupAddress.addressLine2,
          locality: values.pickupAddress.locality || values.pickupAddress.city,
          city: values.pickupAddress.city,
          state: values.pickupAddress.state,
          pinCode: values.pickupAddress.pinCode,
        },

        bankDetails: values.bankDetails,
        businessDetails: values.businessDetails,
      };

      try {
        const res: any = await dispatch(createSeller(payload));

        // ✅ GUARANTEED SUCCESS HANDLER
        if (res.meta.requestStatus === "fulfilled") {
          onSuccess();
        }
      } catch (error) {
        console.error("Seller create failed", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="space-y-10">
      {/* STEPPER */}
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        sx={{
          "& .MuiStepLabel-label": { color: "#7A6A58", fontSize: 13 },
          "& .Mui-active .MuiStepLabel-label": {
            color: "#4A1F2A",
            fontWeight: 600,
          },
          "& .MuiStepIcon-root": { color: "#E3D4B6" },
          "& .MuiStepIcon-root.Mui-active": { color: "#B9935A" },
          "& .MuiStepIcon-root.Mui-completed": { color: "#B9935A" },
        }}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* FORM BODY */}
      <div className="bg-[#FFF8ED] border border-[#E3D4B6] shadow-sm rounded-2xl p-6">
        {{
          0: <BecomeSellerStep1 formik={formik} />,
          1: <BecomeSellerStep2 formik={formik} />,
          2: <BecomeSellerStep3 formik={formik} />,
          3: <BecomeSellerStep4 formik={formik} />,
        }[activeStep]}
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex justify-between">
        <Button
          variant="outlined"
          disabled={activeStep === 0 || formik.isSubmitting}
          onClick={() => setActiveStep(activeStep - 1)}
          sx={{
            px: 4,
            borderRadius: "999px",
            textTransform: "none",
            color: "#4A1F2A",
            borderColor: "#D9B27C",
            "&:hover": { background: "#FFF5E7", borderColor: "#B9935A" },
          }}
        >
          Back
        </Button>

        <Button
          variant="contained"
          disabled={formik.isSubmitting}
          onClick={
            activeStep === steps.length - 1
              ? formik.handleSubmit
              : () => setActiveStep(activeStep + 1)
          }
          sx={{
            px: 5,
            py: 1,
            borderRadius: "999px",
            textTransform: "none",
            fontWeight: 600,
            background:
              "linear-gradient(135deg, #8B5E34 0%, #C58B4E 40%, #E5B676 100%)",
            "&:hover": {
              background:
                "linear-gradient(135deg, #6B4423 0%, #A86C34 40%, #D49A54 100%)",
            },
          }}
        >
          {activeStep === steps.length - 1
            ? formik.isSubmitting
              ? "Creating..."
              : "Create Account"
            : "Next"}
        </Button>
      </div>
    </div>
  );
};

export default SellerAccountForm;
