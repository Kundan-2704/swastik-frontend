import React from "react";
import optimizeImage from "../../../../../../Util/optimizeImage";
import { motion, AnimatePresence  } from "framer-motion";


interface Props {
  product: {
    images: string[];
  };
  gallery: any;
  onOpen: () => void;
  onHoverChange: (state: boolean) => void;
}

const ProductMainImage: React.FC<Props> = ({
  product,
  gallery,
  onOpen,
  onHoverChange,
}) => {
  if (!product?.images?.length) return null;

  // const src = product.images[gallery.current];
  const src = optimizeImage(product.images[gallery.current], 800);


  // ✅ Detect touch device
  const isTouchDevice =
    typeof window !== "undefined" &&
    ("ontouchstart" in window || navigator.maxTouchPoints > 0);

  // ✅ Tap detection refs (INSIDE COMPONENT)
  const touchStart = React.useRef(0);
  const touchMoved = React.useRef(false);


  const swipeConfidenceThreshold = 80;

const handleDragEnd = (event: any, info: any) => {
  if (info.offset.x < -swipeConfidenceThreshold) {
    gallery.setCurrent((prev: number) =>
      prev < product.images.length - 1 ? prev + 1 : prev
    );
  }

  if (info.offset.x > swipeConfidenceThreshold) {
    gallery.setCurrent((prev: number) =>
      prev > 0 ? prev - 1 : prev
    );
  }
};


const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0.4,
    scale: 0.98,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0.4,
    scale: 0.98,
  }),
};


  return (
    <div className="w-full lg:w-[75%]">
      <div
        className="
          relative
          w-full
          h-[520px]
          lg:h-[680px]
          overflow-hidden
          rounded-2xl
          bg-[#f6f4f1]
          cursor-zoom-in
          select-none
        "
        /* ✅ Desktop Click */
        onClick={!isTouchDevice ? onOpen : undefined}

        /* ✅ Desktop Hover Zoom */
        onMouseEnter={() => {
          if (!isTouchDevice) {
            gallery.handleMouseEnter();
            onHoverChange(true);
          }
        }}
        onMouseLeave={() => {
          if (!isTouchDevice) {
            gallery.handleMouseLeave();
            onHoverChange(false);
          }
        }}
        onMouseMove={!isTouchDevice ? gallery.handleMouseMove : undefined}

        /* ✅ Mobile Tap Detection */
        onTouchStart={() => {
          touchStart.current = Date.now();
          touchMoved.current = false;
        }}
        onTouchMove={() => {
          touchMoved.current = true;
        }}
        onTouchEnd={() => {
          const touchDuration = Date.now() - touchStart.current;

          // Real tap (not swipe)
          if (!touchMoved.current && touchDuration < 200) {
            onOpen(); // ✅ Open lightbox
          }
        }}
      >
        {/* <img
          src={src}
          alt="product"
          loading="eager"
          draggable={false}
          className="
            w-full
            h-full
            object-cover
            will-change-transform
            transition-transform
            duration-300
          "
          style={
            !isTouchDevice && gallery.isZooming
              ? {
                  transform: "scale(2)",
                  transformOrigin: `${gallery.zoomPos.x}% ${gallery.zoomPos.y}%`,
                }
              : {
                  transform: "none",
                  objectPosition: "50% 8%",
                }
          }
        />

        {!isTouchDevice && (
          <span className="absolute bottom-4 right-4 bg-black/70 text-white text-xs px-3 py-1 rounded-full pointer-events-none">
            Click to zoom
          </span>
        )} */}

<AnimatePresence mode="wait" custom={gallery.current}>
  <motion.div
    key={gallery.current}

    drag={isTouchDevice ? "x" : false}
    dragConstraints={{ left: 0, right: 0 }}
    dragElastic={0.25}
    onDragEnd={handleDragEnd}

    variants={variants}
    initial="enter"
    animate="center"
    exit="exit"
    transition={{
      duration: isTouchDevice ? 0.28 : 0.18,
      ease: [0.22, 1, 0.36, 1],
    }}

    className="absolute inset-0"
  >
    {/* ✅ ZOOM LAYER (separate transform) */}
    <div
      className="w-full h-full transition-transform duration-300"
      style={
        !isTouchDevice && gallery.isZooming
          ? {
              transform: "scale(2)",
              transformOrigin: `${gallery.zoomPos.x}% ${gallery.zoomPos.y}%`,
            }
          : {
              transform: "scale(1)",
            }
      }
    >
      <img
        src={src}
        alt="product"
        draggable={false}
        className="w-full h-full object-cover"
        style={{ objectPosition: "50% 8%" }}
      />
    </div>
  </motion.div>
</AnimatePresence>


      </div>
    </div>
  );
};

export default ProductMainImage;