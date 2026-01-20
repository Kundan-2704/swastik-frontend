
import {
  Box,
  Paper,
  Typography,
  Chip,
  Button,
} from "@mui/material";
import {
  Payments,
  Visibility,
  CheckCircle,
  Cancel,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

/* ================= MOCK DATA ================= */

const payments = [
  {
    id: "PAY1001",
    orderId: "ORD12345",
    customer: "Amit Sharma",
    amount: 6499,
    paymentMode: "ONLINE", // ONLINE | COD
    status: "SUCCESS", // SUCCESS | FAILED | PENDING
    gateway: "Razorpay",
    date: "20 Jul 2025",
  },
  {
    id: "PAY1002",
    orderId: "ORD12346",
    customer: "Priya Verma",
    amount: 12499,
    paymentMode: "COD",
    status: "PENDING",
    gateway: "-",
    date: "21 Jul 2025",
  },
];

/* ================= STATUS STYLE ================= */

const statusStyle = (status: string) => {
  switch (status) {
    case "SUCCESS":
      return { bg: "#E8F5E9", color: "#2E7D32", icon: <CheckCircle /> };
    case "FAILED":
      return { bg: "#FDECEA", color: "#D32F2F", icon: <Cancel /> };
    case "PENDING":
      return { bg: "#FFF3CD", color: "#856404", icon: <Payments /> };
    default:
      return {};
  }
};

/* ================= COMPONENT ================= */

const PaymentTable = () => {
  const navigate = useNavigate();

  return (
    <Box className="bg-[#FFFDF9] min-h-screen">
      {/* HEADER */}
      <Box className="mb-6">
        <Typography variant="h5" className="font-semibold text-[#4A1F2A]">
          Payments
        </Typography>
        <Typography variant="body2" className="text-[#7A6A58]">
          Customer payment transactions
        </Typography>
      </Box>

      {/* LIST */}
      <div className="space-y-4">
        {payments.map((pay) => (
          <Paper
            key={pay.id}
            elevation={0}
            className="rounded-2xl p-5"
            style={{
              background: "#FFFCF7",
              border: "1px solid #E3D4B6",
            }}
          >
            <div className="flex flex-col md:flex-row md:justify-between gap-4">
              {/* LEFT */}
              <div>
                <Typography className="font-semibold text-[#4A1F2A]">
                  Order ID: {pay.orderId}
                </Typography>
                <Typography variant="body2" className="text-[#7A6A58]">
                  👤 {pay.customer}
                </Typography>
                <Typography variant="body2" className="text-[#7A6A58]">
                  Gateway: {pay.gateway}
                </Typography>
              </div>

              {/* MIDDLE */}
              <div className="flex flex-wrap gap-3 items-center">
                <Chip
                  label={`₹ ${pay.amount}`}
                  sx={{ backgroundColor: "#FFF5E7" }}
                />
                <Chip
                  label={pay.paymentMode}
                  sx={{
                    backgroundColor:
                      pay.paymentMode === "COD"
                        ? "#FFF3CD"
                        : "#E3F2FD",
                    color:
                      pay.paymentMode === "COD"
                        ? "#856404"
                        : "#1565C0",
                  }}
                />
                <Chip
                  icon={statusStyle(pay.status).icon}
                  label={pay.status}
                  sx={{
                    backgroundColor: statusStyle(pay.status).bg,
                    color: statusStyle(pay.status).color,
                    fontWeight: 500,
                  }}
                />
              </div>

              {/* RIGHT */}
              <div className="flex items-center gap-3">
                <Typography
                  variant="body2"
                  className="text-[#7A6A58]"
                >
                  {pay.date}
                </Typography>

                <Button
                  size="small"
                  startIcon={<Visibility />}
                  onClick={() =>
                    navigate(`/admin/orders/${pay.orderId}`)
                  }
                >
                  View Order
                </Button>
              </div>
            </div>
          </Paper>
        ))}
      </div>
    </Box>
  );
};

export default PaymentTable;
