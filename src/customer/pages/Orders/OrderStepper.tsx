





// // =========================
// //  PREMIUM ORDER STEPPER
// //  AUTO STATUS BASED (FINAL)
// // =========================

// // import {
//   Stepper,
//   Step,
//   StepLabel,
//   StepConnector,
//   stepConnectorClasses,
// } from "@mui/material";
// import { styled } from "@mui/material/styles";

// import {
//   ShoppingBag,
//   Warehouse,
//   LocalShipping,
//   CheckCircle,
//   Cancel,
//   Undo,
//   Payments,
// } from "@mui/icons-material";

// // ===============================
// // PREMIUM CONNECTOR
// // ===============================
// const PremiumConnector = styled(StepConnector)(() => ({
//   [`&.${stepConnectorClasses.alternativeLabel}`]: { top: 22 },
//   [`& .${stepConnectorClasses.line}`]: {
//     height: 3,
//     border: 0,
//     backgroundColor: "#E3D4B6",
//     borderRadius: 1,
//   },
//   [`&.${stepConnectorClasses.active} .${stepConnectorClasses.line}`]: {
//     backgroundColor: "#B9935A",
//   },
//   [`&.${stepConnectorClasses.completed} .${stepConnectorClasses.line}`]: {
//     backgroundColor: "#B9935A",
//   },
// }));

// // ===============================
// // STEP ICON
// // ===============================
// const IconBox = styled("div")(({ ownerState }: any) => ({
//   backgroundColor:
//     ownerState.active || ownerState.completed ? "#B9935A" : "#FFF5E7",
//   border:
//     ownerState.active || ownerState.completed
//       ? "2px solid #8B5E34"
//       : "2px solid #E3D4B6",
//   color: ownerState.active || ownerState.completed ? "#FFF" : "#7A6A58",
//   width: 42,
//   height: 42,
//   borderRadius: "50%",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   transition: "0.3s",
//   boxShadow: ownerState.active
//     ? "0 0 10px rgba(185,147,90,0.6)"
//     : "none",
// }));

// // ===============================
// // ICON MAPS
// // ===============================
// const normalIcons: any = {
//   1: <ShoppingBag />,
//   2: <Warehouse />,
//   3: <LocalShipping />,
//   4: <CheckCircle />,
// };

// const cancelIcons: any = {
//   1: <ShoppingBag />,
//   2: <Cancel />,
// };

// const returnIcons: any = {
//   1: <CheckCircle />,
//   2: <Undo />,
//   3: <Payments />,
// };

// // ===============================
// // STATUS → STEP MAPPING (KEY FIX)
// // ===============================
// const STATUS_MAP: Record<
//   string,
//   { type: "normal" | "cancelled" | "returned"; step: number }
// > = {
//   PENDING: { type: "normal", step: 0 },
//   PLACED: { type: "normal", step: 0 },
//   PACKED: { type: "normal", step: 1 },
//   SHIPPED: { type: "normal", step: 2 },
//   DELIVERED: { type: "normal", step: 3 },
//   CANCELLED: { type: "cancelled", step: 1 },
//   RETURNED: { type: "returned", step: 2 },
// };

// // ===============================
// // MAIN COMPONENT
// // ===============================
// const OrderStepper = ({
//   orderStatus,
//   dates = [],
// }: {
//   orderStatus: string;
//   dates?: string[];
// }) => {
//   const statusKey = orderStatus?.toUpperCase() || "PENDING";
//   const config = STATUS_MAP[statusKey] || STATUS_MAP.PENDING;

//   let steps: string[] = [];
//   let iconSet: any = {};

//   if (config.type === "normal") {
//     steps = ["Order Placed", "Packed", "Shipped", "Delivered"];
//     iconSet = normalIcons;
//   }

//   if (config.type === "cancelled") {
//     steps = ["Order Placed", "Cancelled"];
//     iconSet = cancelIcons;
//   }

//   if (config.type === "returned") {
//     steps = ["Return Picked", "Returned to Seller", "Refund Completed"];
//     iconSet = returnIcons;
//   }

//   const IconRenderer = (props: any) => {
//     const { active, completed, icon } = props;
//     return (
//       <IconBox ownerState={{ active, completed }}>
//         {iconSet[icon]}
//       </IconBox>
//     );
//   };

//   return (
//     <Stepper
//       alternativeLabel
//       activeStep={config.step}
//       connector={<PremiumConnector />}
//       sx={{ padding: "20px 0" }}
//     >
//       {steps.map((label, index) => (
//         <Step key={label}>
//           <StepLabel
//             StepIconComponent={IconRenderer}
//             sx={{
//               "& .MuiStepLabel-label": {
//                 color: "#7A6A58",
//                 marginTop: "6px",
//                 fontSize: "13px",
//               },
//               "& .Mui-active .MuiStepLabel-label": {
//                 color: "#4A1F2A",
//                 fontWeight: 600,
//               },
//               "& .Mui-completed .MuiStepLabel-label": {
//                 color: "#4A1F2A",
//                 fontWeight: 600,
//               },
//             }}
//           >
//             <div className="flex flex-col items-center">
//               <span>{label}</span>

//               {dates[index] && (
//                 <span className="text-[11px] text-[#B9935A] mt-1">
//                   {dates[index]}
//                 </span>
//               )}

//               {config.type === "cancelled" && index === 1 && (
//                 <span className="text-[10px] text-red-600 mt-1">
//                   Order Cancelled • Refund Initiated
//                 </span>
//               )}

//               {config.type === "returned" && index === 2 && (
//                 <span className="text-[10px] text-[#4A1F2A] mt-1">
//                   Refund Credited Successfully
//                 </span>
//               )}
//             </div>
//           </StepLabel>
//         </Step>
//       ))}
//     </Stepper>
//   );
// };

// export default OrderStepper;





// =========================
//  PREMIUM ORDER STEPPER
//  NO PACKED (FINAL)
// =========================

import {
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  stepConnectorClasses,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import {
  ShoppingBag,
  HourglassBottom,
  LocalShipping,
  CheckCircle,
  Cancel,
} from "@mui/icons-material";

// ===============================
// CONNECTOR
// ===============================
const PremiumConnector = styled(StepConnector)(() => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: { top: 22 },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: "#E3D4B6",
    borderRadius: 1,
  },
  [`&.${stepConnectorClasses.active} .${stepConnectorClasses.line}`]: {
    backgroundColor: "#B9935A",
  },
  [`&.${stepConnectorClasses.completed} .${stepConnectorClasses.line}`]: {
    backgroundColor: "#B9935A",
  },
}));

// ===============================
// STEP ICON
// ===============================
const IconBox = styled("div")(({ ownerState }: any) => ({
  backgroundColor:
    ownerState.active || ownerState.completed ? "#B9935A" : "#FFF5E7",
  border:
    ownerState.active || ownerState.completed
      ? "2px solid #8B5E34"
      : "2px solid #E3D4B6",
  color: ownerState.active || ownerState.completed ? "#FFF" : "#7A6A58",
  width: 42,
  height: 42,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "0.3s",
}));

// ===============================
// ICON SETS
// ===============================
const normalIcons: any = {
  1: <ShoppingBag />,       // Order Placed
  2: <HourglassBottom />,   // Pending
  3: <LocalShipping />,     // Shipped
  4: <CheckCircle />,       // Delivered
};

const cancelIcons: any = {
  1: <ShoppingBag />,
  2: <Cancel />,
};

// ===============================
// STATUS → STEP
// ===============================
const STATUS_MAP: any = {
  PLACED: { type: "normal", step: 0 },
  PENDING: { type: "normal", step: 1 },
  SHIPPED: { type: "normal", step: 2 },
  DELIVERED: { type: "normal", step: 3 },
  CANCELLED: { type: "cancelled", step: 1 },
};

// ===============================
// COMPONENT
// ===============================
const OrderStepper = ({ orderStatus }: { orderStatus: string }) => {
  const statusKey = orderStatus?.toUpperCase() || "PLACED";
  const config = STATUS_MAP[statusKey] || STATUS_MAP.PLACED;

  let steps: string[] = [];
  let iconSet: any = {};

  if (config.type === "normal") {
    steps = ["Order Placed", "Pending", "Shipped", "Delivered"];
    iconSet = normalIcons;
  }

  if (config.type === "cancelled") {
    steps = ["Order Placed", "Cancelled"];
    iconSet = cancelIcons;
  }

  const IconRenderer = (props: any) => {
    const { active, completed, icon } = props;
    return (
      <IconBox ownerState={{ active, completed }}>
        {iconSet[icon]}
      </IconBox>
    );
  };

  return (
    <Stepper
      alternativeLabel
      activeStep={config.step}
      connector={<PremiumConnector />}
      sx={{ padding: "20px 0" }}
    >
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel StepIconComponent={IconRenderer}>
            {label}
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default OrderStepper;
