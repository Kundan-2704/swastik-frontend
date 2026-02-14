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




