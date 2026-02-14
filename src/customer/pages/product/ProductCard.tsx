import React, { useEffect, useState, useRef } from "react";
import "./ProductCard.css";
import { useNavigate } from "react-router-dom";
import QuickViewModal from "./ProductDetails/QuickViewModal";
import { useMediaQuery } from "@mui/material";

/* ================= TYPES ================= */

interface SellerDetails {
  businessDetails?: {
    businessName?: string;
  };
}

interface Product {
  _id: string;
  title: string;
  category: any;
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
  const isMobile = useMediaQuery("(max-width:768px)");

  const images = item.images?.length
    ? item.images
    : ["/placeholder/product-placeholder.jpg"];

  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  /* ================= DESKTOP HOVER ================= */
  useEffect(() => {
    if (isMobile) return;
    if (!isHovered || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 1200);

    return () => clearInterval(interval);
  }, [isHovered, images.length, isMobile]);

  /* ================= MOBILE SWIPE ================= */
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) < 50) return;

    if (diff > 0) {
      // swipe left
      setCurrentImage((prev) =>
        prev === images.length - 1 ? prev : prev + 1
      );
    } else {
      // swipe right
      setCurrentImage((prev) => (prev === 0 ? prev : prev - 1));
    }

    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  /* ================= NAVIGATION ================= */
  const handleNavigate = () => {
    navigate(
      `/product-details/${item.category.categoryId}/${item.title
        .toLowerCase()
        .replace(/\s+/g, "-")}/${item._id}`
    );
  };

  return (
    <div className="group px-2 sm:px-4 transition-all duration-300">
      {/* IMAGE WRAPPER */}
      <div
        onMouseEnter={() => !isMobile && setIsHovered(true)}
        onMouseLeave={() => !isMobile && setIsHovered(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={handleNavigate}
        className="relative h-[420px] sm:h-[360px] overflow-hidden rounded-3xl bg-[#F8F3E8] shadow-md cursor-pointer group-hover:shadow-xl"
      >
        {/* BADGES */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
          {item.isHandloom && <span className="badge">Handloom</span>}
          {item.isNaturalDyed && (
            <span className="badge">Natural Dye</span>
          )}
          {item.isBestSeller && (
            <span className="badge badge-gold">Best Seller</span>
          )}
        </div>

        {/* WISHLIST */}
        <button
          className="absolute top-3 right-3 z-10 bg-white/90 rounded-full p-3 shadow transition hover:scale-110 active:scale-95"
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
    loading="lazy"
    className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ${
      isMobile ? "object-top" : "object-center"
    }`}
    style={{
      transform: `translateX(${(index - currentImage) * 100}%)`,
    }}
  />
))}

        {/* DOTS (MOBILE) */}
        {isMobile && images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
            {images.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 w-1.5 rounded-full ${
                  i === currentImage
                    ? "bg-white"
                    : "bg-white/50"
                }`}
              />
            ))}
          </div>
        )}

        {/* +PHOTOS HINT */}
        {isMobile && images.length > 1 && currentImage === 0 && (
          <span className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-0.5 rounded-full">
            +{images.length - 1}
          </span>
        )}

        {/* QUICK VIEW (DESKTOP ONLY) */}
        {!isMobile && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowQuickView(true);
            }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#4A1F2A] text-white text-sm px-4 py-1 rounded-full opacity-0 group-hover:opacity-100 transition"
          >
            Quick View
          </button>
        )}
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

        {/* RATING */}
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
          Pure handloom • Easy returns
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
