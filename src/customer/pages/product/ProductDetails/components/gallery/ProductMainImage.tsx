// import React from "react";

// const ProductMainImage = ({ product, gallery, imageRef, onOpen }: any) => {
//     if (!gallery) return null;

//     const {
//         zoomPos,
//         showLens,
//         setShowLens,
//         handleMouseMove,
//         handleTouchStart,
//         handleTouchEnd,
//     } = gallery;

//     return (
//         <div
//             className="w-full lg:w-[82%]"
//             onTouchStart={handleTouchStart}
//             onTouchEnd={handleTouchEnd}
//         >
//             <div
//                 className="relative rounded-2xl overflow-hidden bg-[#F8F3E8]
//         shadow-[0_10px_28px_rgba(0,0,0,0.18)]
//         aspect-[3/4] max-h-[620px] p-3"
//                 onMouseMove={handleMouseMove}
//                 onMouseEnter={() => setShowLens(true)}
//                 onMouseLeave={() => setShowLens(false)}
//             >
//                 <img
//                     ref={imageRef}
//                     src={product.images?.[gallery.current]}
//                     key={product.images?.[gallery.current]}   // 🔥 ADD THIS
//                     loading="eager"
//                     alt={product.title}
//                     className="w-full h-full object-contain cursor-zoom-in"
//                     onClick={onOpen}
//                     style={{
//                         transform: showLens ? "scale(1.6)" : "scale(1)",
//                         transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
//                         transition: "transform 0.25s ease-out",
//                     }}
//                 />

//                 {showLens && (
//                     <div
//                         className="absolute pointer-events-none border border-[#B9935A]
//             rounded-full w-32 h-32"
//                         style={{
//                             top: `${zoomPos.y}%`,
//                             left: `${zoomPos.x}%`,
//                             transform: "translate(-50%, -50%)",
//                             background: "rgba(255,255,255,0.2)",
//                             backdropFilter: "blur(2px)",
//                         }}
//                     />
//                 )}
//             </div>
//         </div>
//     );
// };

// export default ProductMainImage;





import React, { useState } from "react";
import DrapeViewer from "./DrapeViewer";

const ProductMainImage = ({ product, gallery, imageRef, onOpen }: any) => {
  if (!gallery) return null;

  const {
    zoomPos,
    showLens,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
    handleTouchStart,
    handleTouchEnd,
  } = gallery;

  const [showDrape, setShowDrape] = useState(false);

  return (
    <div
      className="w-full lg:w-[82%]"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        ref={imageRef}
        className="relative rounded-2xl overflow-hidden bg-[#F8F3E8]
          shadow-[0_10px_28px_rgba(0,0,0,0.18)]
          aspect-[3/4] max-h-[620px] p-3"
        onMouseMove={!showDrape ? handleMouseMove : undefined}
        onMouseEnter={!showDrape ? handleMouseEnter : undefined}
        onMouseLeave={!showDrape ? handleMouseLeave : undefined}
      >
        {/* Toggle Button */}
        {product.drapeImages?.length > 0 && (
          <button
            onClick={() => setShowDrape((p) => !p)}
            className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur
              px-4 py-1.5 rounded-full text-sm font-medium shadow"
          >
            {showDrape ? "Close Drape" : "View Drape"}
          </button>
        )}

        {/* MAIN VIEW */}
        {showDrape ? (
          <DrapeViewer images={product.drapeImages} />
        ) : (
          <>
            <img
              src={product.images?.[gallery.current]}
              key={product.images?.[gallery.current]}
              loading="eager"
              alt={product.title}
              className="w-full h-full object-contain cursor-zoom-in"
              onClick={onOpen}
              style={{
                transform: showLens ? "scale(1.6)" : "scale(1)",
                transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                transition: "transform 0.25s ease-out",
              }}
            />

            {/* Lens (desktop only) */}
            {showLens && (
              <div
                className="hidden lg:block absolute pointer-events-none border border-[#B9935A]
                  rounded-full w-32 h-32"
                style={{
                  top: `${zoomPos.y}%`,
                  left: `${zoomPos.x}%`,
                  transform: "translate(-50%, -50%)",
                  background: "rgba(255,255,255,0.2)",
                  backdropFilter: "blur(2px)",
                }}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductMainImage;
