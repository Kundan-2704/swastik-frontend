import React from "react";
import {
  Box,
  Paper,
  Typography,
  Chip,
  Button,
} from "@mui/material";
import {
  AccountBalance,
  CheckCircle,
  Visibility,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

/* ================= MOCK DATA ================= */

const payouts = [
  {
    id: "PO1001",
    orderId: "ORD12345",
    seller: "Bastar Handloom",
    orderAmount: 6499,
    commission: 650,
    payoutAmount: 5849,
    paymentMode: "ONLINE",
    status: "PENDING", // PENDING | PAID
    date: "22 Jul 2025",
  },
  {
    id: "PO1002",
    orderId: "ORD12346",
    seller: "Kosa Kala Kendra",
    orderAmount: 12499,
    commission: 1250,
    payoutAmount: 11249,
    paymentMode: "COD",
    status: "PAID",
    date: "20 Jul 2025",
  },
];

/* ================= COMPONENT ================= */

const PayoutTable = () => {
  const navigate = useNavigate();

  const handlePayout = (id: string) => {
    console.log("Process payout:", id);
    // TODO: trigger payout API (Razorpay / Bank transfer)
  };

  return (
    <Box className="bg-[#FFFDF9] min-h-screen">
      {/* HEADER */}
      <Box className="mb-6">
        <Typography variant="h5" className="font-semibold text-[#4A1F2A]">
          Payouts
        </Typography>
        <Typography variant="body2" className="text-[#7A6A58]">
          Seller settlement & commission management
        </Typography>
      </Box>

      {/* LIST */}
      <div className="space-y-4">
        {payouts.map((pay) => (
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
                  {pay.seller}
                </Typography>
                <Typography variant="body2" className="text-[#7A6A58]">
                  Order ID: {pay.orderId}
                </Typography>
              </div>

              {/* AMOUNTS */}
              <div className="flex flex-wrap gap-3 items-center">
                <Chip
                  label={`Order ₹${pay.orderAmount}`}
                  sx={{ backgroundColor: "#FFF5E7" }}
                />
                <Chip
                  label={`Commission ₹${pay.commission}`}
                  sx={{ backgroundColor: "#FDECEA", color: "#D32F2F" }}
                />
                <Chip
                  label={`Payout ₹${pay.payoutAmount}`}
                  sx={{ backgroundColor: "#E8F5E9", color: "#2E7D32" }}
                />
              </div>

              {/* STATUS */}
              <div className="flex flex-wrap gap-3 items-center">
                <Chip
                  label={pay.status === "PAID" ? "Paid" : "Pending"}
                  sx={{
                    backgroundColor:
                      pay.status === "PAID"
                        ? "#E8F5E9"
                        : "#FFF3CD",
                    color:
                      pay.status === "PAID"
                        ? "#2E7D32"
                        : "#856404",
                    fontWeight: 500,
                  }}
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
              </div>

              {/* ACTIONS */}
              <div className="flex items-center gap-2">
                <Button
                  size="small"
                  startIcon={<Visibility />}
                  onClick={() =>
                    navigate(`/admin/orders/${pay.orderId}`)
                  }
                >
                  View Order
                </Button>

                {pay.status === "PENDING" &&
                  pay.paymentMode === "ONLINE" && (
                    <Button
                      size="small"
                      color="success"
                      startIcon={<AccountBalance />}
                      onClick={() => handlePayout(pay.id)}
                    >
                      Pay Seller
                    </Button>
                  )}

                {pay.status === "PAID" && (
                  <Chip
                    icon={<CheckCircle />}
                    label="Completed"
                    sx={{
                      backgroundColor: "#E8F5E9",
                      color: "#2E7D32",
                    }}
                  />
                )}
              </div>
            </div>
          </Paper>
        ))}
      </div>
    </Box>
  );
};

export default PayoutTable;
