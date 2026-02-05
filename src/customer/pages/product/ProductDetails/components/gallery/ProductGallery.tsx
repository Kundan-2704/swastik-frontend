import React, { useEffect, useState } from "react";
import ProductThumbnails from "./ProductThumbnails";
import ProductMainImage from "./ProductMainImage";
import { useImageZoom } from "../../hooks/useImageZoom";
import ProductImageLightbox from "../../ProductImageLightbox";

// const SLIDE_INTERVAL = 3000;

const ProductGallery = ({ product }: any) => {
  const [current, setCurrent] = useState(0);
  const [openLightbox, setOpenLightbox] = useState(false);
  const [pauseSlide, setPauseSlide] = useState(false);

  const zoom = useImageZoom();

  // useEffect(() => {
  //   if (pauseSlide || !product?.images?.length) return;

  //   const id = setInterval(() => {
  //     setCurrent((prev) => (prev + 1) % product.images.length);
  //   }, SLIDE_INTERVAL);

  //   return () => clearInterval(id);
  // }, [pauseSlide, product]);

  const gallery = {
    current,
    setCurrent,
    ...zoom,
  };

  if (!product) return null;

  return (
    <section className="flex flex-col lg:flex-row gap-10">
      <ProductThumbnails
        images={product.images}
        current={current}
        setCurrent={setCurrent}
      />

      <ProductMainImage
        product={product}
        gallery={gallery}
        onOpen={() => setOpenLightbox(true)}
        onHoverChange={setPauseSlide} // 🔥 pause slide on hover
      />

      {openLightbox && (
  <ProductImageLightbox
        images={product.images || []}
        open={openLightbox}
        index={gallery.current}
        onClose={() => setOpenLightbox(false)}
  />
)}

    </section>
  );
};

export default ProductGallery;







// import React, { useState } from "react";
// import ProductThumbnails from "./ProductThumbnails";
// import ProductImageLightbox from "../../ProductImageLightbox";
// import LensProductImage from "./LensProductImage";

// const ProductGallery = ({ product }: any) => {
//   const [current, setCurrent] = useState(0);
//   const [openLightbox, setOpenLightbox] = useState(false);

//   if (!product?.images?.length) return null;

//   return (
//     <section className="flex flex-col lg:flex-row gap-10">
//       {/* Thumbnails */}
//       <ProductThumbnails
//         images={product.images}
//         current={current}
//         setCurrent={setCurrent}
//       />

//       {/* 🔍 Lens Zoom Main Image */}
//       <div onClick={() => setOpenLightbox(true)}>
//         <LensProductImage src={product.images[current]} />
//       </div>

//       {/* Lightbox */}
//       {openLightbox && (
//         <ProductImageLightbox
//           images={product.images}
//           open={openLightbox}
//           index={current}
//           onClose={() => setOpenLightbox(false)}
//         />
//       )}
//     </section>
//   );
// };

// export default ProductGallery;
