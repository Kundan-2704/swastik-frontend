// import {
//   Box,
//   Button,
//   Modal,
//   Snackbar,
//   Alert,
//   CircularProgress,
// } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
// import { fetchUserAddresses } from "../../../Redux Toolkit/Features/Customer/AddressSlice";
// import { createOrder } from "../../../Redux Toolkit/Features/Customer/OrderSlice";

// import AddressCard from "./AddressCard";
// import AddressForm from "./AddressForm";
// import PricingCard from "../Cart/PricingCard";
// import AddressSkeleton from "./AddressSkeleton";
// import PricingSkeleton from "./PricingSkeleton";
// import axios from "axios";

// declare global {
//   interface Window {
//     Razorpay: any;
//   }
// }

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 520,
//   bgcolor: "#FFFCF7",
//   boxShadow: "0px 10px 30px rgba(0,0,0,0.2)",
//   borderRadius: "16px",
//   p: 4,
//   outline: "none",
// };

// const Checkout = () => {
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();

//   const { addresses, loading: addressLoading } = useAppSelector(
//     (state) => state.address
//   );
//   const cart = useAppSelector((state) => state.cart);

//   const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
//   const [open, setOpen] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const [snack, setSnack] = useState({
//     open: false,
//     msg: "",
//     type: "success" as "success" | "error",
//   });

//   /* ================================
//      LOAD ADDRESSES
//   ================================ */
//   useEffect(() => {
//     dispatch(fetchUserAddresses(localStorage.getItem("jwt") || ""));
//   }, [dispatch]);

//   /* ================================
//      AUTO SELECT SINGLE ADDRESS
//   ================================ */
//   useEffect(() => {
//     if (addresses.length === 1) {
//       setSelectedAddress(addresses[0]._id);
//     }
//   }, [addresses]);

//   /* ================================
//      CHECKOUT HANDLER
//   ================================ */




//   const handleCheckout = async () => {
//     if (!selectedAddress || cart.totalSellingPrice === 0 || loading) return;

//     if (!window.Razorpay) {
//       setSnack({
//         open: true,
//         msg: "Payment service not loaded. Refresh page.",
//         type: "error",
//       });
//       return;
//     }

//     setLoading(true);

//  const options = {
//   key: import.meta.env.VITE_RAZORPAY_KEY,
//   amount: cart.totalSellingPrice * 100,
//   currency: "INR",
//   name: "Swastik",
//   description: "Order Payment",

//   handler: async (response: any) => {
//     try {
//       // 1️⃣ Create order (only save order info)
//       await dispatch(
//         createOrder({
//           addressId: selectedAddress,
//           paymentGateway: "RAZORPAY",
//           razorpayPaymentId: response.razorpay_payment_id,
//           razorpayOrderId: response.razorpay_order_id,
//           razorpaySignature: response.razorpay_signature,
//           jwt: localStorage.getItem("jwt") || "",
//         })
//       ).unwrap();

//       // 2️⃣ Redirect user (webhook will do the rest)
//       navigate("/order-success");

//     } catch (err) {
//       console.error("Payment error", err);
//       setSnack({
//         open: true,
//         msg: "❌ Payment failed. Please try again.",
//         type: "error",
//       });
//       setLoading(false);
//     }
//   },

//   modal: {
//     ondismiss: () => setLoading(false),
//   },

//   theme: {
//     color: "#4A1F2A",
//   },
// };

//     const rzp = new window.Razorpay(options);
//     rzp.open();
//   };

//   return (
//     <Box className="pt-10 px-5 sm:px-12 md:px-40 lg:px-56 min-h-screen bg-[#FFFCF7]">
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

//         {/* LEFT */}
//         <div className="lg:col-span-2 space-y-6">
//           <div className="flex justify-between items-center">
//             <h1 className="font-semibold text-[#4A1F2A] text-lg">
//               Select Delivery Address
//             </h1>

//             <Button
//               onClick={() => setOpen(true)}
//               variant="outlined"
//               sx={{
//                 borderColor: "#B9935A",
//                 color: "#4A1F2A",
//                 borderRadius: "999px",
//                 px: 3,
//               }}
//             >
//               Add New Address
//             </Button>
//           </div>

//           <div className="space-y-3">
//             {addressLoading ? (
//               <AddressSkeleton />
//             ) : (
//               addresses.map((item: any) => (
//                 <AddressCard
//                   key={item._id}
//                   value={item._id}
//                   selectedValue={selectedAddress}
//                   handleChange={(e: any) =>
//                     setSelectedAddress(String(e.target.value))
//                   }
//                   item={item}
//                 />
//               ))
//             )}
//           </div>
//         </div>

//         {/* RIGHT */}
//         <div className="space-y-6">
//           <section className="border p-5 rounded-xl bg-white shadow-sm">
//             {cart.loading ? <PricingSkeleton /> : <PricingCard />}

//             <div className="mt-4">
//               <Button
//                 fullWidth
//                 variant="contained"
//                 disabled={
//                   !selectedAddress ||
//                   cart.totalSellingPrice === 0 ||
//                   loading
//                 }
//                 onClick={handleCheckout}
//                 sx={{
//                   py: "12px",
//                   borderRadius: "999px",
//                   backgroundColor: "#4A1F2A",
//                   "&:hover": { backgroundColor: "#34121C" },
//                 }}
//               >
//                 {loading ? (
//                   <CircularProgress size={22} sx={{ color: "white" }} />
//                 ) : (
//                   "Checkout"
//                 )}
//               </Button>
//             </div>
//           </section>
//         </div>
//       </div>

//       {/* MODAL */}
//       <Modal open={open} onClose={() => setOpen(false)}>
//         <Box sx={style}>
//           <AddressForm onClose={() => setOpen(false)} />
//         </Box>
//       </Modal>

//       {/* SNACKBAR */}
//       <Snackbar
//         open={snack.open}
//         autoHideDuration={3000}
//         onClose={() => setSnack({ ...snack, open: false })}
//       >
//         <Alert severity={snack.type} sx={{ borderRadius: 999 }}>
//           {snack.msg}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default Checkout;








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

//   if (!window.Razorpay) {
//     setSnack({
//       open: true,
//       msg: "Razorpay not loaded. Refresh page.",
//       type: "error",
//     });
//     return;
//   }

//   try {
//     setLoading(true);

//     /* ============================
//        1️⃣ CREATE ORDER IN DB
//     ============================ */
//     const orderRes = await dispatch(
//       createOrder({
//         addressId: selectedAddress,
//         paymentGateway: "RAZORPAY",
//         jwt: localStorage.getItem("jwt") || "",
//       })
//     ).unwrap();

//     // ✅ CORRECT orderId extraction (based on your backend response)
//     const orderId = orderRes?.orders?.[0]?._id;

//     if (!orderId) {
//       console.log("ORDER RES FULL:", orderRes);
//       throw new Error("Order not created");
//     }

//     /* ============================
//        2️⃣ CREATE RAZORPAY ORDER
//     ============================ */
//     const { data } = await axios.post(
//       "http://localhost:5000/api/payment/razorpay/create-order",
//       {
//         orderId, // 🔥 USE FIXED ID
//         // amount: cart.totalSellingPrice,
//         amount: 100*100,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("jwt")}`,
//           "Content-Type": "application/json",
//         },
//         withCredentials: true,
//       }
//     );

//     if (!data?.razorpayOrderId) {
//       throw new Error("Razorpay order not created");
//     }

//     /* ============================
//        3️⃣ OPEN RAZORPAY CHECKOUT
//     ============================ */
//     const options = {
//       key: import.meta.env.VITE_RAZORPAY_KEY,
//       order_id: data.razorpayOrderId, // 🔥 MOST IMPORTANT
//       amount: cart.totalSellingPrice * 100,
//       currency: "INR",
//       name: "Swastik",
//       description: "Order Payment",
//       prefill: {
//         name: orderRes.user?.fullName || "",
//         email: orderRes.user?.email || "",
//         contact: orderRes.shippingAddress?.mobile || "",
//       },
//       handler: async (response: any) => {
//         console.log("✅ PAYMENT SUCCESS:", response);
//         navigate("/order-success");
//       },
//       modal: {
//         ondismiss: () => setLoading(false),
//       },
//       theme: {
//         color: "#4A1F2A",
//       },
//     };

//     const rzp = new window.Razorpay(options);
//     rzp.open();
//   } catch (err: any) {
//     console.error("❌ PAYMENT INIT ERROR:", err?.response?.data || err);

//     setSnack({
//       open: true,
//       msg:
//         err?.response?.data?.message ||
//         "❌ Payment init failed. Try again.",
//       type: "error",
//     });

//     setLoading(false);
//   }
// };

const handleCheckout = async () => {
  if (!selectedAddress || cart.totalSellingPrice === 0 || loading) return;

  try {
    setLoading(true);

    const orderRes = await dispatch(
      createOrder({
        addressId: selectedAddress,
        paymentGateway: "RAZORPAY",
        jwt: localStorage.getItem("jwt") || "",
      })
    ).unwrap();

    const orderId = orderRes?.orders?.[0]?._id;
    if (!orderId) throw new Error("Order not created");

    const { data } = await axios.post(
      "http://localhost:5000/api/payment/razorpay/create-order",
      { orderId },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      }
    );

    const amount =
      import.meta.env.MODE === "development"
        ? 1000 // ₹1 test
        : cart.totalSellingPrice * 1000;

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      order_id: data.razorpayOrderId,
      amount,
      currency: "INR",
      name: "Swastik",
      description: "Order Payment",
      remember_customer: false,
      handler: async (response: any) => {
        console.log("✅ PAYMENT SUCCESS:", response);
        navigate("/order-success");
      },
      modal: {
        ondismiss: () => setLoading(false),
      },
      theme: { color: "#4A1F2A" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (err) {
    console.error(err);
    setLoading(false);
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
              onClick={() => setOpen(true)}
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
    </Box>
  );
};

export default Checkout;
