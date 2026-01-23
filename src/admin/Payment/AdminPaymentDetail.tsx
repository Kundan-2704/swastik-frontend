import {
  Box,
  Paper,
  Typography,
  Divider,
  CircularProgress,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchAdminPaymentById } from "../../Redux Toolkit/Features/Admin/PaymentsSlice";
import { useAppDispatch, type RootState } from "../../Redux Toolkit/Store";

const AdminPaymentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const { selectedPayment, loading, error } = useSelector(
    (state: RootState) => state.adminPayments
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchAdminPaymentById(id));
    }
  }, [id, dispatch]);

  /* ================= STATES ================= */

  if (loading) {
    return (
      <Box className="flex justify-center items-center h-[300px]">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="p-6 text-red-600 text-center">
        {error}
      </Box>
    );
  }

  if (!selectedPayment) {
    return (
      <Box className="p-6 text-center text-gray-500">
        No payment data found
      </Box>
    );
  }

  /* ================= UI ================= */

  return (
    <Box className="p-6 bg-[#FFFDF9] min-h-screen">
      <Typography variant="h5" className="mb-4 font-semibold text-[#4A1F2A]">
        Payment Details
      </Typography>

      {/* ===== SUMMARY ===== */}
      <Paper className="p-4 rounded-2xl mb-6">
        <Typography>
          <b>Order ID:</b>{" "}
          {selectedPayment.order?.orderId || selectedPayment.order?._id}
        </Typography>

        <Typography>
          <b>Customer:</b>{" "}
          {selectedPayment.customer?.name || "Unknown"}
        </Typography>

        <Typography>
          <b>Status:</b> {selectedPayment.status}
        </Typography>

        <Typography>
          <b>Total:</b> ₹{selectedPayment.totalAmount}
        </Typography>

        <Typography>
          <b>Payment Mode:</b> {selectedPayment.paymentMode}
        </Typography>

        <Typography>
          <b>Gateway:</b> {selectedPayment.gateway || "-"}
        </Typography>

        <Typography>
          <b>Date:</b>{" "}
          {new Date(selectedPayment.createdAt).toLocaleDateString("en-IN")}
        </Typography>
      </Paper>

      {/* ===== SELLERS ===== */}
      <Typography variant="h6" className="mb-3 text-[#4A1F2A]">
        Seller Breakdown
      </Typography>

      {selectedPayment.sellers?.length ? (
        selectedPayment.sellers.map((s, i) => (
          <Paper
            key={i}
            className="p-4 mb-3 rounded-xl border border-[#E3D4B6]"
          >
            <Typography>
              <b>Seller:</b>{" "}
              {s.seller?.name || "Unknown Seller"}
            </Typography>

            {s.seller?.email && (
              <Typography>
                <b>Email:</b> {s.seller.email}
              </Typography>
            )}

            <Divider className="my-2" />

            <Typography>Amount: ₹{s.amount}</Typography>
            <Typography>Commission: ₹{s.commission}</Typography>
            <Typography>
              Seller Earning: ₹{s.sellerEarning}
            </Typography>
          </Paper>
        ))
      ) : (
        <Typography className="text-gray-500">
          No seller data available
        </Typography>
      )}
    </Box>
  );
};

export default AdminPaymentDetail;
