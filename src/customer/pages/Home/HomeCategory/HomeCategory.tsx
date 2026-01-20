
import React, {
  useEffect,
  useMemo,
  useCallback,
  memo,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";

import HomeCategoryCard from "./HomeCategoryCard";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../Redux Toolkit/Store";
import { fetchHomeCategories } from "../../../../Redux Toolkit/Features/Customer/HomeCategorySlice";

/* ===============================
   TYPES
================================ */
type HomeCategoryItem = {
  _id?: string;
  categoryId: string;
  name: string;
  image?: string;
  title?: string;
  section?: string;
};

/* ===============================
   SKELETON LOADER
================================ */
const CategorySkeleton: React.FC = () => {
  return (
    <div
      className="
        w-[160px]
        h-[210px]
        rounded-2xl
        bg-[#EADDC4]
        animate-pulse
      "
    />
  );
};

/* ===============================
   COMPONENT
================================ */
const HomeCategory: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { categories, loading, error } = useAppSelector(
    (state) => state.homeCategory
  );

  /* ===============================
     FETCH ON MOUNT (SAFE)
  ================================ */
  useEffect(() => {
    if (!categories || categories.length === 0) {
      dispatch(fetchHomeCategories());
    }
  }, [dispatch,  location.pathname]);

  /* ===============================
     FILTER – MEMOIZED
  ================================ */
  const shopByCategories = useMemo<HomeCategoryItem[]>(
    () =>
      (categories || []).filter(
        (item: HomeCategoryItem) =>
          item.section === "shop_by_categories"
      ),
    [categories]
  );

  /* ===============================
     HANDLER – MEMOIZED
  ================================ */
  const handleCategoryClick = useCallback(
    (categoryId: string) => {
      navigate(`/products/${categoryId}`);
    },
    [navigate]
  );

  /* ===============================
     LOADING STATE
  ================================ */
  if (loading) {
    return (
      <section className="bg-[#F8F3E8] py-12 px-4 lg:px-20">
        <div className="flex justify-center gap-10 flex-wrap">
          {Array.from({ length: 6 }).map((_, index) => (
            <CategorySkeleton key={index} />
          ))}
        </div>
      </section>
    );
  }

  /* ===============================
     ERROR STATE
  ================================ */
  if (error) {
    return (
      <div className="py-12 text-center text-red-500">
        Something went wrong. Please try again.
      </div>
    );
  }

  /* ===============================
     EMPTY STATE
  ================================ */
  if (shopByCategories.length === 0) {
    return (
      <div className="py-12 text-center text-gray-500">
        No categories available right now.
      </div>
    );
  }

  /* ===============================
     UI
  ================================ */
  return (
    <section
      className="bg-[#F8F3E8] py-12 px-4 lg:px-20"
      aria-label="Shop by Categories"
    >
      <div className="flex justify-center gap-10 flex-wrap">
        {shopByCategories.map((item) => (
          <div
            key={item._id || item.categoryId}
            role="button"
            tabIndex={0}
            aria-label={`Open ${item.name} category`}
            onClick={() =>
              handleCategoryClick(item.categoryId)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleCategoryClick(item.categoryId);
              }
            }}
            className="
              relative
              cursor-pointer
              rounded-2xl
              transition-all
              duration-300
              ease-out
              hover:scale-[1.03]
              hover:-translate-y-1
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#D9A86C]
            "
          >
            {/* CATEGORY CARD */}
            <HomeCategoryCard item={item} />

            {/* HOVER OVERLAY – DESKTOP ONLY */}
            <div
              className="
                absolute inset-0
                hidden md:flex
                items-center justify-center
                bg-black/40
                opacity-0
                hover:opacity-100
                transition-opacity
                duration-300
                rounded-2xl
                pointer-events-none
              "
            >
              <span
                className="
                  text-white
                  text-sm
                  font-medium
                  tracking-wide
                "
              >
                Shop Collection →
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default memo(HomeCategory);
