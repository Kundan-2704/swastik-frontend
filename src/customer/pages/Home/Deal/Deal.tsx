



// import React, { useEffect } from "react";
// import Slider, { Settings } from "react-slick";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";

// import DealCard from "./DealCard";
// import { useAppDispatch, useAppSelector } from "../../../../Redux Toolkit/Store";
// import { getActiveDeals } from "../../../../Redux Toolkit/Features/Customer/CustomerDealSlice";

// /* ================= TYPES ================= */
// interface Product {
//   _id: string;
//   title: string;
//   categoryId: string;
//   image?: string;
//   images?: string[];
// }

// interface DealItem {
//   discountValue: number;
//   products: Product[];
// }

// const Deal: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();

//   const { deals, loading } = useAppSelector(
//     (state) => state.customerDeal
//   );

//   useEffect(() => {
//     dispatch(getActiveDeals());
//   }, [dispatch]);

//   /* ================= SLIDER SETTINGS ================= */
//   const settings: Settings = {
//     dots: true,
//     infinite: deals.length > 5,
//     speed: 600,
//     slidesToShow: 5,
//     slidesToScroll: 1,
//     autoplay: deals.length > 1,
//     autoplaySpeed: 2500,
//     arrows: false,
//     responsive: [
//       { breakpoint: 1280, settings: { slidesToShow: 4 } },
//       { breakpoint: 1024, settings: { slidesToShow: 3 } },
//       { breakpoint: 768, settings: { slidesToShow: 2 } },
//       { breakpoint: 480, settings: { slidesToShow: 1 } },
//     ],
//   };

//   /* ================= LOADING STATE ================= */
//   if (loading) {
//     return (
//       <div className="px-4 lg:px-16 py-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
//         {[...Array(5)].map((_, i) => (
//           <div
//             key={i}
//             className="h-[280px] rounded-2xl bg-[#EADDC4] animate-pulse"
//           />
//         ))}
//       </div>
//     );
//   }

//   /* ================= EMPTY STATE ================= */
//   if (!deals.length) {
//     return (
//       <div className="py-12 text-center text-[#8B7A63]">
//         <p className="text-lg font-medium">
//           No active deals right now ✨
//         </p>
//       </div>
//     );
//   }

//   return (
//     <motion.div
//       className="py-5 px-4 md:px-8 lg:px-16"
//       initial={{ opacity: 0, y: 40 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.6 }}
//     >
//       <Slider {...settings}>
//         {deals.flatMap((deal) =>
//           deal.products?.map((product) => {
//             const image =
//               product.image ||
//               product.images?.[0] ||
//               "/placeholder.jpg";

//             return (
//               <div key={product._id} className="px-2">
//                 <button
//                   type="button"
//                   aria-label={`View deal for ${product.title}`}
//                   className="w-full text-left focus:outline-none"
//                   onMouseDown={(e) => e.stopPropagation()}
//                   onClick={() =>
//                     navigate(
//                       `/product-details/${product.categoryId}/${product.title}/${product._id}`
//                     )
//                   }
//                 >
//                   <DealCard
//                     deal={{
//                       image,
//                       // discount: deal.discountValue,
//                          discount: deal.discountValue,
//     dealName: deal.name,
//     title: product.title,
//     price: product.sellingPrice, // 👈 yahin se price
//     endDate: deal.endDate,
//                     }}
//                   />
//                 </button>
//               </div>
//             );
//           })
//         )}
//       </Slider>
//     </motion.div>
//   );
// };

// export default Deal;






import React, { useEffect } from "react";
import Slider, { Settings } from "react-slick";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import DealCard from "./DealCard";
import { useAppDispatch, useAppSelector } from "../../../../Redux Toolkit/Store";
import { getActiveDeals } from "../../../../Redux Toolkit/Features/Customer/CustomerDealSlice";
import { useIsMobile } from "../../../../hooks/useIsMobile";

const Deal: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isMobile = useIsMobile();   // ✅ MAGIC

  const { deals, loading } = useAppSelector(
    (state) => state.customerDeal
  );

  useEffect(() => {
    dispatch(getActiveDeals());
  }, [dispatch]);

  const settings: Settings = {
    dots: true,
    infinite: deals.length > 5,
    speed: 600,

    slidesToShow: isMobile ? 1 : 5,   // ✅ PERFECT CONTROL
    slidesToScroll: 1,

    autoplay: deals.length > 1,
    autoplaySpeed: 2500,
    arrows: false,
  };

  if (loading) {
    return (
      <div className="px-4 lg:px-16 py-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="h-[280px] rounded-2xl bg-[#EADDC4] animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (!deals.length) {
    return (
      <div className="py-12 text-center text-[#8B7A63]">
        <p className="text-lg font-medium">
          No active deals right now ✨
        </p>
      </div>
    );
  }

  return (
    <motion.div
      className="py-5 px-2 sm:px-4 md:px-8 lg:px-16"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <Slider {...settings}>
        {deals.flatMap((deal) =>
          deal.products?.map((product) => {
            const image =
              product.image ||
              product.images?.[0] ||
              "/placeholder.jpg";

            return (
              <div key={product._id}>
                <div className="px-2">
                  <button
                    type="button"
                    className="w-full block text-left"
                    onClick={() =>
                      navigate(
                        `/product-details/${product.categoryId}/${product.title}/${product._id}`
                      )
                    }
                  >
                    <DealCard
                      deal={{
                        image,
                        discount: deal.discountValue,
                        dealName: deal.name,
                        title: product.title,
                        price: product.sellingPrice,
                        endDate: deal.endDate,
                      }}
                    />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </Slider>
    </motion.div>
  );
};

export default Deal;