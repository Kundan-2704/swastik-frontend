import React, { useEffect, useMemo } from "react";
import ProductCard from "../ProductCard";
import { useAppDispatch, useAppSelector } from "../../../../Redux Toolkit/Store";
import { getSimilarProducts } from "../../../../Redux Toolkit/Features/Customer/ProductSlice";
import { useLocation } from "react-router-dom";

interface SimilarProductsProps {
  categoryId?: string;
  currentProductId?: string;
}

const MAX_PRODUCTS = 10;

const SimilarProducts: React.FC<SimilarProductsProps> = ({
  categoryId,
  currentProductId,
}) => {
  const dispatch = useAppDispatch();

  const location = useLocation();

  const { similarProducts, products, loading } = useAppSelector(
    (state) => state.products
  );

  /* ========== FETCH CATEGORY BASED (TRY) ========== */
  useEffect(() => {
    if (categoryId) {
      dispatch(getSimilarProducts({ categoryId }));
    }
  }, [dispatch, categoryId, location.pathname]);

  /* ========== FINAL PRODUCTS LOGIC ========== */
  const finalProducts = useMemo(() => {
    // 1️⃣ category based (remove current)
    const categoryFiltered = similarProducts.filter(
      (p: any) => p._id !== currentProductId
    );

    if (categoryFiltered.length >= MAX_PRODUCTS) {
      return shuffle(categoryFiltered).slice(0, MAX_PRODUCTS);
    }

    // 2️⃣ fallback from products listing
    const fallback = products.filter(
      (p: any) =>
        p._id !== currentProductId &&
        !categoryFiltered.some((c: any) => c._id === p._id)
    );

    const combined = [...categoryFiltered, ...fallback];

    return shuffle(combined).slice(0, MAX_PRODUCTS);
  }, [similarProducts, products, currentProductId]);

  /* ========== LOADING ========== */
  if (loading && finalProducts.length === 0) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="h-[320px] w-full bg-gray-200 animate-pulse rounded-lg"
          />
        ))}
      </div>
    );
  }

  /* ========== EMPTY (VERY RARE) ========== */
  if (!finalProducts.length) {
    return (
      <p className="text-center text-gray-500 py-10">
        Recommended products will appear here
      </p>
    );
  }

  /* ========== UI ========== */
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-10 gap-x-4">
      {finalProducts.map((item: any) => (
        <div key={item._id} className="flex justify-center">
          <ProductCard item={item} />
        </div>
      ))}
    </div>
  );
};

export default SimilarProducts;

/* ========== HELPER ========== */
function shuffle(array: any[]) {
  return [...array].sort(() => 0.5 - Math.random());
}
