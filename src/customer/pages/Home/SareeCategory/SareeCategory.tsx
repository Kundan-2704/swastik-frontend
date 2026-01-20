
import React, { useEffect } from "react";
import SareeCategoryCard from "./SareeCategoryCard";
import { useAppDispatch, useAppSelector } from "../../../../Redux Toolkit/Store";
import { useLocation } from "react-router";
import { fetchHomeCategories } from "../../../../Redux Toolkit/Features/Customer/HomeCategorySlice";

const SareeCategory = () => {

  const dispatch = useAppDispatch();
  const location = useLocation();

  // ✅ Redux se data lo (NO API CALL HERE)
  const homeCategories =
    useAppSelector((state) => state.homeCategory.categories) || [];

  // ✅ sirf home page categories
  const categories = homeCategories
    .filter((item) => item.section === "home_categories")
    .slice(0, 6);

  useEffect(() => {
    dispatch(fetchHomeCategories());
  }, [dispatch, location.pathname]); // 🔥 MOST IMPORTANT

  /* ================= LOADING / SKELETON ================= */
  if (homeCategories.length === 0) {
    return (
      <div className="px-4 lg:px-20 py-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-[180px] rounded-2xl bg-[#EADDC4] animate-pulse"
          />
        ))}
      </div>
    );
  }

  /* ================= EMPTY STATE ================= */
  if (categories.length === 0) {
    return (
      <div className="py-12 text-center text-[#8B7A63]">
        <p className="text-lg font-medium">
          New collections coming soon 🌸
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        grid
        grid-cols-2
        md:grid-cols-3
        lg:grid-cols-6
        gap-6
        px-4
        lg:px-20
        py-10
        bg-[#F8F3E8]
        border-b
        border-[#E3D4B6]
      "
    >
      {categories.map((item) => (
        <div
          key={item._id}
          className="transition-transform duration-300 hover:-translate-y-1"
        >
          <SareeCategoryCard item={item} />
        </div>
      ))}
    </div>
  );
};

export default SareeCategory;
