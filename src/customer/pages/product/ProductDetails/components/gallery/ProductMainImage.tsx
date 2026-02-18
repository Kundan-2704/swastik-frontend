




// import React from "react";

// interface Props {
//   product: {
//     images: string[];
//   };
//   gallery: any;
//   onOpen: () => void;
//   onHoverChange: (state: boolean) => void;
// }

// const isTouchDevice =
//   typeof window !== "undefined" &&
//   ("ontouchstart" in window || navigator.maxTouchPoints > 0);

// const ProductMainImage: React.FC<Props> = ({
//   product,
//   gallery,
//   onOpen,
//   onHoverChange,
// }) => {
//   if (!product?.images?.length) return null;

//   const src = product.images[gallery.current];

//   return (
//     <div className="w-full lg:w-[75%]">
//       <div
//        className="
//   relative
//   w-full
//   h-[520px]
//   lg:h-[680px]
//   overflow-hidden
//   rounded-2xl
//   bg-[#f6f4f1]
//   cursor-zoom-in
//   select-none
// "
//         // onClick={onOpen}
//         onClick={!isTouchDevice ? onOpen : undefined}
//         onMouseEnter={() => {
//           gallery.handleMouseEnter();
//           onHoverChange(true);
//         }}
//         onMouseLeave={() => {
//           gallery.handleMouseLeave();
//           onHoverChange(false);
//         }}
//         onMouseMove={gallery.handleMouseMove}
//         // onTouchStart={gallery.handleTouchStart}
//         // onTouchMove={gallery.handleTouchMove}
//         // onTouchEnd={gallery.handleTouchEnd}
//       >
//         <img
//           src={src}
//           alt="product"
//           draggable={false}
//           className="
//             w-full
//             h-full
//             object-cover
//             will-change-transform
//             transition-transform
//             duration-300
//             md:duration-300
//             duration-0
//           "
//           style={
//             gallery.isZooming
//               ? {
//                 transform: "scale(2)",
//                 transformOrigin: `${gallery.zoomPos.x}% ${gallery.zoomPos.y}%`,
//               }
//               : {
//                 transform: "none",
//                 objectPosition: "50% 8%",
//               }
//           }
//         />

//         {/* Zoom label */}
//         <span className="absolute bottom-4 right-4 bg-black/70 text-white text-xs px-3 py-1 rounded-full pointer-events-none">
//           Click to zoom
//         </span>
//       </div>
//     </div>
//   );
// };

// export default ProductMainImage;









import React from "react";
import optimizeImage from "../../../../../../Util/optimizeImage";

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
        <img
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
            /* ✅ Zoom ONLY on Desktop */
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

        {/* Zoom label */}
        {!isTouchDevice && (
          <span className="absolute bottom-4 right-4 bg-black/70 text-white text-xs px-3 py-1 rounded-full pointer-events-none">
            Click to zoom
          </span>
        )}
      </div>
    </div>
  );
};

export default ProductMainImage;