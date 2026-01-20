import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Divider,
  Chip,
  Button,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Redux Toolkit/Store";
import {
  fetchOrderById,
} from "../../Redux Toolkit/Features/Admin/AdminOrderSlice";
import {
  updateOrdersStatus,
} from "../../Redux Toolkit/Features/Seller/SellerOrderSlice";

/* ================= TYPES ================= */
type OrderStatus =
  | "PENDING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

/* ================= STATUS STYLE ================= */
const statusStyle = (status: OrderStatus) => {
  switch (status) {
    case "PENDING":
      return { bg: "#FFF3CD", color: "#856404" };
    case "SHIPPED":
      return { bg: "#E3F2FD", color: "#1565C0" };
    case "DELIVERED":
      return { bg: "#E8F5E9", color: "#2E7D32" };
    case "CANCELLED":
      return { bg: "#FDECEA", color: "#D32F2F" };
    default:
      return { bg: "#F5F5F5", color: "#333" };
  }
};

/* ================= COMPONENT ================= */
const OrderDetails: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const jwt = localStorage.getItem("jwt");

  const { order, loading, error } = useAppSelector(
    (state) => state.adminOrders
  );

  /* ================= LOCAL STATE ================= */
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] =
    useState<OrderStatus>("PENDING");

  /* ================= FETCH ORDER ================= */
  useEffect(() => {
    if (orderId) {
      dispatch(fetchOrderById(orderId));
    }
  }, [dispatch, orderId]);

  /* ================= SYNC STATUS ================= */
  useEffect(() => {
    if (order?.orderStatus) {
      setSelectedStatus(order.orderStatus);
    }
  }, [order]);

  /* ================= STATES ================= */
  if (loading) {
    return <p className="text-sm text-gray-500">Loading order...</p>;
  }

  if (error) {
    return <p className="text-sm text-red-500">{error}</p>;
  }

  if (!order) {
    return <p className="text-sm text-gray-400">Order not found</p>;
  }



  const shipping = order.shippingAddress;

  return (
    <Box className="bg-[#FFFDF9] min-h-screen p-4">
      {/* ===== HEADER ===== */}
      <Box className="mb-6 flex items-center justify-between">
        <div>
          <Typography variant="h5" className="font-semibold text-[#4A1F2A]">
            Order Details
          </Typography>
          <Typography variant="body2" className="text-[#7A6A58]">
            Order ID: {order._id}
          </Typography>
        </div>

        <Button onClick={() => navigate(-1)}>⬅ Back</Button>
      </Box>

      {/* ===== ORDER SUMMARY ===== */}
      <Paper
        elevation={0}
        className="rounded-2xl p-5 mb-6"
        style={{ background: "#FFFCF7", border: "1px solid #E3D4B6" }}
      >
        <div className="flex flex-wrap gap-3">
          <Chip
            label={order.orderStatus}
            sx={{
              backgroundColor: statusStyle(order.orderStatus).bg,
              color: statusStyle(order.orderStatus).color,
              fontWeight: 600,
            }}
          />

          <Chip
            label={`Payment: ${order.paymentStatus}`}
            sx={{ backgroundColor: "#FFF5E7" }}
          />

          <Chip
            label={`Order Date: ${new Date(
              order.createdAt
            ).toLocaleDateString()}`}
            sx={{ backgroundColor: "#FFF5E7" }}
          />

          <Chip
            label={`Total: ₹${order.totalSellingPrice}`}
            sx={{ backgroundColor: "#FFF5E7" }}
          />
        </div>
      </Paper>

      {/* ===== CUSTOMER & SELLER ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* CUSTOMER */}
        <Paper
          elevation={0}
          className="rounded-2xl p-5"
          style={{ background: "#FFFCF7", border: "1px solid #E3D4B6" }}
        >
          <Typography variant="h6" className="font-semibold text-[#4A1F2A]">
            Customer Details
          </Typography>

          <Divider className="my-3" />

          <Typography>Name: {shipping?.name || "-"}</Typography>
          <Typography>Mobile: {shipping?.mobile || "-"}</Typography>
          <Typography>
            Address: {shipping?.address}, {shipping?.locality},{" "}
            {shipping?.city}, {shipping?.state} -{" "}
            {shipping?.pincode}
          </Typography>
        </Paper>

        {/* SELLER */}
        {/* SELLER */}
        <Paper
          elevation={0}
          className="rounded-2xl p-5"
          style={{ background: "#FFFCF7", border: "1px solid #E3D4B6" }}
        >
          <Typography variant="h6" className="font-semibold text-[#4A1F2A]">
            Seller Details
          </Typography>

          <Divider className="my-3" />

          <Typography>
            Seller Name: {order.seller?.sellerName || "N/A"}
          </Typography>

          <Typography>
            Store: {order.seller?.businessDetails?.businessName || "N/A"}
          </Typography>

          <Typography>
            Email: {order.seller?.email || "N/A"}
          </Typography>

          <Typography>
            Phone: {order.seller?.mobile || "N/A"}
          </Typography>

          <Typography>
            GST: {order.seller?.GSTIN || "N/A"}
          </Typography>

          <Typography>
            Pickup:{" "}
            {order.seller?.pickupAddress
              ? `${order.seller.pickupAddress.address}, ${order.seller.pickupAddress.locality}, ${order.seller.pickupAddress.city}, ${order.seller.pickupAddress.state} - ${order.seller.pickupAddress.pinCode}`
              : "N/A"}
          </Typography>


        </Paper>

      </div>

      {/* ===== PRODUCT SUMMARY ===== */}
      <Paper
        elevation={0}
        className="rounded-2xl p-5 mt-6"
        style={{ background: "#FFFCF7", border: "1px solid #E3D4B6" }}
      >
        <Typography variant="h6" className="font-semibold text-[#4A1F2A]">
          Product Summary
        </Typography>

        <Divider className="my-3" />

        <Typography>Total Items: {order.totalItem || 1}</Typography>
        <Typography>MRP Total: ₹{order.totalMrpPrice}</Typography>
        <Typography>Selling Price: ₹{order.totalSellingPrice}</Typography>
      </Paper>

      {/* ===== ORDER ACTIONS (SAME AS Order.tsx) ===== */}
      <Paper
        elevation={0}
        className="rounded-2xl p-5 mt-6"
        style={{ background: "#FFFCF7", border: "1px solid #E3D4B6" }}
      >
        <Typography variant="h6" className="font-semibold text-[#4A1F2A]">
          Order Actions
        </Typography>

        <Divider className="my-3" />

        <div className="flex items-center gap-3">
          <Chip
            label={order.orderStatus}
            sx={{
              backgroundColor: statusStyle(order.orderStatus).bg,
              color: statusStyle(order.orderStatus).color,
              fontWeight: 600,
            }}
          />

          <Button
            variant="outlined"
            onClick={() => setIsStatusModalOpen(true)}
            sx={{
              borderColor: "#B9935A",
              color: "#B9935A",
              fontSize: "12px",
              borderRadius: "20px",
            }}
          >
            Update Status
          </Button>
        </div>
      </Paper>

      {/* ===== STATUS UPDATE MODAL ===== */}
      {isStatusModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-sm p-5 border border-[#F0E4CC]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-[#4A1F2A]">
                Update Order Status
              </h3>
              <button
                onClick={() => setIsStatusModalOpen(false)}
                className="text-xs text-gray-500"
              >
                ✕
              </button>
            </div>

            <select
              value={selectedStatus}
              onChange={(e) =>
                setSelectedStatus(e.target.value as OrderStatus)
              }
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm"
            >
              <option value="PENDING">Pending</option>
              <option value="SHIPPED">Shipped</option>
              <option value="DELIVERED">Delivered</option>
              <option value="CANCELLED">Cancelled</option>
            </select>

            <div className="flex justify-end gap-2 mt-5">
              <button
                onClick={() => setIsStatusModalOpen(false)}
                className="px-3 py-1.5 text-xs rounded-full border"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  if (!jwt) return;

                  dispatch(
                    updateOrdersStatus({
                      jwt,
                      orderId: order._id,
                      orderStatus: selectedStatus,
                    })
                  );

                  setIsStatusModalOpen(false);
                }}
                className="px-4 py-1.5 text-xs rounded-full bg-[#B9935A] text-white font-semibold"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </Box>
  );
};

export default OrderDetails;
