import React, { useEffect, useState } from "react";
import Sketch from "../../../assets/Sketch.png";
import ProductSkeleton from "./ProductDetails/components/skeletons/ProductSkeleton";

import {
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  type SelectChangeEvent,
  useMediaQuery,
} from "@mui/material";

import { useParams, useSearchParams } from "react-router-dom";

import FilterSection from "./FilterSection";
import ProductCard from "./ProductCard";

import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
import { getAllProducts } from "../../../Redux Toolkit/Features/Customer/ProductSlice";

import { findCategoryTitle } from "../../../Util/findCategoryTitle";
import { allCategories } from "../../../Data/Category/AllCategories";

/* ================= TYPES ================= */
interface RouteParams {
  categoryId?: string;
}

const Products: React.FC = () => {
  const dispatch = useAppDispatch();
  const isMobile = useMediaQuery("(max-width:768px)");

  const { categoryId } = useParams<RouteParams>();
  const [searchParams] = useSearchParams();

  const searchQuery: string = searchParams.get("search") || "";

  const safeCategoryId: string | undefined = categoryId
    ?.toLowerCase()
    // .replace(/\s+/g, "_");
    .replace(/\s+/g, "-");


  const [sort, setSort] = useState<string>("newest");

  const { products, totalPages, loading, error } = useAppSelector(
    (state) => state.products
  );

  const pageTitle = findCategoryTitle(allCategories, categoryId);

  /* ================= API CALL ================= */
  useEffect(() => {
    dispatch(
      getAllProducts({
        categoryId: safeCategoryId,
        search: searchQuery,
        sort,
        pageNumber: 1,
      })
    );
  }, [dispatch, safeCategoryId, searchQuery, sort]);

  /* ================= SEO ================= */
  // useEffect(() => {
  //   if (searchQuery) {
  //     document.title = `Search results for "${searchQuery}" | Swastik`;
  //   } else if (pageTitle) {
  //     document.title = `${pageTitle} | Premium Handloom Sarees`;
  //   } else {
  //     document.title = "All Products | Swastik";
  //   }
  // }, [pageTitle, searchQuery]);


  /* ================= SEO ================= */
useEffect(() => {
  /* ---- TITLE ---- */
  if (searchQuery) {
    document.title = `Search results for "${searchQuery}" | Swastik Handloom`;
  } else if (pageTitle) {
    document.title = `${pageTitle} | Pure Handloom ${pageTitle} Online`;
  } else {
    document.title = "Handloom Sarees Online | Swastik Handloom";
  }

  /* ---- META DESCRIPTION ---- */
  const metaDescription = document.querySelector(
    'meta[name="description"]'
  );

  if (metaDescription) {
    if (searchQuery) {
      metaDescription.setAttribute(
        "content",
        `Explore search results for ${searchQuery} at Swastik Handloom. Discover authentic premium handloom sarees.`
      );
    } else if (pageTitle) {
      metaDescription.setAttribute(
        "content",
        `Shop authentic ${pageTitle} at Swastik Handloom. Premium pure handloom sarees crafted with heritage weaving techniques.`
      );
    } else {
      metaDescription.setAttribute(
        "content",
        "Explore premium handloom sarees at Swastik Handloom. Authentic heritage woven luxury collections."
      );
    }
  }
}, [pageTitle, searchQuery]);


  /* ================= HANDLERS ================= */
  const handleSortProduct = (e: SelectChangeEvent<string>) => {
    setSort(e.target.value);
  };

  const handlePageChange = (_e: React.ChangeEvent<unknown>, page: number) => {
    dispatch(
      getAllProducts({
        categoryId: safeCategoryId,
        search: searchQuery,
        sort,
        pageNumber: page,
      })
    );
  };

  /* ================= UI ================= */
  return (
    <div className="mt-14">
      {/* PAGE TITLE */}
      <h1 className="text-center text-3xl md:text-4xl font-bold tracking-[0.25em] text-[#4A1F2A] mb-3">
        {searchQuery
          ? `Search results for "${searchQuery}"`
          : pageTitle || "All Products"}
      </h1>

      {/* RESULT COUNT */}
      {!loading && products?.length > 0 && (
        <p className="text-center text-sm text-[#7A6A58] mb-6">
          Showing {products.length} premium handloom products
        </p>
      )}

      <div className="lg:flex">
        {/* LEFT FILTER (DESKTOP ONLY) */}
        <aside className="hidden lg:block w-[22%] min-h-screen border-r border-[#E3D4B6] bg-[#F8F3E8]">
          <FilterSection />
        </aside>

        {/* MAIN CONTENT */}
        <main className="w-full lg:w-[78%] px-4 sm:px-6 lg:px-10 space-y-6">
          {/* SORT BAR (STICKY ON MOBILE) */}
          <div
            className={`flex justify-between items-center py-3 px-4 bg-[#FDF9F2] rounded-xl border border-[#E3D4B6] ${
              isMobile ? " z-30" : ""
            }`}
          >
            <p className="text-[#6A5B4A] text-sm">
              Handpicked premium saree collections
            </p>

            <FormControl size="small" sx={{ minWidth: 160 }}>
              <InputLabel>Sort</InputLabel>
              <Select value={sort} label="Sort" onChange={handleSortProduct}>
                <MenuItem value="newest">Newest First</MenuItem>
                <MenuItem value="price_low">
                  Price : Low → High
                </MenuItem>
                <MenuItem value="price_high">
                  Price : High → Low
                </MenuItem>
              </Select>
            </FormControl>
          </div>

          <Divider />

          {/* LOADING */}
          {loading && (
            <div
              className={`grid ${
                isMobile
                  ? "grid-cols-1 gap-y-16"
                  : "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12"
              } mt-8`}
            >
              {Array.from({ length: isMobile ? 4 : 8 }).map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          )}

          {/* ERROR */}
          {error && (
            <p className="text-center text-red-500 py-20">
              Something went wrong. Please refresh the page.
            </p>
          )}

          {/* EMPTY STATE */}
          {!loading && products?.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 md:py-20 text-center space-y-6">
              <h2 className="text-2xl font-semibold tracking-wide text-[#4A1F2A]">
                This collection is currently unavailable
              </h2>

              <img
                src={Sketch}
                alt="Traditional handloom weaving illustration"
                className="w-44 md:w-52 opacity-70 grayscale"
              />

              <p className="text-[#6A5B4A] max-w-md">
                We curate limited premium handloom pieces to maintain exclusivity.
                New designs will be added soon.
              </p>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => (window.location.href = "/products")}
                  className="px-6 py-2 rounded-full border border-[#4A1F2A] text-[#4A1F2A] hover:bg-[#4A1F2A] hover:text-white transition"
                >
                  Explore All Sarees
                </button>

                <button
                  onClick={() =>
                    (window.location.href = "/products?sort=popular")
                  }
                  className="px-6 py-2 rounded-full bg-[#4A1F2A] text-white hover:opacity-90 transition"
                >
                  View Best Sellers
                </button>
              </div>
            </div>
          )}

          {/* PRODUCT GRID */}
          {!loading && products?.length > 0 && (
            <div
              className={`grid ${
                isMobile
                  ? "grid-cols-1 gap-y-16"
                  : "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12"
              } mt-8`}
            >
              {products.map((item: any) => (
                <ProductCard key={item._id} item={item} />
              ))}
            </div>
          )}

          {/* PAGINATION (DESKTOP) */}
         {totalPages > 1 && (
  <div
    className={`flex justify-center py-8 ${
      isMobile ? " bg-white z-30 border-t" : ""
    }`}
  >
    <Pagination
      count={totalPages}
      shape="rounded"
      onChange={handlePageChange}
    />
  </div>
)}

        </main>
      </div>
    </div>
  );
};

export default Products;
