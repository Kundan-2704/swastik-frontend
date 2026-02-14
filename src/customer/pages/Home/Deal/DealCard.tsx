// import React from "react";
// import { useCountdown } from "../../../../hooks/useCountDown";

// interface DealCardProps {
//   deal: {
//     image?: string;
//     discount: number;
//     dealName?: string;
//     title?: string;
//     price?: number;
//     endDate?: string;
//   };
// }

// const DealCard: React.FC<DealCardProps> = ({ deal }) => {
//   const imageSrc = deal.image || "/placeholder.jpg";

//   const originalPrice = deal.price ?? 0;
//   const discountedPrice =
//     originalPrice > 0
//       ? Math.round(originalPrice - (originalPrice * deal.discount) / 100)
//       : null;

//   const countdown = useCountdown(deal.endDate);
//   const isUrgent = countdown && countdown.days === 0;

//   return (
//     <div
//       className="
//         w-full
//         h-full
//         rounded-2xl
//         overflow-hidden
//         bg-[#FFF8F2]
//         shadow-md
//         flex flex-col
//       "
//     >
//       {/* IMAGE */}
//       <div className="relative w-full h-[260px] overflow-hidden">
//         <img
//           src={imageSrc}
//           alt={deal.title || "Deal product"}
//           loading="lazy"
//           onError={(e) => {
//             e.currentTarget.src = "/placeholder.jpg";
//           }}
//           className="w-full h-full object-cover object-top"
//         />

//         {/* DISCOUNT BADGE */}
//         <div className="absolute top-2 right-2 bg-[#C6A35B] text-white text-[11px] font-semibold px-2 py-1 rounded-full">
//           {deal.discount}% OFF
//         </div>
//       </div>

//       {/* CONTENT */}
//       <div className="p-3 space-y-1">
//         {deal.dealName && (
//           <p className="text-[9px] tracking-widest text-[#B5933A] uppercase">
//             {deal.dealName}
//           </p>
//         )}

//         {deal.title && (
//           <h3 className="text-[12px] font-medium text-[#2B1B1B] line-clamp-2">
//             {deal.title}
//           </h3>
//         )}

//         {originalPrice > 0 && discountedPrice && (
//           <div className="flex items-center gap-1">
//             <span className="text-[10px] text-[#B5933A] line-through">
//               ₹{originalPrice.toLocaleString("en-IN")}
//             </span>
//             <span className="text-[13px] font-bold text-[#4A1F2A]">
//               ₹{discountedPrice.toLocaleString("en-IN")}
//             </span>
//           </div>
//         )}

//         {countdown ? (
//           <p
//             className={`text-[10px] flex items-center gap-1 ${
//               isUrgent ? "text-red-600 animate-pulse" : "text-gray-500"
//             }`}
//           >
//             ⏳
//             {countdown.days > 0 && `${countdown.days}d `}
//             {String(countdown.hours).padStart(2, "0")}:
//             {String(countdown.minutes).padStart(2, "0")}
//           </p>
//         ) : (
//           <p className="text-[10px] text-red-600">Deal Ended</p>
//         )}
//       </div>

//       {/* CTA */}
//       <div className="mt-auto bg-[#5A1F2B] text-white text-center text-[12px] font-medium py-2">
//         Shop Now
//       </div>
//     </div>
//   );
// };

// export default DealCard;





import React from "react";
import { useCountdown } from "../../../../hooks/useCountDown";

interface DealCardProps {
  deal: {
    image?: string;
    discount: number;
    dealName?: string;
    title?: string;
    price?: number;
    endDate?: string;
  };
}

const DealCard: React.FC<DealCardProps> = ({ deal }) => {
  const imageSrc = deal.image || "/placeholder.jpg";

  const originalPrice = deal.price ?? 0;
  const discountedPrice =
    originalPrice > 0
      ? Math.round(originalPrice - (originalPrice * deal.discount) / 100)
      : null;

  const countdown = useCountdown(deal.endDate);
  const isUrgent = countdown && countdown.days === 0;

  return (
    <div
      className="
        w-full
        min-w-0     /* ✅ CRITICAL FIX */
        rounded-2xl
        overflow-hidden
        bg-[#FFF8F2]
        shadow-md
        flex flex-col
        cursor-pointer
      "
    >
      {/* IMAGE */}
      <div className="relative w-full h-[220px] sm:h-[240px] lg:h-[260px]">
        <img
          src={imageSrc}
          alt={deal.title || "Deal product"}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = "/placeholder.jpg";
          }}
          className="w-full h-full object-cover object-top"
        />

        <div className="absolute top-2 right-2 bg-[#C6A35B] text-white text-[11px] font-semibold px-2 py-1 rounded-full">
          {deal.discount}% OFF
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-3 space-y-1">
        {deal.dealName && (
          <p className="text-[9px] tracking-widest text-[#B5933A] uppercase">
            {deal.dealName}
          </p>
        )}

        {deal.title && (
          <h3 className="text-[11px] sm:text-[12px] font-medium text-[#2B1B1B] line-clamp-2">
            {deal.title}
          </h3>
        )}

        {originalPrice > 0 && discountedPrice && (
          <div className="flex items-center gap-1">
            <span className="text-[10px] text-[#B5933A] line-through">
              ₹{originalPrice.toLocaleString("en-IN")}
            </span>
            <span className="text-[13px] font-bold text-[#4A1F2A]">
              ₹{discountedPrice.toLocaleString("en-IN")}
            </span>
          </div>
        )}

        {countdown ? (
          <p
            className={`text-[10px] flex items-center gap-1 ${
              isUrgent ? "text-red-600 animate-pulse" : "text-gray-500"
            }`}
          >
            ⏳
            {countdown.days > 0 && `${countdown.days}d `}
            {String(countdown.hours).padStart(2, "0")}:
            {String(countdown.minutes).padStart(2, "0")}
          </p>
        ) : (
          <p className="text-[10px] text-red-600">Deal Ended</p>
        )}
      </div>

      {/* CTA */}
      <div className="mt-auto bg-[#5A1F2B] text-white text-center text-[12px] font-medium py-2">
        Shop Now
      </div>
    </div>
  );
};

export default DealCard;