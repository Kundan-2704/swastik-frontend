
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../Redux Toolkit/Store";
import { fetchSellerProduct } from "../../Redux Toolkit/Features/Seller/SellerProductSlice";

/* ================= TYPES ================= */

interface Color {
  name: string;
  hex: string;
  _id: string;
}

interface ProductDetails {
  blousePiece?: string;
  care?: string;
  fabric?: string;
  origin?: string;
  sareeLength?: string;
  weave?: string;
}

interface Delivery {
  estimatedDays: string;
  freeShippingAbove: number;
  codAvailable: boolean;
  returnDays: number;
}

interface Product {
  _id: string;
  title: string;
  description: string;
  craftStory?: string;
  category: string;
  seller: string;
  images: string[];
  colors: Color[];
  sizes: string[];
  details?: ProductDetails;
  delivery?: Delivery;
  mrpPrice: number;
  sellingPrice: number;
  discountPercent: number;
  quantity: number;
  inStock: boolean;
  createdAt: string;
}

/* ================= SMALL HELPER ================= */

const Detail: React.FC<{ label: string; value?: string | number }> = ({
  label,
  value,
}) => (
  <div>
    <p className="text-gray-500 text-xs capitalize">{label}</p>
    <p className="font-medium text-sm">{value ?? "-"}</p>
  </div>
);

/* ================= MAIN COMPONENT ================= */

const ProductView: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products, loading } = useAppSelector(
    (state) => state.sellerProduct
  ) as { products: Product[]; loading: boolean };

  const [search, setSearch] = useState("");

  /* ================= FETCH ================= */
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) dispatch(fetchSellerProduct(jwt));
  }, [dispatch]);

  /* ================= FILTER ================= */
  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-[#FFFCF7] min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold text-[#2B1B12]">
          All Products
        </h1>

        <input
          type="text"
          placeholder="Search product..."
          className="border rounded-lg px-4 py-2 text-sm w-72"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* CONTENT */}
      {loading ? (
        <p className="text-gray-500">Loading products...</p>
      ) : filteredProducts.length === 0 ? (
        <p className="text-gray-500">No products found</p>
      ) : (
        <div className="space-y-8">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white border rounded-xl p-6"
            >
              {/* TOP */}
              <div className="flex gap-6">
                {/* IMAGES */}
                <div className="grid grid-cols-2 gap-2 w-48">
                  {product.images.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={product.title}
                      className="h-28 w-full object-cover rounded-lg border"
                    />
                  ))}
                </div>

                {/* BASIC INFO */}
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">
                    {product.title}
                  </h2>

                  <p className="text-sm text-gray-600 mt-1">
                    {product.description}
                  </p>

                  <div className="flex gap-4 items-center mt-3">
                    <span className="text-lg font-semibold">
                      ₹{product.sellingPrice}
                    </span>
                    <span className="line-through text-sm text-gray-400">
                      ₹{product.mrpPrice}
                    </span>
                    <span className="text-sm text-green-600 font-medium">
                      {product.discountPercent}% OFF
                    </span>
                  </div>

                  <div className="text-sm text-gray-600 mt-2">
                    Quantity:{" "}
                    <span className="font-medium">
                      {product.quantity}
                    </span>
                  </div>

                  <div className="text-sm text-gray-600">
                    In Stock:{" "}
                    <span className="font-medium">
                      {product.inStock ? "Yes" : "No"}
                    </span>
                  </div>
                </div>
              </div>

              {/* COLORS & SIZES */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <Detail
                  label="Colors"
                  value={product.colors.map((c) => c.name).join(", ")}
                />
                <Detail
                  label="Sizes"
                  value={product.sizes.join(", ")}
                />
              </div>

              {/* CRAFT STORY */}
              {product.craftStory && (
                <div className="mt-5">
                  <p className="font-medium mb-1">Craft Story</p>
                  <p className="text-sm text-gray-600">
                    {product.craftStory}
                  </p>
                </div>
              )}

              {/* PRODUCT DETAILS (FIXED ERROR PART) */}
              {product.details && (
                <div className="mt-6">
                  <p className="font-medium mb-2">
                    Product Details
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                    {Object.entries(
                      product.details as Record<string, string>
                    ).map(([key, value]) =>
                      value ? (
                        <Detail
                          key={key}
                          label={key.replace(/([A-Z])/g, " $1")}
                          value={value}
                        />
                      ) : null
                    )}
                  </div>
                </div>
              )}

              {/* DELIVERY */}
              {product.delivery && (
                <div className="mt-6">
                  <p className="font-medium mb-2">Delivery</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <Detail
                      label="Estimated Days"
                      value={product.delivery.estimatedDays}
                    />
                    <Detail
                      label="Free Shipping Above"
                      value={`₹${product.delivery.freeShippingAbove}`}
                    />
                    <Detail
                      label="COD Available"
                      value={
                        product.delivery.codAvailable ? "Yes" : "No"
                      }
                    />
                    <Detail
                      label="Return Days"
                      value={product.delivery.returnDays}
                    />
                  </div>
                </div>
              )}

              {/* CREATED */}
              <div className="mt-6 text-xs text-gray-400">
                Created at:{" "}
                {new Date(product.createdAt).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductView;
