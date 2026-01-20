import { CheckCircle } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFFCF7] px-5">
      <CheckCircle sx={{ fontSize: 90, color: "#4A1F2A" }} />

      <h1 className="mt-5 text-2xl font-semibold text-[#4A1F2A]">
        Order Placed Successfully 🎉
      </h1>

      <p className="mt-2 text-sm text-gray-600 text-center">
        Thank you for shopping with us.  
        Your order will be delivered soon.
      </p>

      <div className="flex gap-4 mt-8">
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#4A1F2A",
            borderRadius: "999px",
            px: 4,
          }}
          onClick={() => navigate("/account/orders")}
        >
          View Orders
        </Button>

        <Button
          variant="outlined"
          sx={{ borderRadius: "999px", px: 4 }}
          onClick={() => navigate("/")}
        >
          Continue Shopping
        </Button>
      </div>
    </div>
  );
};

export default OrderSuccess;
