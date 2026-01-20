// // import { useNavigate } from "react-router-dom";
// import { useAppSelector } from "../../../../Redux Toolkit/Store";

// const Grid = () => {
//   const navigate = useNavigate();

//   const homeCategories =
//     useAppSelector((state) => state.homeCategory.categories) || [];

//   const categories = homeCategories.filter(
//     (item) => item.section === "grid"
//   );

//   /* ================= SKELETON LOADER ================= */
//   if (categories.length < 6) {
//     return (
//       <div className="px-4 lg:px-20 py-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
//         {[...Array(6)].map((_, i) => (
//           <div
//             key={i}
//             className="h-[200px] rounded-2xl bg-[#EADDC4] animate-pulse"
//           />
//         ))}
//       </div>
//     );
//   }

//   const handleClick = (categoryId: string) => {
//     if (!categoryId) return;
//     navigate(`/products/${categoryId}`);
//   };

//   const img = (item: any) =>
//     `${item.image}?v=${item.updatedAt || "1"}`;

//   return (
//     <div
//       className="
//         grid gap-4
//         grid-cols-2 md:grid-cols-3 lg:grid-cols-12
//         lg:grid-rows-12
//         px-4 lg:px-20
//         lg:h-[620px]
//       "
//     >
//       {categories.slice(0, 6).map((item, index) => {
//         const layoutMap = [
//           "col-span-2 md:col-span-1 lg:col-span-3 lg:row-span-12",
//           "col-span-1 lg:col-span-2 lg:row-span-6",
//           "col-span-1 md:col-span-2 lg:col-span-4 lg:row-span-6",
//           "col-span-2 md:col-span-1 lg:col-span-3 lg:row-span-12",
//           "col-span-1 md:col-span-2 lg:col-span-4 lg:row-span-6",
//           "col-span-1 lg:col-span-2 lg:row-span-6",
//         ];

//         return (
//           <div
//             key={item._id || item.categoryId}
//             onClick={() => handleClick(item.categoryId)}
//             className={`${layoutMap[index]} cursor-pointer group`}
//           >
//             <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-md">

//               {/* IMAGE */}
//               <img
//                 src={img(item)}
//                 alt={item.name}
//                 loading="lazy"
//                 className="
//                   w-full h-full object-cover
//                   transition-transform duration-700
//                   group-hover:scale-110
//                 "
//               />

//               {/* OVERLAY */}
//               <div
//                 className="
//                   absolute inset-0
//                   bg-gradient-to-t from-black/60 via-black/20 to-transparent
//                   opacity-0 group-hover:opacity-100
//                   transition-opacity duration-500
//                 "
//               />

//               {/* TEXT */}
//               <div
//                 className="
//                   absolute bottom-4 left-4
//                   text-white
//                   opacity-0 group-hover:opacity-100
//                   transition-all duration-500
//                   translate-y-4 group-hover:translate-y-0
//                 "
//               >
//                 <h3 className="text-lg font-semibold tracking-wide">
//                   {item.name}
//                 </h3>
//                 <p className="text-xs opacity-90">
//                   Explore Collection
//                 </p>
//               </div>

//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default Grid;







import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../Redux Toolkit/Store";
import { motion } from "framer-motion";
import { fetchHomeCategories } from "../../../../Redux Toolkit/Features/Customer/HomeCategorySlice";

const Grid = () => {
  const navigate = useNavigate();

   const dispatch = useAppDispatch();
  const location = useLocation();

  const homeCategories =
    useAppSelector((state) => state.homeCategory.categories) || [];

  const categories = homeCategories.filter(
    (item) => item.section === "grid"
  );

    useEffect(() => {
    dispatch(fetchHomeCategories());
  }, [dispatch, location.pathname]); // 🔥 IMPORTANT

  /* ================= SKELETON LOADER ================= */
  if (homeCategories.length === 0) {
    return (
      <div className="px-4 lg:px-20 py-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-[200px] rounded-2xl bg-[#EADDC4] animate-pulse"
          />
        ))}
      </div>
    );
  }

  const handleNavigate = (categoryId) => {
    if (!categoryId) return;
    navigate(`/products/${categoryId}`);
  };

  const getImage = (item) =>
    item.image
      ? `${item.image}?v=${item.updatedAt || "1"}`
      : "/placeholder.jpg";

  const layoutMap = [
    "col-span-2 md:col-span-1 lg:col-span-3 lg:row-span-12",
    "col-span-1 lg:col-span-2 lg:row-span-6",
    "col-span-1 md:col-span-2 lg:col-span-4 lg:row-span-6",
    "col-span-2 md:col-span-1 lg:col-span-3 lg:row-span-12",
    "col-span-1 md:col-span-2 lg:col-span-4 lg:row-span-6",
    "col-span-1 lg:col-span-2 lg:row-span-6",
  ];

  return (
    <div
      className="
        grid gap-4
        grid-cols-2 md:grid-cols-3 lg:grid-cols-12
        lg:grid-rows-12
        px-4 lg:px-20
        lg:h-[620px]
      "
    >
      {categories.slice(0, 6).map((item, index) => (
        <motion.div
          key={item._id || item.categoryId}
          role="button"
          tabIndex={0}
          onClick={() => handleNavigate(item.categoryId)}
          onKeyDown={(e) =>
            e.key === "Enter" && handleNavigate(item.categoryId)
          }
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.06 }}
          className={`${layoutMap[index]} cursor-pointer group focus:outline-none`}
        >
          <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-md">

            {/* IMAGE */}
            <img
              src={getImage(item)}
              alt={item.name}
              loading="lazy"
              onError={(e) =>
                (e.currentTarget.src = "/placeholder.jpg")
              }
              className="
                w-full h-full object-cover
                transition-transform duration-700
                group-hover:scale-110
              "
            />

            {/* OVERLAY */}
            <div
              className="
                absolute inset-0
                bg-gradient-to-t from-black/60 via-black/20 to-transparent
                opacity-0 group-hover:opacity-100
                transition-opacity duration-500
              "
            />

            {/* TEXT */}
            <div
              className="
                absolute bottom-4 left-4
                text-white
                opacity-0 group-hover:opacity-100
                transition-all duration-500
                translate-y-4 group-hover:translate-y-0
              "
            >
              <h3 className="text-lg font-semibold tracking-wide">
                {item.name}
              </h3>
              <p className="text-xs opacity-90">
                Explore Collection
              </p>
            </div>

          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Grid;
