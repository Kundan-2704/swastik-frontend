import React from "react";
import {
  Box,
  Paper,
  Typography,
  Chip,
  Button,
  Divider,
} from "@mui/material";
import {
  Replay,
  Cancel,
  CurrencyRupee,
  Visibility,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

/* ================= MOCK DATA (API se aayega) ================= */

const returns = [
  {
    id: "RET1001",
    orderId: "ORD12345",
    product: "Pure Kosa Silk Saree",
    customer: "Amit Sharma",
    seller: "Bastar Handloom",
    reason: "Color mismatch",
    amount: 6499,
    status: "REQUESTED", // REQUESTED | APPROVED | REFUNDED | REJECTED
    payment: "COD", // COD | ONLINE
    date: "22 Jul 2025",
  },
  {
    id: "RET1002",
    orderId: "ORD12346",
    product: "Tussar Wedding Saree",
    customer: "Priya Verma",
    seller: "Kosa Kala Kendra",
    reason: "Damaged product",
    amount: 12499,
    status: "APPROVED",
    payment: "ONLINE",
    date: "21 Jul 2025",
  },
];

/* ================= STATUS STYLE ================= */

const statusStyle = (status: string) => {
  switch (status) {
    case "REQUESTED":
      return { bg: "#FFF3CD", color: "#856404" };
    case "APPROVED":
      return { bg: "#E3F2FD", color: "#1565C0" };
    case "REFUNDED":
      return { bg: "#E8F5E9", color: "#2E7D32" };
    case "REJECTED":
      return { bg: "#FDECEA", color: "#D32F2F" };
    default:
      return {};
  }
};

/* ================= COMPONENT ================= */

const ReturnsTable = () => {
  const navigate = useNavigate();

  const handleApprove = (id: string) => {
    console.log("Approve return:", id);
    // TODO: dispatch approveReturn(id)
  };

  const handleReject = (id: string) => {
    console.log("Reject return:", id);
    // TODO: open reject reason modal
  };

  const handleRefund = (id: string) => {
    console.log("Process refund:", id);
    // TODO: trigger refund API
  };

  return (
    <Box className="bg-[#FFFDF9] min-h-screen">
      {/* ===== HEADER ===== */}
      <Box className="mb-6">
        <Typography variant="h5" className="font-semibold text-[#4A1F2A]">
          Returns & Refunds
        </Typography>
        <Typography variant="body2" className="text-[#7A6A58]">
          Manage all return and refund requests
        </Typography>
      </Box>

      {/* ===== LIST ===== */}
      <div className="space-y-4">
        {returns.map((item) => (
          <Paper
            key={item.id}
            elevation={0}
            className="rounded-2xl p-5"
            style={{
              background: "#FFFCF7",
              border: "1px solid #E3D4B6",
            }}
          >
            <div className="flex flex-col md:flex-row md:justify-between gap-4">
              {/* LEFT INFO */}
              <div>
                <Typography className="font-semibold text-[#4A1F2A]">
                  {item.product}
                </Typography>

                <Typography variant="body2" className="text-[#7A6A58]">
                  Return ID: {item.id} • Order ID: {item.orderId}
                </Typography>

                <Typography variant="body2" className="text-[#7A6A58]">
                  👤 {item.customer} • 🏪 {item.seller}
                </Typography>

                <Typography variant="body2" className="text-[#7A6A58]">
                  Reason: {item.reason}
                </Typography>
              </div>

              {/* STATUS */}
              <div className="flex flex-wrap gap-3 items-center">
                <Chip
                  label={item.status}
                  sx={{
                    backgroundColor: statusStyle(item.status).bg,
                    color: statusStyle(item.status).color,
                    fontWeight: 500,
                  }}
                />

                <Chip
                  label={`₹ ${item.amount}`}
                  sx={{ backgroundColor: "#FFF5E7" }}
                />

                <Chip
                  label={item.payment}
                  sx={{
                    backgroundColor:
                      item.payment === "COD"
                        ? "#FFF3CD"
                        : "#E3F2FD",
                    color:
                      item.payment === "COD"
                        ? "#856404"
                        : "#1565C0",
                  }}
                />

                <Typography
                  variant="body2"
                  className="text-[#7A6A58]"
                >
                  {item.date}
                </Typography>
              </div>

              {/* ACTIONS */}
              <div className="flex flex-wrap gap-2 items-center">
                <Button
                  size="small"
                  startIcon={<Visibility />}
                  onClick={() =>
                    navigate(`/admin/orders/${item.orderId}`)
                  }
                >
                  View Order
                </Button>

                {item.status === "REQUESTED" && (
                  <>
                    <Button
                      size="small"
                      startIcon={<Replay />}
                      onClick={() => handleApprove(item.id)}
                    >
                      Approve
                    </Button>

                    <Button
                      size="small"
                      color="error"
                      startIcon={<Cancel />}
                      onClick={() => handleReject(item.id)}
                    >
                      Reject
                    </Button>
                  </>
                )}

                {item.status === "APPROVED" &&
                  item.payment === "ONLINE" && (
                    <Button
                      size="small"
                      color="success"
                      startIcon={<CurrencyRupee />}
                      onClick={() => handleRefund(item.id)}
                    >
                      Process Refund
                    </Button>
                  )}

                {item.status === "APPROVED" &&
                  item.payment === "COD" && (
                    <Chip
                      label="COD – No Refund"
                      sx={{
                        backgroundColor: "#FFF3CD",
                        color: "#856404",
                      }}
                    />
                  )}
              </div>
            </div>
          </Paper>
        ))}
      </div>

      {/* ===== EMPTY STATE ===== */}
      {returns.length === 0 && (
        <Paper
          elevation={0}
          className="rounded-2xl p-10 mt-10 text-center"
          style={{
            background: "#FFFCF7",
            border: "1px dashed #E3D4B6",
          }}
        >
          <Typography className="text-[#7A6A58]">
            No return or refund requests 🎉
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default ReturnsTable;
