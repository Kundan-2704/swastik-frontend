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

      <div className="flex justify-center gap-2 mt-4 lg:hidden">
  {product.images?.map((_: any, index: number) => (
    <button
      key={index}
      onClick={() => setCurrent(index)}
      className={`
        h-2.5 rounded-full transition-all duration-300
        ${
          current === index
            ? "w-6 bg-[#3b1f1f]"   // active dot (premium)
            : "w-2.5 bg-gray-300"
        }
      `}
    />
  ))}
</div>


      {openLightbox && (
  <ProductImageLightbox
        images={product.images || []}
        open={openLightbox}
        index={gallery.current}
        setIndex={setCurrent}
        onClose={() => setOpenLightbox(false)}
  />
)}

    </section>
  );
};

export default ProductGallery;




