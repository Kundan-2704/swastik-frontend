
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
