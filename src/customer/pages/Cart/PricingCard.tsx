// import { Divider } from "@mui/material";
// import React from "react";
// import { useAppSelector } from "../../../Redux Toolkit/Store";
// import {
//   sumCartItemMrpPrice,
//   sumCartItemSellingPrice,
// } from "../../../Util/sumCartItem";

// const PricingCard = () => {
//   const cartState = useAppSelector((state) => state.cart);

//   const cartItems = cartState?.cart?.cartItems || [];

//   const mrpTotal = sumCartItemMrpPrice(cartItems);
//   const sellingTotal = sumCartItemSellingPrice(cartItems);

//   // 🟢 Product level discount
//   const productDiscount = mrpTotal - sellingTotal;

//   // 🟢 Coupon discount from redux
//   const couponDiscount = cartState.couponDiscount || 0;

//   const shipping = 40;

//   // 🟢 FINAL TOTAL
//   const totalPayable = Math.max(
//     sellingTotal - couponDiscount + shipping,
//     0
//   );

//   return (
//     <div className="bg-[#FFFDF8] rounded-xl overflow-hidden">
//       {/* --- PRICE BREAKDOWN --- */}
//       <div className="space-y-4 p-5 text-sm">
//         <div className="flex justify-between items-center text-[#5A4A3C]">
//           <span>Subtotal</span>
//           <span className="font-medium text-[#4A1F2A]">
//             ₹{mrpTotal}
//           </span>
//         </div>

//         {/* Product Discount */}
//         <div className="flex justify-between items-center text-[#5A4A3C]">
//           <span>Product Discount</span>
//           <span className="font-medium text-[#B9935A]">
//             -₹{productDiscount}
//           </span>
//         </div>

//         {/* Coupon Discount */}
//         {couponDiscount > 0 && (
//           <div className="flex justify-between items-center text-[#5A4A3C]">
//             <span>Coupon Discount</span>
//             <span className="font-medium text-green-700">
//               -₹{couponDiscount}
//             </span>
//           </div>
//         )}

//         <div className="flex justify-between items-center text-[#5A4A3C]">
//           <span>Shipping</span>
//           <span className="font-medium text-[#4A1F2A]">
//             ₹{shipping}
//           </span>
//         </div>

//         <div className="flex justify-between items-center text-[#5A4A3C]">
//           <span>Platform Fee</span>
//           <span className="font-medium text-[#4A1F2A]">
//             Free
//           </span>
//         </div>
//       </div>

//       <Divider sx={{ borderColor: "#E3D4B6" }} />

//       {/* --- TOTAL --- */}
//       <div className="px-5 py-3 flex justify-between items-center text-[#4A1F2A]">
//         <span className="text-base font-semibold">Total</span>
//         <span className="text-lg font-bold">
//           ₹{totalPayable}
//         </span>
//       </div>
//     </div>
//   );
// };

// export default PricingCard;





import React, { useMemo } from "react";
import { Divider } from "@mui/material";
import { useAppSelector } from "../../../Redux Toolkit/Store";
import {
  sumCartItemMrpPrice,
  sumCartItemSellingPrice,
} from "../../../Util/sumCartItem";

/* ===================== UTIL ===================== */
const formatINR = (amount: number) =>
  amount.toLocaleString("en-IN", {
    maximumFractionDigits: 0,
  });

const FREE_SHIPPING_THRESHOLD = 999; // optional future use

const PricingCard = () => {
  const { cart, couponDiscount } = useAppSelector((state) => state.cart);

  const cartItems = cart?.cartItems || [];

  /* ===================== CALCULATIONS ===================== */
  const {
    mrpTotal,
    sellingTotal,
    productDiscount,
    shipping,
    totalPayable,
    totalSavings,
  } = useMemo(() => {
    const mrp = sumCartItemMrpPrice(cartItems);
    const selling = sumCartItemSellingPrice(cartItems);

    const productDisc = mrp - selling;
    const couponDisc = couponDiscount || 0;

    const shippingCost = selling >= FREE_SHIPPING_THRESHOLD ? 0 : 40;

    const total = Math.max(selling - couponDisc + shippingCost, 0);
    const savings = productDisc + couponDisc;

    return {
      mrpTotal: mrp,
      sellingTotal: selling,
      productDiscount: productDisc,
      shipping: shippingCost,
      totalPayable: total,
      totalSavings: savings,
    };
  }, [cartItems, couponDiscount]);

  /* ===================== UI ===================== */
  return (
    <div className="bg-[#FFFDF8] rounded-xl overflow-hidden border border-[#E3D4B6]">
      {/* PRICE BREAKDOWN */}
      <div className="space-y-4 p-5 text-sm">
        <div className="flex justify-between items-center text-[#5A4A3C]">
          <span>Subtotal</span>
          <span className="font-medium text-[#4A1F2A]">
            ₹{formatINR(mrpTotal)}
          </span>
        </div>

        <div className="flex justify-between items-center text-[#5A4A3C]">
          <span>Product Discount</span>
          <span className="font-medium text-[#B9935A]">
            -₹{formatINR(productDiscount)}
          </span>
        </div>

        {couponDiscount > 0 && (
          <div className="flex justify-between items-center text-[#5A4A3C]">
            <span>Coupon Discount</span>
            <span className="font-medium text-green-700">
              -₹{formatINR(couponDiscount)}
            </span>
          </div>
        )}

        <div className="flex justify-between items-center text-[#5A4A3C]">
          <span>Shipping</span>
          <span className="font-medium text-[#4A1F2A]">
            {shipping === 0 ? "Free" : `₹${formatINR(shipping)}`}
          </span>
        </div>

        <div className="flex justify-between items-center text-[#5A4A3C]">
          <span>Platform Fee</span>
          <span className="font-medium text-[#4A1F2A]">Free</span>
        </div>
      </div>

      <Divider sx={{ borderColor: "#E3D4B6" }} />

      {/* TOTAL */}
      <div className="px-5 py-3 flex justify-between items-center text-[#4A1F2A]">
        <span className="text-base font-semibold">Total</span>
        <span className="text-lg font-bold">
          ₹{formatINR(totalPayable)}
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
