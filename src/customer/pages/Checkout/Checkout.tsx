

import {
  Box,
  Button,
  Modal,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
import { fetchUserAddresses } from "../../../Redux Toolkit/Features/Customer/AddressSlice";
import { createOrder } from "../../../Redux Toolkit/Features/Customer/OrderSlice";
import AddressDialog from "./AddressDialog";

import AddressCard from "./AddressCard";
import AddressForm from "./AddressForm";
import PricingCard from "../Cart/PricingCard";
import AddressSkeleton from "./AddressSkeleton";
import PricingSkeleton from "./PricingSkeleton";
import axios from "axios";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 520,
  bgcolor: "#FFFCF7",
  boxShadow: "0px 10px 30px rgba(0,0,0,0.2)",
  borderRadius: "16px",
  p: 4,
  outline: "none",
};

const Checkout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { addresses, loading: addressLoading } = useAppSelector(
    (state) => state.address
  );
  const cart = useAppSelector((state) => state.cart);

  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openAddress, setOpenAddress] = useState(false);



  const [snack, setSnack] = useState({
    open: false,
    msg: "",
    type: "success" as "success" | "error",
  });

  /* ================= LOAD ADDRESSES ================= */
  useEffect(() => {
    dispatch(fetchUserAddresses(localStorage.getItem("jwt") || ""));
  }, [dispatch]);

  useEffect(() => {
    if (addresses.length === 1) {
      setSelectedAddress(addresses[0]._id);
    }
  }, [addresses]);




  /* ================= CHECKOUT ================= */


  // const handleCheckout = async () => {
  //   if (!selectedAddress || cart.totalSellingPrice === 0 || loading) return;

  //   try {
  //     setLoading(true);

  //     const orderRes = await dispatch(
  //       createOrder({
  //         addressId: selectedAddress,
  //         paymentGateway: "RAZORPAY",
  //         jwt: localStorage.getItem("jwt") || "",
  //       })
  //     ).unwrap();

  //     const orderId = orderRes?.orders?.[0]?._id;
  //     if (!orderId) throw new Error("Order not created");

  //     const { data } = await axios.post(
  //       `${import.meta.env.VITE_API_BASE_URL}/api/payment/razorpay/create-order`,
  //       { orderId },
  //       {
  //         headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
  //       }
  //     );

  //     const options = {
  //       key: import.meta.env.VITE_RAZORPAY_KEY,
  //       order_id: data.razorpayOrderId,
  //       amount: data.amount,
  //       currency: data.currency,
  //       name: "Swastik",
  //       description: "Order Payment",
  //       handler: () => {
  //         navigate("/order-success");
  //       },
  //       modal: {
  //         ondismiss: () => setLoading(false),
  //       },
  //     };

  //     new window.Razorpay(options).open();

  //   } catch (err) {
  //     console.error("Checkout error:", err);
  //     setLoading(false);
  //   }
  // };

  // const handleCheckout = async () => {
  //   if (loading) return;
  //   if (!selectedAddress) return alert("Select address");

  //   setLoading(true);

  //   try {
  //     // 1️⃣ create DB order
  //     const orderRes = await dispatch(
  //       createOrder({
  //         addressId: selectedAddress,
  //         paymentGateway: "RAZORPAY",
  //         jwt: localStorage.getItem("jwt") || "",
  //       })
  //     ).unwrap();

  //     const orderId = orderRes.orders[0]._id;

  //     // 2️⃣ create razorpay order
  //     const { data } = await axios.post(
  //       `${import.meta.env.VITE_API_BASE_URL}/api/payment/razorpay/create-order`,
  //       { orderId },
  //       { headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` } }
  //     );

  //     // 3️⃣ open popup
  //     new window.Razorpay({
  //       key: import.meta.env.VITE_RAZORPAY_KEY,
  //       order_id: data.razorpayOrderId,
  //       amount: data.amount,
  //       currency: "INR",
  //       name: "Swastik",
  //       handler: () => {
  //         navigate("/order-success");
  //       },
  //       modal: {
  //         ondismiss: () => setLoading(false),
  //       },
  //       theme: { color: "#4A1F2A" },
  //     }).open();

  //   } catch (e) {
  //     setLoading(false);
  //     alert("Checkout failed");
  //   }
  // };

  const handleCheckout = async () => {
    if (loading) return;
    if (!selectedAddress) return alert("Select address");

    setLoading(true);

    try {
      // 1️⃣ Create Razorpay order (backend)
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/payment/razorpay/create-order`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );

      // 2️⃣ Open Razorpay popup
      const rzp = new window.Razorpay({
        key: import.meta.env.VITE_RAZORPAY_KEY,
        order_id: data.razorpayOrderId,
        amount: data.amount,
        currency: "INR",
        name: "Swastik",
        description: "Order Payment",
        handler: async (response: any) => {
          try {
            // 3️⃣ VERIFY PAYMENT (🔥 correct route)
            await axios.post(
              `${import.meta.env.VITE_API_BASE_URL}/api/payment/razorpay/verify`,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                addressId: selectedAddress,
                paymentGateway: "RAZORPAY",
              },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                },
              }
            );

            navigate("/order-success");
          } catch (err) {
            console.error("VERIFY ERROR:", err);
            alert("Payment successful but verification failed");
            setLoading(false);
          }
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
          },
        },
        theme: { color: "#4A1F2A" },
      });

      rzp.open();
    } catch (e) {
      console.error("CHECKOUT ERROR:", e);
      setLoading(false);
      alert("Checkout failed");
    }
  };



  return (
    <Box className="pt-10 px-5 sm:px-12 md:px-40 lg:px-56 min-h-screen bg-[#FFFCF7]">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="font-semibold text-[#4A1F2A] text-lg">
              Select Delivery Address
            </h1>

            <Button
              onClick={() => setOpenAddress(true)}
              variant="outlined"
              sx={{
                borderColor: "#B9935A",
                color: "#4A1F2A",
                borderRadius: "999px",
                px: 3,
              }}
            >
              Add New Address
            </Button>
          </div>

          <div className="space-y-3">
            {addressLoading ? (
              <AddressSkeleton />
            ) : (
              addresses.map((item: any) => (
                <AddressCard
                  key={item._id}
                  value={item._id}
                  selectedValue={selectedAddress}
                  handleChange={(e: any) =>
                    setSelectedAddress(String(e.target.value))
                  }
                  item={item}
                />
              ))
            )}
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          <section className="border p-5 rounded-xl bg-white shadow-sm">
            {cart.loading ? <PricingSkeleton /> : <PricingCard />}

            <Button
              fullWidth
              variant="contained"
              disabled={!selectedAddress || cart.totalSellingPrice === 0 || loading}
              onClick={handleCheckout}
              sx={{
                mt: 2,
                py: "12px",
                borderRadius: "999px",
                backgroundColor: "#4A1F2A",
                "&:hover": { backgroundColor: "#34121C" },
              }}
            >
              {loading ? (
                <CircularProgress size={22} sx={{ color: "white" }} />
              ) : (
                "Checkout"
              )}
            </Button>
          </section>
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <AddressForm onClose={() => setOpen(false)} />
        </Box>
      </Modal>

      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack({ ...snack, open: false })}
      >
        <Alert severity={snack.type} sx={{ borderRadius: 999 }}>
          {snack.msg}
        </Alert>
      </Snackbar>

      <AddressDialog
        open={openAddress}
        onClose={() => setOpenAddress(false)}
      />


    </Box>
  );
};

export default Checkout;
