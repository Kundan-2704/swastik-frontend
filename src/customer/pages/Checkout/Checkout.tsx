

import {
  Box,
  Button,
  Modal,
  Snackbar,
  Alert,
  CircularProgress,
  Typography,
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

  const [paymentMethod, setPaymentMethod] = useState<"RAZORPAY" | "COD">("RAZORPAY");

  const [codOpen,setCodOpen] = useState(false)
const [codLoading,setCodLoading] = useState(false)


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


//  const placeCODOrder = async () => {

//  if(!selectedAddress){

//   alert("Select address")
//   return

//  }

//  try{

//   setCodLoading(true)

//   const res = await axios.post(

//    `${import.meta.env.VITE_API_BASE_URL}/api/payment/create-cod-order`,

//    {
//     addressId:selectedAddress
//    },

//    {
//     headers:{
//      Authorization:`Bearer ${localStorage.getItem("jwt")}`
//     }
//    }

//   )

//   console.log("COD RESPONSE:",res.data)

//   // success check
//   if(res.status === 200){

//    setCodOpen(false)

//    navigate("/order-success")

//   }

//  }
//  catch(err:any){


//   alert("COD failed")

//  }
//  finally{

//   setCodLoading(false)

//  }

// }

const placeCODOrder = async () => {

 if (!selectedAddress) {

  setSnack({
   open: true,
   msg: "Please select delivery address",
   type: "error"
  });

  return;
 }

 try {

  setCodLoading(true);

  const res = await axios.post(

   `${import.meta.env.VITE_API_BASE_URL}/api/payment/create-cod-order`,

   {
    addressId: selectedAddress
   },

   {
    headers: {
     Authorization: `Bearer ${localStorage.getItem("jwt")}`
    }
   }

  );

  console.log("COD RESPONSE:", res.data);

  // close popup
  setCodOpen(false);

  // show success snackbar
  setSnack({
   open: true,
   msg: "Order placed successfully (Cash on Delivery)",
   type: "success"
  });

  // redirect after short delay
  setTimeout(() => {

   navigate("/order-success");

  }, 1200);

 }
 catch (err: any) {

  console.log("COD ERROR:", err?.response?.data);

  setSnack({
   open: true,
   msg: err?.response?.data?.message || "COD order failed",
   type: "error"
  });

 }
 finally {

  setCodLoading(false);

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

               <Box

sx={{

border:"1px solid #EADFD0",

borderRadius:"14px",

p:2,

background:"#FFFDF8",

mb:2

}}

>

<Typography

fontWeight={600}

color="#4A1F2A"

mb={1}

>

Cash on Delivery Available

</Typography>

<Button

fullWidth

// onClick={()=>setCodOpen(true)}
onClick={() => {

 if (!selectedAddress) {

  setSnack({
   open:true,
   msg:"Please select delivery address",
   type:"error"
  })

  return
 }

 setCodOpen(true)

}}

sx={{

borderRadius:"999px",

border:"1px solid #4A1F2A",

color:"#4A1F2A",

fontWeight:600,

py:1,

"&:hover":{

background:"#4A1F2A",

color:"white"

}

}}

>

Buy Now with COD

</Button>

</Box>

          <section className="border p-5 rounded-xl bg-white shadow-sm">
            {cart.loading ? <PricingSkeleton /> : <PricingCard />}

            <Button
              fullWidth
              variant="contained"
              disabled={!selectedAddress || cart.cart?.finalAmount === 0 || loading}
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
<Box
  mt={4}
  textAlign="center"
  sx={{
    pt: 2,
    borderTop: "1px solid rgba(0,0,0,0.06)",
  }}
>
  <Typography
    variant="caption"
    sx={{
      color: "#7A7A7A",
      fontSize: "12px",
      letterSpacing: "0.6px",
      fontWeight: 500,
    }}
  >
    Secure • Encrypted • Trusted Payments
  </Typography>

  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    gap={3}
    mt={1.8}
  >
    <Box
      component="img"
      src="/payments/visa.png"
      sx={{
        height: 20,
        opacity: 0.75,
        filter: "grayscale(20%)",
        transition: "all 0.3s ease",
        "&:hover": { opacity: 1, filter: "grayscale(0%)" },
      }}
    />

    <Box
      component="img"
      src="/payments/mastercard.webp"
      sx={{
        height: 24,
        opacity: 0.75,
        filter: "grayscale(20%)",
        transition: "all 0.3s ease",
        "&:hover": { opacity: 1, filter: "grayscale(0%)" },
      }}
    />

    <Box
      component="img"
      src="/payments/upi.png"
      sx={{
        height: 22,
        opacity: 0.75,
        filter: "grayscale(20%)",
        transition: "all 0.3s ease",
        "&:hover": { opacity: 1, filter: "grayscale(0%)" },
      }}
    />

    <Box
      component="img"
      src="/payments/rupay.png"
      sx={{
        height: 22,
        opacity: 0.75,
        filter: "grayscale(20%)",
        transition: "all 0.3s ease",
        "&:hover": { opacity: 1, filter: "grayscale(0%)" },
      }}
    />
  </Box>
</Box>
          </section>
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <AddressForm onClose={() => setOpen(false)} />
        </Box>
      </Modal>

      {/* <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack({ ...snack, open: false })}
      >
        <Alert severity={snack.type} sx={{ borderRadius: 999 }}>
          {snack.msg}
        </Alert>
      </Snackbar> */}

      <Snackbar
 open={snack.open}
 autoHideDuration={3000}

 anchorOrigin={{
  vertical: "top",
  horizontal: "center"
 }}

 onClose={() =>
  setSnack({
   ...snack,
   open:false
  })
 }
>

 <Alert
  severity={snack.type}
  variant="filled"

  sx={{
   borderRadius:"12px",
   fontWeight:500
  }}
 >

  {snack.msg}

 </Alert>

</Snackbar>

      <AddressDialog
        open={openAddress}
        onClose={() => setOpenAddress(false)}
      />


<Modal

open={codOpen}

onClose={()=>setCodOpen(false)}

>

<Box

sx={{

position:"absolute",

top:"50%",

left:"50%",

transform:"translate(-50%,-50%)",

width:420,

background:"#FFFCF7",

borderRadius:"18px",

boxShadow:"0 20px 60px rgba(0,0,0,0.2)",

p:4,

border:"1px solid #EADFD0"

}}

>

<Typography

fontWeight={600}

fontSize={20}

color="#4A1F2A"

mb={1}

>

Confirm Cash on Delivery

</Typography>

<Typography

fontSize={14}

color="gray"

mb={3}

>

Pay in cash when your order is delivered.

</Typography>

<Box

sx={{

background:"#FFF7ED",

p:2,

borderRadius:"10px",

mb:2,

border:"1px dashed #B9935A"

}}

>

<Typography fontSize={13}>

✔ No advance payment required  
✔ Secure order placement  
✔ Pay at doorstep  

</Typography>

</Box>

<Button

fullWidth

onClick={placeCODOrder}

disabled={codLoading}

sx={{

background:"#4A1F2A",

color:"white",

borderRadius:"999px",

py:1.5,

fontWeight:600,

"&:hover":{

background:"#34121C"

}

}}

>

{codLoading ?

<CircularProgress size={22} sx={{color:"white"}}/>

:

"Confirm Order"

}

</Button>

</Box>

</Modal>

    </Box>
  );
};

export default Checkout;
