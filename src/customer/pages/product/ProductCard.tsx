import React, { useEffect, useState } from "react";
import "./ProductCard.css";
import { useNavigate } from "react-router-dom";
import QuickViewModal from "./ProductDetails/QuickViewModal";

/* ================= TYPES ================= */

interface SellerDetails {
  businessDetails?: {
    businessName?: string;
  };
}

interface Product {
  _id: string;
  title: string;
  category: string;
  description: string;
  images?: string[];
  sellingPrice: number;
  mrpPrice?: number;
  discountPercent?: number;
  isBestSeller?: boolean;
  isNaturalDyed?: boolean;
  isHandloom?: boolean;
  seller?: SellerDetails;
}

interface ProductCardProps {
  item: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
  const navigate = useNavigate();

  const images = item.images?.length
    ? item.images
    : ["/placeholder/product-placeholder.jpg"];

  const [currentImage, setCurrentImage] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [showQuickView, setShowQuickView] = useState(false);


  /* ================= IMAGE HOVER SLIDER ================= */
  useEffect(() => {
    if (!isHovered || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 1200);

    return () => clearInterval(interval);
  }, [isHovered, images.length]);

  /* ================= NAVIGATION ================= */
  // const handleNavigate = () => {
  //   navigate(
  //     `/product-details/${item.category}/${item.title}/${item._id}`
  //   );
  // };


const handleNavigate = () => {
  navigate(
    `/product-details/${item.category.categoryId}/${item.title
      .toLowerCase()
      .replace(/\s+/g, "-")}/${item._id}`
  );
};


  return (
    <div className="group px-4 transition-all duration-500">
      {/* IMAGE WRAPPER */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleNavigate}
        className="relative h-[360px] overflow-hidden rounded-2xl bg-[#F8F3E8] shadow-md cursor-pointer group-hover:shadow-xl"
      >
        {/* BADGES */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
          {item.isHandloom && (
            <span className="badge">Handloom</span>
          )}
          {item.isNaturalDyed && (
            <span className="badge">Natural Dye</span>
          )}
          {item.isBestSeller && (
            <span className="badge badge-gold">
              Best Seller
            </span>
          )}
        </div>

        {/* WISHLIST */}
        <button
          className="absolute top-3 right-3 z-10 bg-white/90 rounded-full p-2 shadow hover:scale-110 transition"
          onClick={(e) => e.stopPropagation()}
          aria-label="Add to wishlist"
        >
          ❤️
        </button>

        {/* IMAGES */}
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={item.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            style={{
              transform: `translateX(${(index - currentImage) * 100}%)`,
            }}
          />
        ))}

        {/* QUICK VIEW */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowQuickView(true);
          }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#4A1F2A] text-white text-sm px-4 py-1 rounded-full opacity-0 group-hover:opacity-100 transition"
        >
          Quick View
        </button>

      </div>

      {/* DETAILS */}
      <div className="pt-4 space-y-2">
        {/* BRAND */}
        <h3 className="font-semibold text-[#4A1F2A] text-sm uppercase tracking-wide">
          {item.seller?.businessDetails?.businessName ||
            "Swastik Handloom"}
        </h3>

        {/* DESCRIPTION */}
        <p className="text-sm text-[#5A4A3C] line-clamp-2">
          {item.description}
        </p>

        {/* RATING (TEMP) */}
        <div className="text-xs text-[#B5933A]">
          ★★★★☆ <span className="text-gray-400">(124)</span>
        </div>

        {/* PRICE */}
        <div className="flex items-center gap-3">
          <span className="font-bold text-lg text-[#4A1F2A]">
            ₹{item.sellingPrice}
          </span>

          {item.mrpPrice && (
            <span className="line-through text-gray-400">
              ₹{item.mrpPrice}
            </span>
          )}

          {item.discountPercent && item.discountPercent > 0 && (
            <span className="text-[#B5933A] font-semibold">
              {item.discountPercent}% Off
            </span>
          )}
        </div>

        {/* TRUST LINE */}
        <p className="text-xs text-[#8A7A66]">
          Handwoven by skilled artisans
        </p>
      </div>

      {showQuickView && (
        <QuickViewModal
          product={item}
          onClose={() => setShowQuickView(false)}
        />
      )}


    </div>
  );
};

export default ProductCard;
