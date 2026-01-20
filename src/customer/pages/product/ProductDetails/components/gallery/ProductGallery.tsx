import React, { useState } from "react";
import ProductThumbnails from "./ProductThumbnails";
import ProductMainImage from "./ProductMainImage";
import ProductImageLightbox from "../../ProductImageLightbox";

interface Props {
  product: any;
  gallery: any;
  imageRef: React.RefObject<HTMLImageElement>;
}

const ProductGallery: React.FC<Props> = ({ product, gallery, imageRef }) => {
  const [openLightbox, setOpenLightbox] = useState(false);

  const [showDrape, setShowDrape] = useState(false);


  if (!product || !gallery) return null;

  return (
    <section className="flex flex-col lg:flex-row gap-5">
      <ProductThumbnails
        images={product.images || []}
        current={gallery.current}
        setCurrent={gallery.setCurrent}
      />

      <ProductMainImage
        product={product}
        gallery={gallery}
        imageRef={imageRef}
        onOpen={() => setOpenLightbox(true)}
      />

      <ProductImageLightbox
        images={product.images || []}
        open={openLightbox}
        index={gallery.current}
        onClose={() => setOpenLightbox(false)}
      />
    </section>
  );
};

export default ProductGallery;
