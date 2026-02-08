import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Snackbar, TextField } from "@mui/material";
import React, { useEffect } from "react";
import OrderStepper from "./OrderStepper";
import { Payment } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
import {
  cancelOrder,
  fetchOrderItemById,
} from "../../../Redux Toolkit/Features/Customer/OrderSlice";
import { useParams } from "react-router-dom";
import { downloadInvoice } from "../../../Redux Toolkit/Features/Customer/invoiceSlice";
import { requestReplacement } from "../../../Redux Toolkit/Features/Customer/ReplacementCustomerSlice";

const OrderDetails = () => {
  const dispatch = useAppDispatch();
  const { orderItemId } = useParams<{ orderItemId: string }>();

  const [openReplacement, setOpenReplacement] = React.useState(false);
const [reason, setReason] = React.useState("");
const [openCancelDialog, setOpenCancelDialog] = React.useState(false);
const [snackbar, setSnackbar] = React.useState({
  open: false,
  message: "",
  severity: "success"
});




  const { orderItem } = useAppSelector((state) => state.orders);

  const {success, error} = useAppSelector((state)=> state.replacementCustomer)

  const {success: invoiceSuccess, error:invoiceError} = useAppSelector((state)=> state.invoice)

  const order = orderItem?.order;
  const orderId = order?._id;

  // ===============================
  // FETCH ORDER ITEM (ONLY ONCE)
  // ===============================
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt || !orderItemId) return;

    dispatch(fetchOrderItemById({ jwt, orderItemId }));
  }, [dispatch, orderItemId]);

  // ===============================
  // CANCEL ORDER
  // ===============================
  const handleCancelOrder = () => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt || !orderId) return;

    dispatch(cancelOrder({ jwt, orderId }));
  };

const isReplacementAllowedUI = () => {
  if (order?.orderStatus !== "DELIVERED") return false;

  // fallback date (guaranteed)
  const deliveredAt =
    order.shipping?.deliveredDate ||
    order.shipping?.updatedAt ||
    order.updatedAt;

  if (!deliveredAt) return true; // allow if missing

  const delivered = new Date(deliveredAt);
  delivered.setHours(0, 0, 0, 0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const diffDays =
    (today.getTime() - delivered.getTime()) /
    (1000 * 60 * 60 * 24);

  return diffDays <= 7;
};


useEffect(() => {
  if(success){
setSnackbar({
  open: true,
  message: "Replacement request submitted successfully",
  severity: "success"
});
  }

if(error){
  setSnackbar({
    open:true,
    message: error,
    severity: "error"
  })
}
}, [success, error])


useEffect(() => {
  if (invoiceSuccess) {
    setSnackbar({
      open: true,
      message: "Invoice downloaded successfully",
      severity: "success"
    });
  }

  if (invoiceError) {
    setSnackbar({
      open: true,
      message: "Failed to download invoice",
      severity: "error"
    });
  }
}, [invoiceSuccess, invoiceError]);





  return (
    <Box className="space-y-6 text-[#4A1F2A]">

      {/* PRODUCT SUMMARY */}
      <section className="flex flex-col gap-5 justify-center items-center">
        <img
          className="w-[110px] rounded-lg shadow"
          src={orderItem?.product?.images?.[0]}
          alt=""
        />

        <div className="text-sm space-y-1 text-center">
          <h1 className="font-semibold">Swastik</h1>
          <p className="text-[#7A6A58]">{orderItem?.product?.title}</p>
          <p className="text-[#7A6A58]">
            Size: {orderItem?.product?.size}
          </p>
        </div>
      </section>

      {/* ORDER STEPPER */}
      <section className="border border-[#E3D4B6] p-6 rounded-xl bg-[#FFFDF8] shadow-sm">
        <OrderStepper orderStatus={order?.orderStatus} />
      </section>

  {/* SHIPPING INFO */}
{order?.shipping && (
  <section className="border border-[#E3D4B6] p-6 rounded-xl bg-[#FFFCF7] shadow-sm space-y-3">
    <h3 className="font-semibold">Shipping Details</h3>

    <div className="text-sm space-y-1">
      <p>Courier: <b>{order.shipping.courier}</b></p>
      <p>Tracking ID: <b>{order.shipping.awb || "Will be updated"}</b></p>
      <p>Status: <b>{order.shipping.status.replaceAll("_", " ")}</b></p>

      {/* 👇 YAHI ADD KARO */}
     {order?.shipping?.status !== "DELIVERED" &&
  order?.shipping?.pickupDate && (
    <p className="text-xs text-[#7A6A58]">
      Estimated delivery:{" "}
      {new Date(
        new Date(order.shipping.pickupDate).getTime() + 5 * 86400000
      ).toDateString()}
    </p>
  )}


      {order.shipping.awb && (
        <a
          href={`https://www.dtdc.in/tracking.asp?strCnno=${order.shipping.awb}`}
          target="_blank"
          className="text-blue-600 text-xs underline"
        >
          Track on DTDC
        </a>
      )}
    </div>

    <Button
      variant="outlined"
      onClick={() => dispatch(downloadInvoice(orderId))}
    >
      {orderItem?.invoiceLoading ? "Downloading..." : "Download Invoice"}
    </Button>

  </section>
)}



      {/* DELIVERY ADDRESS */}
      <section className="border border-[#E3D4B6] p-6 rounded-xl bg-[#FFFCF7] shadow-sm">
        <div className="text-sm space-y-3">
          <div className="flex gap-5 font-medium">
            <p>{order?.shippingAddress?.name}</p>
            <Divider flexItem orientation="vertical" />
            <p>{order?.shippingAddress?.mobile}</p>
          </div>

          <p className="text-[#7A6A58]">
            {order?.shippingAddress?.address},{" "}
            {order?.shippingAddress?.locality},{" "}
            {order?.shippingAddress?.city} -{" "}
            {order?.shippingAddress?.state},{" "}
            {order?.shippingAddress?.pinCode}
          </p>
        </div>
      </section>

      {/* PRICE + PAYMENT */}
      <section className="border border-[#E3D4B6] rounded-xl bg-[#FFFDF8] shadow-sm">
        <div className="flex justify-between text-sm px-6 pt-6 pb-3">
          <p className="font-semibold">Total Item Price</p>
          <p className="font-semibold">₹{order?.totalSellingPrice}</p>
        </div>

        <div className="px-6 pb-3">
          <div className="bg-[#FFF5E7] border border-[#E3D4B6] px-5 py-3 
                          text-xs font-medium flex items-center gap-3 
                          rounded-lg">
            <Payment />
            <p>Pay on Delivery</p>
          </div>
        </div>

        <Divider sx={{ borderColor: "#E3D4B6" }} />

        {/* ================= REPLACEMENT ================= */}
{order?.orderStatus === "DELIVERED" && !order?.replacement && isReplacementAllowedUI() && (
  <section className="border border-[#E3D4B6] p-6 rounded-xl bg-[#FFFCF7] shadow-sm space-y-4">
    <h3 className="font-semibold">Need Replacement?</h3>

    <Button
      fullWidth
      variant="outlined"
      sx={{
        py: "12px",
        borderColor: "#B9935A",
        color: "#4A1F2A",
        borderWidth: "2px",
        fontWeight: 600,
      }}
      onClick={() => setOpenReplacement(true)}
    >
      Request Replacement
    </Button>
{order?.orderStatus === "DELIVERED" &&
  !order?.replacement &&
  !isReplacementAllowedUI() && (
    <p className="text-xs text-red-500">
      Replacement window expired (7 days)
    </p>
)}


  </section>
)}

{/* ================= REPLACEMENT STATUS ================= */}
{order?.replacement && (
  <section className="border border-[#E3D4B6] p-6 rounded-xl bg-[#FFFDF8] shadow-sm space-y-2 mt-4">
    <h3 className="font-semibold">Replacement Status</h3>

    <p className="text-sm">
      Status:{" "}
      <b className="text-[#8B5E34]">
        {order.replacement.status.replaceAll("_", " ")}
      </b>
    </p>

    <p className="text-xs text-[#7A6A58]">
      Requested on:{" "}
      {new Date(order.replacement.requestedAt).toDateString()}
    </p>
  </section>
)}



        <div className="px-10 py-8">
          <Button
            fullWidth
            variant="outlined"
            // onClick={handleCancelOrder}
            
  onClick={() => setOpenCancelDialog(true)}
            disabled={
              order?.orderStatus === "CANCELLED" ||
              order?.orderStatus === "DELIVERED" ||
               order?.shipping?.status === "PICKED_UP"
            }
            sx={{
              py: "12px",
              borderColor: "#B9935A",
              color: "#4A1F2A",
              borderWidth: "2px",
              fontWeight: 600,
            }}
          >
            Cancel Order
          </Button>
        </div>
      </section>
{/* ================= REPLACEMENT MODAL ================= */}
<Dialog
  open={openReplacement}
  onClose={() => setOpenReplacement(false)}
  fullWidth
>
  <DialogTitle>Request Replacement</DialogTitle>

  <DialogContent>
    <TextField
      multiline
      rows={4}
      fullWidth
      value={reason}
      onChange={(e) => setReason(e.target.value)}
      placeholder="Explain the issue (color, defect, damage...)"
    />
  </DialogContent>

  <DialogActions>
    <Button onClick={() => setOpenReplacement(false)}>Cancel</Button>
    <Button
      variant="contained"
      disabled={!reason}
      onClick={() => {
        dispatch(requestReplacement({ orderId, reason }));
        setOpenReplacement(false);
        setReason("");
      }}
    >
      Submit
    </Button>
  </DialogActions>
</Dialog>


<Dialog open={openCancelDialog} onClose={() => setOpenCancelDialog(false)}>
  <DialogTitle>Cancel Order?</DialogTitle>

  <DialogContent>
    <p>
      If you cancel this order, refund will be initiated to your original payment method.
    </p>
  </DialogContent>

  <DialogActions>
    <Button onClick={() => setOpenCancelDialog(false)}>No</Button>

    <Button
      color="error"
      variant="contained"
      onClick={() => {
        handleCancelOrder();
        setOpenCancelDialog(false);
      }}
    >
      Yes Cancel Order
    </Button>
  </DialogActions>
</Dialog>

<Snackbar
  open={snackbar.open}
  autoHideDuration={3000}
  onClose={() => setSnackbar({ ...snackbar, open: false })}
>
  <Alert severity={snackbar.severity}>
    {snackbar.message}
  </Alert>
</Snackbar>


    </Box>
  );
};

export default OrderDetails;
