import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

import "yet-another-react-lightbox/styles.css";

type ProductImageLightboxProps = {
  images: string[];
  open: boolean;
  index: number;
  setIndex: (index: number) => void;   // ✅ IMPORTANT
  onClose: () => void;
};

const ProductImageLightbox: React.FC<ProductImageLightboxProps> = ({
  images,
  open,
  index,
  setIndex,
  onClose,
}) => {
  return (
    <Lightbox
      open={open}
      close={onClose}
      index={index}

      slides={images.map((img) => ({ src: img }))}

      plugins={[Zoom]}

      zoom={{
        maxZoomPixelRatio: 3,
        zoomInMultiplier: 2.2,
        wheelZoomDistanceFactor: 120,
        pinchZoomDistanceFactor: 120,
      }}

      /* ✅ THIS FIXES YOUR ISSUE */
      on={{
        view: ({ index }) => setIndex(index),
      }}

      controller={{
        closeOnPullDown: true,
        closeOnBackdropClick: true,
      }}

      animation={{
        swipe: 350,
        zoom: 350,
        fade: 250,
      }}

      styles={{
        container: {
          background:
            "linear-gradient(180deg, rgba(248,243,232,0.92), rgba(232,223,205,0.96))",
          backdropFilter: "blur(8px)",
        },
        image: {
          maxHeight: "88vh",
          borderRadius: "20px",
          boxShadow: "0 25px 60px rgba(80,60,30,0.35)",
        },
        slide: {
          padding: "40px",
        },
        button: {
          color: "#6B4E2E",
        },
      }}
    />
  );
};

export default ProductImageLightbox;