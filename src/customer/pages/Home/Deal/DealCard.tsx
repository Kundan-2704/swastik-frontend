

// /* ================= TYPES ================= */
// interface DealCardProps {
//   deal: {
//     image?: string;
//     discount: number;
//   };
// }

// const DealCard: React.FC<DealCardProps> = ({ deal }) => {
//   const imageSrc = deal.image || "/placeholder.jpg";

//   return (
//     <div
//       className="
//         w-full cursor-pointer 
//         rounded-xl overflow-hidden 
//         shadow-md hover:shadow-2xl 
//         bg-[#F8F3E8]
//         transition-all duration-500
//         group
//         select-none
//         hover:-translate-y-1
//       "
//     >
//       {/* IMAGE */}
//       <div className="relative w-full h-48 overflow-hidden">
//         <img
//           src={imageSrc}
//           alt={`Deal product with ${deal.discount}% discount`}
//           draggable={false}
//           onDragStart={(e) => e.preventDefault()}
//           onError={(e) => {
//             e.currentTarget.src = "/placeholder.jpg";
//           }}
//           loading="lazy"
//           className="
//             w-full h-full object-cover object-top
//             transition-transform duration-700 
//             group-hover:scale-105
//             pointer-events-none
//           "
//         />

//         {/* DISCOUNT BADGE */}
//         <div
//           aria-label={`${deal.discount}% off`}
//           className="
//             absolute top-3 right-3 
//             bg-gradient-to-br from-[#B9935A] to-[#8B6F48]
//             text-white 
//             rounded-full 
//             px-4 py-2 
//             text-sm font-semibold 
//             shadow-[0_4px_10px_rgba(0,0,0,0.25)]
//             border border-[#E8D3A4]
//             pointer-events-none
//           "
//         >
//           {deal.discount}% OFF
//         </div>
//       </div>

//       {/* CTA STRIP */}
//       <div
//         className="
//           bg-[#4A1F2A] 
//           text-[#FDEFD6] 
//           font-semibold 
//           text-center 
//           py-3 
//           text-base
//           tracking-wide
//           border-t-2 border-[#B9935A]
//           group-hover:bg-[#34121C]
//           transition-colors duration-300
//           pointer-events-none
//         "
//       >
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
        h-full
        rounded-2xl
        overflow-hidden
        bg-[#FFF8F2]
        shadow-md
        flex flex-col
      "
    >
      {/* IMAGE */}
      <div className="relative w-full h-[260px] overflow-hidden">
        <img
          src={imageSrc}
          alt={deal.title || "Deal product"}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = "/placeholder.jpg";
          }}
          className="w-full h-full object-cover object-top"
        />

        {/* DISCOUNT BADGE */}
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
          <h3 className="text-[12px] font-medium text-[#2B1B1B] line-clamp-2">
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
