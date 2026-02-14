
import React, { useMemo } from "react";
import { Divider } from "@mui/material";
import { useAppSelector } from "../../../Redux Toolkit/Store";
import {
  sumCartItemMrpPrice,
  sumCartItemSellingPrice,
} from "../../../Util/sumCartItem";

/* ===================== UTIL ===================== */


const formatINR = (amount: number = 0) =>
  Number(amount || 0).toLocaleString("en-IN", {
    maximumFractionDigits: 0,
  });

const FREE_SHIPPING_THRESHOLD = 999; // optional future use


const PricingCard = () => {
  const { cart } = useAppSelector((state) => state.cart);

  if (!cart) return null;

  const totalSavings = cart.discount + (cart.couponDiscount || 0);

  

  return (
    <div className="bg-[#FFFDF8] rounded-xl overflow-hidden border border-[#E3D4B6]">

      {/* PRICE BREAKDOWN */}
      <div className="space-y-4 p-5 text-sm">

        <div className="flex justify-between items-center text-[#5A4A3C]">
          <span>Subtotal</span>
          <span className="font-medium text-[#4A1F2A]">
            ₹{formatINR(cart.totalMrpPrice)}
          </span>
        </div>

        <div className="flex justify-between items-center text-[#5A4A3C]">
          <span>Product Discount</span>
          <span className="font-medium text-[#B9935A]">
            -₹{formatINR(cart.discount)}
          </span>
        </div>

        {cart.couponCode && cart.couponDiscount > 0 && (
          <div className="flex justify-between items-center text-[#5A4A3C]">
            <span>Coupon Discount</span>
            <span className="font-medium text-green-700">
              -₹{formatINR(cart.couponDiscount)}
            </span>
          </div>
        )}

        <div className="flex justify-between items-center text-[#5A4A3C]">
          <span>Shipping</span>
          <span className="font-medium text-[#4A1F2A]">
            {cart.shippingCharge === 0
              ? "Free"
              : `₹${formatINR(cart.shippingCharge)}`}
          </span>
        </div>

        <div className="flex justify-between items-center text-[#5A4A3C]">
          <span>Platform Fee</span>
          <span className="font-medium text-[#4A1F2A]">
            Free
          </span>
        </div>

      </div>

      <Divider sx={{ borderColor: "#E3D4B6" }} />

      {/* TOTAL */}
      <div className="px-5 py-3 flex justify-between items-center text-[#4A1F2A]">
        <span className="text-base font-semibold">Total</span>
        <span className="text-lg font-bold">
          ₹{formatINR(cart.finalAmount)}
        </span>
      </div>

      {/* SAVINGS LINE */}
      {totalSavings > 0 && (
        <p className="text-xs text-green-700 text-right px-5 pb-3">
          You saved ₹{formatINR(totalSavings)} on this order
        </p>
      )}

    </div>
  );
};

export default PricingCard;