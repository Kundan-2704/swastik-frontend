import React, { useEffect, useMemo, useState } from "react";
import Sketch from "../../../assets/Sketch.png";

import CartItemCard from "./CartItemCard";
import CartItemSkeleton from "./CartItemSkeleton";

import { Favorite, LocalOffer } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";

import PricingCard from "./PricingCard";
import {
  fetchCart,
  applyCoupon,
  removeCouponFromCart,
} from "../../../Redux Toolkit/Features/Customer/CartSlice";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
import { useNavigate } from "react-router-dom";
import CouponSkeleton from "./CouponSkeleton ";
import PricingSkeleton from "./PricingSkeleton ";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { cart, loading, couponError } = useAppSelector(
    (state) => state.cart
  );

  const [couponCode, setCouponCode] = useState("");

  const [processing, setProcessing] = useState(false);

  const jwt = useMemo(() => localStorage.getItem("jwt"), []);

  /* ===================== FETCH CART ===================== */
  useEffect(() => {
    if (jwt) dispatch(fetchCart(jwt));
  }, [dispatch, jwt]);

  const hasItems = cart?.cartItems?.length > 0;

  console.log("CART ITEMS 👇", cart?.cartItems);


  /* ===================== COUPON HANDLERS ===================== */


  const handleApplyCoupon = () => {

  dispatch(applyCoupon({ code: couponCode.trim(), jwt }))
     .unwrap()
     .then(res => {
        dispatch(fetchCart(jwt));
     })
     .catch(err => {
        console.log("COUPON ERROR ❌", err);
     });
};

  const handleRemoveCoupon = () => {
    setCouponCode("");
    dispatch(removeCouponFromCart(jwt))
  .unwrap()
  .then(() => dispatch(fetchCart(jwt)));
  };

  const handleBuyNow = () => {
    setProcessing(true);
    navigate("/checkout/address");
  };

  /* ===================== SKELETON UI ===================== */
  if (loading && !cart) {
    return (
      <div className="pt-10 px-5 sm:px-10 md:px-32 lg:px-48 xl:px-60 min-h-screen bg-[#FFFCF7]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-5">
            {[1, 2].map((i) => (
              <CartItemSkeleton key={i} />
            ))}
          </div>

          <div className="space-y-5">
            <CouponSkeleton />
            <PricingSkeleton />
          </div>
        </div>
      </div>
    );
  }

  /* ===================== MAIN UI ===================== */
  return (
    <div className="pt-10 px-5 sm:px-10 md:px-32 lg:px-48 xl:px-60 min-h-screen bg-[#FFFCF7]">
      {hasItems ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-5">
            {cart!.cartItems.map((item) => (
              <CartItemCard key={item._id} item={item} />
            ))}
          </div>

          {/* RIGHT */}
          <div className="col-span-1 space-y-5 lg:sticky lg:top-24 h-fit">
            {/* COUPON */}
            <div className="border border-[#E3D4B6] bg-[#FDF9F2] rounded-xl px-5 py-4 space-y-4 shadow-sm">
              <div className="flex gap-3 items-center text-[#4A1F2A]">
                <LocalOffer sx={{ fontSize: 20, color: "#B9935A" }} />
                <span className="font-medium">Apply Coupons</span>
              </div>

              {cart?.couponCode ? (
                <div className="flex justify-between items-center bg-[#EDE3CF] px-3 py-2 rounded-lg">
                  <span className="text-[#4A1F2A] font-medium">
                    {cart?.couponCode} applied
                  </span>
                  <button
                    className="text-xs text-red-600 font-semibold"
                    onClick={handleRemoveCoupon}
                  >
                    REMOVE
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex gap-3">
                    <TextField
                      placeholder="Coupon Code"
                      size="small"
                      fullWidth
                      value={couponCode}
                      onChange={(e) =>
                        setCouponCode(e.target.value.toUpperCase())
                      }
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                          backgroundColor: "#FFF",
                        },
                      }}
                    />
                    <Button
                      disabled={!couponCode}
                      variant="contained"
                      size="small"
                      sx={{
                        backgroundColor: "#4A1F2A",
                        "&:hover": { backgroundColor: "#34121C" },
                        textTransform: "none",
                        px: 3,
                      }}
                      onClick={handleApplyCoupon}
                    >
                      Apply
                    </Button>
                  </div>

                  {couponError && (
                    <p className="text-xs text-red-600">{couponError}</p>
                  )}
                </>
              )}
            </div>

            {/* PRICE */}
            <section className="border border-[#E3D4B6] rounded-xl bg-white shadow-sm">
              <PricingCard />
              <div className="p-5">
              

                <Button
                  className="buy-now"
                  fullWidth
                  variant="contained"
                  onClick={handleBuyNow}
                  sx={{
                    py: "12px",
                    backgroundColor: "#4A1F2A",
                    borderRadius: "999px",
                    fontWeight: 600,
                    transition: "all 0.25s ease",
                    "&:hover": {
                      backgroundColor: "#34121C",
                      transform: "translateY(-2px)",
                      boxShadow: "0 12px 24px rgba(0,0,0,0.12)",
                    },
                    "&:active": {
                      transform: "translateY(0)",
                      boxShadow: "0 6px 12px rgba(0,0,0,0.15)",
                    },
                  }}
                >
                  BUY NOW
                </Button>


              </div>
            </section>

            {/* WISHLIST */}
            <div className="border border-[#E3D4B6] rounded-xl px-5 py-4 flex justify-between items-center cursor-pointer bg-[#FFFAF2] shadow-sm hover:bg-[#F4EDE1] transition">
              <span className="text-[#4A1F2A] font-medium">
                Add From Wishlist
              </span>
              <Favorite sx={{ color: "#B9935A" }} />
            </div>
          </div>
        </div>
      ) : (
        /* ===================== EMPTY CART ===================== */
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
          <img
            src={Sketch}
            alt="Handloom weaver"
            className="w-[320px] mb-6 opacity-90"
          />

          <h2 className="text-xl font-medium text-[#4A1F2A] mb-2 text-center tracking-wide">
            Handwoven pieces crafted with care,
            <br />
            waiting for you.
          </h2>

          <p className="text-2xl font-semibold text-[#4A1F2A] text-center tracking-wide">
            Your Cart is Empty
          </p>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#4A1F2A",
              "&:hover": { backgroundColor: "#34121C" },
            }}
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </Button>
        </div>
      )}
    </div>
  );
};

export default Cart;
