import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const ProductImageLightbox = ({ images, open, index, onClose }) => {
  return (
    <Lightbox
      open={open}
      close={onClose}
      index={index}
      slides={images.map((img) => ({ src: img }))}

      controller={{ closeOnPullDown: true }}
      animation={{ swipe: 300 }}

      styles={{
        /* 🌾 Background – warm & premium */
        container: {
          background:
            "linear-gradient(180deg, rgba(248,243,232,0.92), rgba(232,223,205,0.96))",
          backdropFilter: "blur(6px)",
        },

        /* 🖼 Image styling */
        image: {
          maxHeight: "88vh",
          borderRadius: "20px",
          boxShadow: "0 25px 60px rgba(80,60,30,0.35)",
        },

        slide: {
          padding: "40px",
        },

        /* ❌ Close button */
        button: {
          color: "#6B4E2E",
        },
      }}
    />
  );
};

export default ProductImageLightbox;
