import {
  Box,
  Paper,
  Typography,
  Chip,
  Button,
  CircularProgress,
} from "@mui/material";
import {
  Payments,
  Visibility,
  CheckCircle,
  Cancel,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch, type RootState } from "../../Redux Toolkit/Store";
import { fetchAdminPayments } from "../../Redux Toolkit/Features/Admin/PaymentsSlice";

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
      return { bg: "#eee", color: "#555", icon: <Payments /> };
  }
};

/* ================= COMPONENT ================= */

const PaymentTable = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { payments, loading, error } = useSelector(
    (state: RootState) => state.adminPayments
  );

  useEffect(() => {
    dispatch(fetchAdminPayments());
  }, [dispatch]);

  /* ================= STATES ================= */

  if (loading) {
    return (
      <Box className="flex justify-center items-center min-h-[300px]">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="text-center text-red-600 py-10">
        {error}
      </Box>
    );
  }

  if (!payments.length) {
    return (
      <Box className="text-center py-10 text-gray-500">
        No payments found
      </Box>
    );
  }

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
            key={pay._id}
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
                  Order ID: {pay.order?.orderId || pay.order?._id}
                </Typography>
                <Typography variant="body2" className="text-[#7A6A58]">
                  👤 {pay.customer?.name}
                </Typography>
                <Typography variant="body2" className="text-[#7A6A58]">
                  Gateway: {pay.gateway || "-"}
                </Typography>
              </div>

              {/* MIDDLE */}
              <div className="flex flex-wrap gap-3 items-center">
                <Chip
                  label={`₹ ${pay.totalAmount}`}
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
                <Typography variant="body2" className="text-[#7A6A58]">
                  {new Date(pay.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </Typography>

                <Button
                  size="small"
                  startIcon={<Visibility />}
                  onClick={() => navigate(`/admin/payments/${pay._id}`)}
                >
                  View Details
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
