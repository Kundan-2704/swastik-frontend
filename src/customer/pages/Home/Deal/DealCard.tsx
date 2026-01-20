// 
// const DealCard = ({ deal }: any) => {
//   return (
//     <div
//       className="
//         w-full cursor-pointer 
//         rounded-xl overflow-hidden 
//         shadow-md hover:shadow-xl 
//         bg-[#F8F3E8]
//         transition-all duration-500
//         group
//         select-none
//       "
//     >
//       {/* IMAGE */}
//       <div className="relative w-full h-48 overflow-hidden">
//         <img
//           src={deal.image}
//           alt=""
//           draggable={false}                 // 🔥 VERY IMPORTANT
//           onDragStart={(e) => e.preventDefault()} // 🔥 VERY IMPORTANT
//           className="
//             w-full h-full object-cover object-top
//             transition-transform duration-700 
//             group-hover:scale-105
//             pointer-events-none
//           "
//         />

//         {/* DISCOUNT BADGE */}
//         <div
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

//       {/* BOTTOM */}
//       <div
//         className="
//           bg-[#4A1F2A] 
//           text-[#FDEFD6] 
//           font-semibold 
//           text-center 
//           py-3 
//           text-lg 
//           tracking-wide
//           border-t-2 border-[#B9935A]
//           group-hover:bg-[#34121C]
//           transition-all duration-300
//           pointer-events-none
//         "
//       >
//         Shop Now
//       </div>
//     </div>
//   );
// };

// export default DealCard;







/* ================= TYPES ================= */
interface DealCardProps {
  deal: {
    image?: string;
    discount: number;
  };
}

const DealCard: React.FC<DealCardProps> = ({ deal }) => {
  const imageSrc = deal.image || "/placeholder.jpg";

  return (
    <div
      className="
        w-full cursor-pointer 
        rounded-xl overflow-hidden 
        shadow-md hover:shadow-2xl 
        bg-[#F8F3E8]
        transition-all duration-500
        group
        select-none
        hover:-translate-y-1
      "
    >
      {/* IMAGE */}
      <div className="relative w-full h-48 overflow-hidden">
        <img
          src={imageSrc}
          alt={`Deal product with ${deal.discount}% discount`}
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
          onError={(e) => {
            e.currentTarget.src = "/placeholder.jpg";
          }}
          loading="lazy"
          className="
            w-full h-full object-cover object-top
            transition-transform duration-700 
            group-hover:scale-105
            pointer-events-none
          "
        />

        {/* DISCOUNT BADGE */}
        <div
          aria-label={`${deal.discount}% off`}
          className="
            absolute top-3 right-3 
            bg-gradient-to-br from-[#B9935A] to-[#8B6F48]
            text-white 
            rounded-full 
            px-4 py-2 
            text-sm font-semibold 
            shadow-[0_4px_10px_rgba(0,0,0,0.25)]
            border border-[#E8D3A4]
            pointer-events-none
          "
        >
          {deal.discount}% OFF
        </div>
      </div>

      {/* CTA STRIP */}
      <div
        className="
          bg-[#4A1F2A] 
          text-[#FDEFD6] 
          font-semibold 
          text-center 
          py-3 
          text-base
          tracking-wide
          border-t-2 border-[#B9935A]
          group-hover:bg-[#34121C]
          transition-colors duration-300
          pointer-events-none
        "
      >
        Shop Now
      </div>
    </div>
  );
};

export default DealCard;
