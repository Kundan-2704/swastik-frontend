import React from "react";

const ProductStockStatus = ({ quantity }: { quantity: number }) => {
  return (
    <div className="text-sm font-semibold">
      {quantity <= 0 ? (
        <span className="text-red-600">Out of Stock</span>
      ) : quantity <= 5 ? (
        <span className="text-orange-600">
          Only {quantity} left!
        </span>
      ) : (
        <span className="text-green-600">In Stock</span>
      )}
    </div>
  );
};

export default ProductStockStatus;
