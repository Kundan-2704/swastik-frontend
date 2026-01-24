import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { useParams } from "react-router-dom";
import {
  Divider,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  AddShoppingCart,
  CheckCircle,
  Favorite,
} from "@mui/icons-material";

import { useAppDispatch, useAppSelector } from "../../../../Redux Toolkit/Store";
import { fetchProductById } from "../../../../Redux Toolkit/Features/Customer/ProductSlice";
import { addItemToCart } from "../../../../Redux Toolkit/Features/Customer/CartSlice";

import ProductGallery from "./components/gallery/ProductGallery";
import ProductHeader from "./components/info/ProductHeader";
import ProductPrice from "./components/info/ProductPrice";
import ProductStockStatus from "./components/info/ProductStockStatus";
import ProductTrustBadges from "./components/info/ProductTrustBadges";
import DeliveryInfo from "./components/info/DeliveryInfo";

import ColorSelector from "./components/selectors/ColorSelector";
import QuantitySelector from "./components/selectors/QuantitySelector";

import ProductDescription from "./components/details/ProductDescription";
import ProductSpecs from "./components/details/ProductSpecs";
import CraftStory from "./components/details/CraftStory";
import ReturnPolicy from "./components/details/ReturnPolicy";
import FAQ from "./components/details/FAQ";
import Reviews from "./components/details/Reviews";

import SimilarProductsSection from "./components/SimilarProductsSection";
import MobileBottomBar from "./components/action/MobileBottomBar";
import { useProductGallery } from "./hooks/useProductGallery";
import ProductDetailsSkeleton from "./components/skeletons/ProductDetailsSkeleton";
import MiniCartDrawer from "./components/cart/MiniCartDrawer";
import StickyDesktopCTA from "./components/action/StickyDesktopCTA";

/* ================= CONSTANTS ================= */
const BRAND_COLOR = "#4A1F2A";
const SUCCESS_COLOR = "#2E7D32";

/* ================= TYPES ================= */
type Color = {
  name: string;
  code: string;
};

const ProductDetails: React.FC = () => {
  const { productId } = useParams();
  const dispatch = useAppDispatch();

  const product = useAppSelector((s) => s.products.product);
  const isLoading = useAppSelector((s) => s.products.loading);

  /* ================= STATE ================= */
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);

  const [cartOpen, setCartOpen] = useState(false);

  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const galleryEndRef = useRef<HTMLDivElement>(null);


  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const [toast, setToast] = useState<{
    open: boolean;
    msg: string;
    type: "success" | "error";
  }>({
    open: false,
    msg: "",
    type: "success",
  });

  /* ================= AUTH ================= */
  const jwt = useMemo(() => localStorage.getItem("jwt"), []);

  /* ================= FETCH ================= */
  useEffect(() => {
    if (productId) dispatch(fetchProductById(productId));
  }, [productId, dispatch]);

  /* ================= RESET ON PRODUCT CHANGE ================= */
  useEffect(() => {
    setQuantity(1);
    setSelectedColor(null);
  }, [productId]);

  useEffect(() => {
    const onScroll = () => {
      if (!galleryEndRef.current) return;

      const rect = galleryEndRef.current.getBoundingClientRect();
      setShowStickyCTA(rect.bottom < 0);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);


  /* ================= GALLERY ================= */
  const gallery = useProductGallery(product);

  /* ================= TOAST HELPERS ================= */
  const showToast = useCallback(
    (msg: string, type: "success" | "error" = "success") => {
      setToast({ open: true, msg, type });
    },
    []
  );

  /* ================= FLY TO CART ================= */
  const flyToCart = useCallback(() => {
    const img = gallery.imageRef.current;
    const cartIcon = document.getElementById("cart-icon");

    if (!img || !cartIcon) return;

    const imgRect = img.getBoundingClientRect();
    const cartRect = cartIcon.getBoundingClientRect();
    const flyingImg = img.cloneNode(true) as HTMLImageElement;

    Object.assign(flyingImg.style, {
      position: "fixed",
      left: `${imgRect.left}px`,
      top: `${imgRect.top}px`,
      width: `${imgRect.width}px`,
      height: `${imgRect.height}px`,
      borderRadius: "14px",
      pointerEvents: "none",
      zIndex: "2147483647",
      transition:
        "transform 1s cubic-bezier(0.22, 1, 0.36, 1), opacity 1s ease-out",
    });

    document.body.appendChild(flyingImg);

    const translateX =
      cartRect.left + cartRect.width / 2 -
      (imgRect.left + imgRect.width / 2);
    const translateY =
      cartRect.top + cartRect.height / 2 -
      (imgRect.top + imgRect.height / 2);

    requestAnimationFrame(() => {
      flyingImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(0.3)`;
      flyingImg.style.opacity = "0.35";
    });

    setTimeout(() => flyingImg.remove(), 1200);
  }, [gallery.imageRef]);

  /* ================= ADD TO CART ================= */
  const handleAddCartItem = useCallback(async () => {
    if (adding || added) return;

    if (!jwt) return showToast("Please login first", "error");
    if (!product) return;

    try {
      setAdding(true);

      await dispatch(
        addItemToCart({
          jwt,
          request: {
            productId: product._id,
            quantity,
            color: selectedColor?.name,
          },
        })
      ).unwrap();

      flyToCart();
      setAdded(true);
      showToast("Added to cart", "success");

      setCartOpen(true);


      setTimeout(() => setAdded(false), 1200);
    } catch (err: any) {
      showToast(err?.message || "Failed to add item", "error");
    } finally {
      setAdding(false);
    }
  }, [
    adding,
    added,
    jwt,
    product,
    quantity,
    selectedColor,
    dispatch,
    flyToCart,
    showToast,
  ]);

  /* ================= LOADING ================= */
  if (!product) {
    return <ProductDetailsSkeleton />;
  }


  return (
    <div className="min-h-screen px-5 lg:px-20 pt-10 bg-[#FFFCF7]">
      <div
        ref={galleryEndRef}
        className="grid grid-cols-1 lg:grid-cols-2 gap-10"
      >
        <ProductGallery
          product={product}
          gallery={gallery}
          imageRef={gallery.imageRef}
          
        />

      <section className="space-y-6">

  {/* 1️⃣ PRODUCT HEADER */}
  <ProductHeader product={product} />

  {/* 2️⃣ PRICE (decision trigger) */}
  <ProductPrice product={product} />

  {/* 3️⃣ STOCK STATUS */}
  <ProductStockStatus quantity={product.quantity} />

  {/* 4️⃣ DELIVERY (important but not blocking) */}
 <div className="mt-4 border border-[#EADFCF] rounded-xl p-3">
  <DeliveryInfo />
</div>

  

<div className="w-full">

  {/* ================= COLOR + QUANTITY ================= */}
  <div
    className="
      flex flex-col
      gap-4
      md:flex-row
      md:items-end
      md:gap-8
    "
  >
    {/* COLOR */}
    <div className="w-full md:flex-1">
      <ColorSelector
        colors={product.colors}
        color={selectedColor}
        setColor={setSelectedColor}
      />
    </div>

    {/* QUANTITY */}
    <div className="w-full md:flex-1">
      <QuantitySelector
        quantity={quantity}
        setQuantity={setQuantity}
      />
    </div>
  </div>

</div>



  {/* ================= CTA ZONE ================= */}
  <div className="mt-8 flex flex-col md:flex-row gap-4">

    {/* PRIMARY CTA */}
    <Button
      startIcon={
        added ? (
          <CheckCircle />
        ) : adding ? (
          <CircularProgress size={18} />
        ) : (
          <AddShoppingCart />
        )
      }
      variant="contained"
      fullWidth
      disabled={adding || added}
      onClick={handleAddCartItem}
      sx={{
        py: "0.95rem",
        backgroundColor: added ? SUCCESS_COLOR : BRAND_COLOR,
        borderRadius: "999px",
        textTransform: "none",
        fontWeight: 700,
        fontSize: "1rem",
        boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
        "&:hover": {
          backgroundColor: added ? SUCCESS_COLOR : BRAND_COLOR,
        },
      }}
    >
      {added ? "Added to Bag" : adding ? "Adding..." : "Add to Bag"}
    </Button>

    {/* SECONDARY CTA */}
    <Button
      startIcon={<Favorite />}
      variant="outlined"
      fullWidth
      sx={{
        py: "0.95rem",
        borderRadius: "999px",
        borderColor: "#B9935A",
        color: BRAND_COLOR,
        textTransform: "none",
        fontWeight: 600,
        "&:hover": {
          backgroundColor: "#FBF7F2",
        },
      }}
    >
      Wishlist
    </Button>
  </div>

  {/* ================= DESCRIPTION ================= */}
  <div className="pt-4">
    <ProductDescription description={product.description} />
  </div>

  {/* ================= TRUST ================= */}
  <div className="mt-4 border-t border-[#EADFCF] pt-4">
  <ProductTrustBadges />
</div>


</section>

      </div>

      <Divider />

      <ProductSpecs details={product.details} />
      
      <CraftStory story={product.craftStory} />
      <ReturnPolicy />
      <FAQ />
      <Reviews />
      <SimilarProductsSection product={product} />
      <MobileBottomBar product={product} onBuy={handleAddCartItem} />


      <StickyDesktopCTA
        visible={showStickyCTA}
        price={product.sellingPrice}
        onAdd={handleAddCartItem}
        disabled={adding}
      />


      <Snackbar
        open={toast.open}
        autoHideDuration={2000}
        onClose={() => setToast({ ...toast, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={toast.type}
          sx={{ borderRadius: 999 }}
          onClose={() => setToast({ ...toast, open: false })}
        >
          {toast.msg}
        </Alert>
      </Snackbar>

      <MiniCartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        product={product}
        quantity={quantity}
      />


    </div>
  );
};

export default ProductDetails;
