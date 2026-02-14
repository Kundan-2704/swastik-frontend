import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../Redux Toolkit/Store";
import { motion } from "framer-motion";
import { fetchHomeCategories } from "../../../../Redux Toolkit/Features/Customer/HomeCategorySlice";

const Grid = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();

  const [activeMobile, setActiveMobile] = useState(null);

  const isMobile =
    typeof window !== "undefined" && window.innerWidth < 768;

  const homeCategories =
    useAppSelector((state) => state.homeCategory.categories) || [];

  const categories = homeCategories.filter(
    (item) => item.section === "grid"
  );

  useEffect(() => {
    dispatch(fetchHomeCategories());
  }, [dispatch, location.pathname]);

  const handleNavigate = (id) => {
    if (!id) return;
    navigate(`/products/${id}`);
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
        grid gap-5
        grid-cols-2 md:grid-cols-3 lg:grid-cols-12
        lg:grid-rows-12
        px-4 lg:px-20
        lg:h-[620px]
      "
    >
      {categories.slice(0, 6).map((item, index) => {
        const isOpen = activeMobile === index;
        const showOverlay =
          !isMobile || isOpen || index === 0;

        return (
          <motion.div
            key={item._id || item.categoryId}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.06 }}
            className={`${layoutMap[index]} group cursor-pointer`}
            onClick={() => {
              if (isMobile) {
                if (isOpen) {
                  handleNavigate(item.categoryId);
                } else {
                  setActiveMobile(index);
                }
              } else {
                handleNavigate(item.categoryId);
              }
            }}
          >
            <div className="
              relative w-full h-full rounded-3xl overflow-hidden
              shadow-[0_10px_30px_rgba(0,0,0,0.08)]
            ">

              {/* IMAGE */}
              <img
                src={getImage(item)}
                alt={item.name}
                loading="lazy"
                className="
                  w-full h-full object-cover
                  transition-transform duration-700
                  group-hover:scale-110
                "
              />

              {/* OVERLAY */}
              <div
                className={`
                  absolute inset-0
                  bg-gradient-to-t from-black/70 via-black/30 to-transparent
                  transition-all duration-500
                  ${showOverlay ? "opacity-100" : "opacity-0"}
                `}
              />

              {/* TEXT */}
              <div
                className={`
                  absolute bottom-4 left-4 right-4
                  text-white
                  transition-all duration-500
                  ${showOverlay ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
                `}
              >
                <h3 className="text-lg font-semibold tracking-wide">
                  {item.name}
                </h3>
                <p className="text-xs opacity-90 flex items-center gap-1">
                  Explore Collection →
                </p>
              </div>

            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default Grid;
