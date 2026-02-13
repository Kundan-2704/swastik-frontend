
import React, { useMemo } from "react";
import { Divider } from "@mui/material";
import { useAppSelector } from "../../../Redux Toolkit/Store";
import {
  sumCartItemMrpPrice,
  sumCartItemSellingPrice,
} from "../../../Util/sumCartItem";

/* ===================== UTIL ===================== */
// const formatINR = (amount: number) =>
//   amount.toLocaleString("en-IN", {
//     maximumFractionDigits: 0,
//   });

const formatINR = (amount: number = 0) =>
  Number(amount || 0).toLocaleString("en-IN", {
    maximumFractionDigits: 0,
  });

const FREE_SHIPPING_THRESHOLD = 999; // optional future use



// const PricingCard = () => {
//   const { cart, couponDiscount } = useAppSelector((state) => state.cart);

//   const cartItems = cart?.cartItems || [];

//   /* ===================== CALCULATIONS ===================== */
//   const {
//     mrpTotal,
//     sellingTotal,
//     productDiscount,
//     shipping,
//     totalPayable,
//     totalSavings,
//   } = useMemo(() => {
//     const mrp = sumCartItemMrpPrice(cartItems);
//     const selling = sumCartItemSellingPrice(cartItems);

//     const productDisc = mrp - selling;
//     const couponDisc = couponDiscount || 0;

//     const shippingCost = selling >= FREE_SHIPPING_THRESHOLD ? 0 : 40;

//     const total = Math.max(selling - couponDisc + shippingCost, 0);
//     const savings = productDisc + couponDisc;

//     return {
//       mrpTotal: mrp,
//       sellingTotal: selling,
//       productDiscount: productDisc,
//       shipping: shippingCost,
//       totalPayable: total,
//       totalSavings: savings,
//     };
//   }, [cartItems, couponDiscount]);

//   /* ===================== UI ===================== */
//   return (
//     <div className="bg-[#FFFDF8] rounded-xl overflow-hidden border border-[#E3D4B6]">
//       {/* PRICE BREAKDOWN */}
//       <div className="space-y-4 p-5 text-sm">
//         <div className="flex justify-between items-center text-[#5A4A3C]">
//           <span>Subtotal</span>
//           <span className="font-medium text-[#4A1F2A]">
//             ₹{formatINR(mrpTotal)}
//           </span>
//         </div>

//         <div className="flex justify-between items-center text-[#5A4A3C]">
//           <span>Product Discount</span>
//           <span className="font-medium text-[#B9935A]">
//             -₹{formatINR(productDiscount)}
//           </span>
//         </div>

//         {couponDiscount > 0 && (
//           <div className="flex justify-between items-center text-[#5A4A3C]">
//             <span>Coupon Discount</span>
//             <span className="font-medium text-green-700">
//               -₹{formatINR(couponDiscount)}
//             </span>
//           </div>
//         )}

//         <div className="flex justify-between items-center text-[#5A4A3C]">
//           <span>Shipping</span>
//           <span className="font-medium text-[#4A1F2A]">
//             {shipping === 0 ? "Free" : `₹${formatINR(shipping)}`}
//           </span>
//         </div>

//         <div className="flex justify-between items-center text-[#5A4A3C]">
//           <span>Platform Fee</span>
//           <span className="font-medium text-[#4A1F2A]">Free</span>
//         </div>
//       </div>

//       <Divider sx={{ borderColor: "#E3D4B6" }} />

//       {/* TOTAL */}
//       <div className="px-5 py-3 flex justify-between items-center text-[#4A1F2A]">
//         <span className="text-base font-semibold">Total</span>
//         <span className="text-lg font-bold">
//           ₹{formatINR(totalPayable)}
//         </span>
//       </div>

//       {/* SAVINGS LINE */}
//       {totalSavings > 0 && (
//         <p className="text-xs text-green-700 text-right px-5 pb-3">
//           You saved ₹{formatINR(totalSavings)} on this order
//         </p>
//       )}
//     </div>
//   );
// };



// const PricingCard = () => {
//   const { cart } = useAppSelector((state) => state.cart);

//   if (!cart) return null;

//   return (
//     <div className="bg-[#FFFDF8] rounded-xl overflow-hidden border border-[#E3D4B6]">

//       <div className="space-y-4 p-5 text-sm">

//         <div className="flex justify-between">
//           <span>Subtotal</span>
//           <span>₹{formatINR(cart.totalMrpPrice)}</span>
//         </div>

//         <div className="flex justify-between">
//           <span>Product Discount</span>
//           <span>-₹{formatINR(cart.discount)}</span>
//         </div>

//         {cart.couponCode && cart.couponDiscount > 0 && (
//           <div className="flex justify-between">
//             <span>Coupon Discount</span>
//             <span>-₹{formatINR(cart.couponDiscount)}</span>
//           </div>
//         )}

//         <div className="flex justify-between">
//           <span>Shipping</span>
//           <span>
//             {cart.shippingCharge === 0
//               ? "Free"
//               : `₹${formatINR(cart.shippingCharge)}`}
//           </span>
//         </div>

//         <div className="flex justify-between">
//           <span>Platform Fee</span>
//           <span>Free</span>
//         </div>

//       </div>

//       <Divider sx={{ borderColor: "#E3D4B6" }} />

//       <div className="px-5 py-3 flex justify-between">
//         <span className="text-base font-semibold">Total</span>
//         <span className="text-lg font-bold">
//           ₹{formatINR(cart.finalAmount)}
//         </span>
//       </div>

//     </div>
//   );
// };

// export default PricingCard;





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