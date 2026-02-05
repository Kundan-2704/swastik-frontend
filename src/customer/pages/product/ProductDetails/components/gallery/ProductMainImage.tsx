// import React from "react";

// const ProductMainImage = ({
//   product,
//   gallery,
//   onOpen,
//   onHoverChange,
// }: any) => {
//   if (!product?.images?.length) return null;

//   const src = product.images[gallery.current];

//   return (
//     <div className="w-full lg:w-[75%]">
//       <div
//         className="
//           relative
//           aspect-[4/5]
//           max-h-[600px]
//           overflow-hidden
//           rounded-2xl
//           bg-[#f6f4f1]
//           cursor-zoom-in
//         "
//         onClick={onOpen}
//         onMouseEnter={() => {
//           gallery.handleMouseEnter();
//           onHoverChange(true);
//         }}
//         onMouseLeave={() => {
//           gallery.handleMouseLeave();
//           onHoverChange(false);
//         }}
//         onMouseMove={gallery.handleMouseMove}


//   onTouchStart={gallery.handleTouchStart}
//   onTouchMove={gallery.handleTouchMove}
//   onTouchEnd={gallery.handleTouchEnd}
//       >
//         <img
//           src={src}
//           alt="product"
//           className="w-full h-full object-cover transition-transform duration-300"
//           style={
//             gallery.isZooming
//               ? {
//                   /* 🔍 ZOOM STATE */
//                   transform: "scale(2)",
//                   transformOrigin: `${gallery.zoomPos.x}% ${gallery.zoomPos.y}%`,
//                 }
//               : {
//                   /* 🧍 NORMAL STATE (HEAD SAFE) */
//                   transform: "none",          // ❗ important
//                   objectPosition: "50% 8%",   // ❗ top-focused crop
//                 }
//           }
//         />

//         <span className="absolute bottom-4 right-4 bg-black/70 text-white text-xs px-3 py-1 rounded-full pointer-events-none">
//           Click to zoom
//         </span>
//       </div>
//     </div>
//   );
// };

// export default ProductMainImage;





import React from "react";

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

  const src = product.images[gallery.current];

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
  touch-none
  select-none
"
        onClick={onOpen}
        onMouseEnter={() => {
          gallery.handleMouseEnter();
          onHoverChange(true);
        }}
        onMouseLeave={() => {
          gallery.handleMouseLeave();
          onHoverChange(false);
        }}
        onMouseMove={gallery.handleMouseMove}
        onTouchStart={gallery.handleTouchStart}
        onTouchMove={gallery.handleTouchMove}
        onTouchEnd={gallery.handleTouchEnd}
      >
        <img
          src={src}
          alt="product"
          draggable={false}
          className="
            w-full
            h-full
            object-cover
            will-change-transform
            transition-transform
            duration-300
            md:duration-300
            duration-0
          "
          style={
            gallery.isZooming
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
        <span className="absolute bottom-4 right-4 bg-black/70 text-white text-xs px-3 py-1 rounded-full pointer-events-none">
          Click to zoom
        </span>
      </div>
    </div>
  );
};

export default ProductMainImage;
