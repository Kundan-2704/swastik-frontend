import React from "react";
import SimilarProducts from "../SimilarProducts";

const SimilarProductsSection = ({ product }: any) => {
  if (!product) return null;

  return (
    <section className="mt-20">
      <h1 className="text-lg font-semibold text-[#4A1F2A]">
        Similar Products
      </h1>

      <div className="pt-5">
        <SimilarProducts
          categoryId={
            typeof product.category === "object"
              ? product.category._id
              : product.category
          }
          currentProductId={product._id}
        />
      </div>
    </section>
  );
};

export default SimilarProductsSection;
