import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@mui/material";

import Grid from "./Grid/Grid";
import HomeCategory from "./HomeCategory/HomeCategory";
import SareeCategory from "./SareeCategory/SareeCategory";
import Deal from "./Deal/Deal";

import StoreIcon from "@mui/icons-material/Store";
import VerifiedIcon from "@mui/icons-material/Verified";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import HandshakeIcon from "@mui/icons-material/Handshake";

import AA from "../../../assets/SK2.png";
import { useLocation } from "react-router-dom";

import Skeleton from "@mui/material/Skeleton";

import { useNavigate } from "react-router-dom";


import WeaverImage from "../../../assets/C2.png";
import ModelImage from "../../../assets/A1.png";


/* ================= PRIMARY BUTTON ================= */
interface PrimaryButtonProps {
  children: React.ReactNode;
  startIcon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
}




const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  startIcon,
  onClick,
  className = "",
  type = "button",
}) => {
  return (
    <Button
      type={type}
      startIcon={startIcon}
      onClick={onClick}
      variant="contained"
      className={className}
      sx={{
        background:
          "linear-gradient(135deg, #8B5E34 0%, #C58B4E 40%, #E5B676 100%)",
        borderRadius: "999px",
        px: "34px",
        py: "12px",
        fontSize: "15px",
        fontWeight: 600,
        boxShadow: "0 12px 28px rgba(139, 94, 52, 0.35)",
        textTransform: "none",
        "&:hover": {
          background:
            "linear-gradient(135deg, #6B4423 0%, #A86C34 40%, #D49A54 100%)",
        },
      }}
    >
      {children}
    </Button>
  );
};



const Home: React.FC = () => {

  const location = useLocation();

  const [loading, setLoading] = React.useState(true);


  const navigate = useNavigate();



  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // 🔥 force child refetch on route re-enter
  }, [location.pathname]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200); // simulate API
    return () => clearTimeout(timer);
  }, []);


  const heroImages = [
  {
    src: WeaverImage,
    position: "center",
  },
  {
    src: ModelImage,
    position: "top",
  },
];



const [activeImage, setActiveImage] = React.useState(0);

React.useEffect(() => {
  const interval = setInterval(() => {
    setActiveImage((prev) => (prev + 1) % heroImages.length);
  }, 4500);

  return () => clearInterval(interval);
}, []);





  return (
    <main className="bg-[#F8F3E8]">

      <div className="w-full bg-gradient-to-r from-[#8B5E34] via-[#C58B4E] to-[#E5B676]
 text-white text-center py-1.5 text-sm font-medium backdrop-blur-sm">
        ⚠️ TEST MODE — Orders & payments are for demo purpose only
      </div>


{/* ================= HERO SECTION ================= */}

<section className="w-full border-b border-[#ECDCC2] bg-[#FBF7F2]">
  <div className="max-w-7xl mx-auto px-4 lg:px-20 py-12 lg:py-24">

    {/* ================= MOBILE HERO ================= */}
    <div className="block lg:hidden relative mb-12">
      <div className="relative w-full h-[380px] rounded-3xl overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeImage}
            src={heroImages[activeImage].src}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: "center top" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      </div>

      <div className="absolute bottom-6 left-6 right-6 text-white">
        <h1 className="font-royal text-3xl font-semibold leading-tight mb-2">
          Woven by Hands, <br /> Worn with Pride
        </h1>

        <p className="font-body text-sm font-light text-white/90 mb-4">
          Authentic Kosa & Tussar handloom sarees crafted by master weavers of Chhattisgarh.
        </p>

        <PrimaryButton
          className="w-full text-base py-3 bg-[#C58A4A] text-white font-semibold
                     hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
          onClick={() => navigate("/products")}
        >
          Explore Collection
        </PrimaryButton>
      </div>
    </div>

    {/* ================= DESKTOP HERO ================= */}
    <div className="hidden lg:flex items-center gap-16">

      {/* LEFT CONTENT */}
      <motion.div
        className="w-1/2"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="font-royal text-6xl font-semibold leading-[1.05] tracking-royal text-[#3B302A] mb-6">
          Woven by Hands, <br /> Worn with Pride
        </h1>

        <p className="font-body text-xl font-light leading-relaxed text-[#5A4A3C] mb-8 max-w-xl">
          Discover authentic Kosa & Tussar handloom sarees, crafted by master artisans of
          Chhattisgarh. Each piece carries tradition, patience and pride.
        </p>

        <div className="grid grid-cols-2 gap-4 mb-10">
          {[
            { icon: <VerifiedIcon fontSize="small" />, text: "100% Handloom Certified" },
            { icon: <HandshakeIcon fontSize="small" />, text: "Direct From Weavers" },
            { icon: <CurrencyRupeeIcon fontSize="small" />, text: "Cash on Delivery" },
            { icon: <LocalShippingIcon fontSize="small" />, text: "Pan India Delivery" },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-2 bg-[#F7F1E8] px-4 py-3 rounded-xl
                         text-sm shadow-sm text-[#5A4A3C]"
            >
              {item.icon}
              <span className="font-body font-medium tracking-wide">
                {item.text}
              </span>
            </div>
          ))}
        </div>

        <PrimaryButton
          onClick={() => navigate("/products")}
          className="px-12 py-4 text-lg font-body font-semibold tracking-wider
                     bg-[#C58A4A] text-white rounded-full
                     hover:bg-[#B77A3A] hover:shadow-2xl hover:scale-[1.03]
                     transition-all duration-300"
        >
          Discover Handloom Collection
        </PrimaryButton>

        <p className="font-body text-xs tracking-[0.25em] uppercase text-[#8A7A68] mt-4">
          Limited artisan pieces • Made on traditional looms
        </p>
      </motion.div>

      {/* RIGHT IMAGE (AUTO FADE) */}
      <motion.div
        className="w-1/2 flex justify-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.2 }}
      >
        <div
          className="relative w-full max-w-lg h-[460px] rounded-3xl overflow-hidden shadow-2xl"
          style={{ border: "1px solid #E7D6BE" }}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={activeImage}
              src={heroImages[activeImage].src}
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                objectPosition:
                  heroImages[activeImage].position === "top"
                    ? "center top"
                    : "center center",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
          </AnimatePresence>

          <div className="absolute inset-0 shadow-inner pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
        </div>
      </motion.div>
    </div>
  </div>
</section>




      {/* ================= PREMIUM COLLECTION ================= */}
      <section className="py-16">

        {/* TITLE */}
        {loading ? (
          <div className="flex justify-center mb-10">
            <Skeleton
              variant="text"
              width={260}
              height={40}
              sx={{ bgcolor: "#EFE6D8" }}
            />
          </div>
        ) : (
          <h2 className="text-2xl md:text-3xl font-semibold text-[#4A1F2A] text-center mb-10">
            Premium Collections
          </h2>
        )}

        {/* CONTENT */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-4 lg:px-20">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton
                key={i}
                variant="rounded"
                height={320}
                sx={{
                  borderRadius: "16px",
                  bgcolor: "#EFE6D8",
                }}
              />
            ))}
          </div>
        ) : (
          <SareeCategory />
        )}

      </section>


      {/* ================= EXPLORE BY CRAFT ================= */}
      {/* ================= EXPLORE BY CRAFT ================= */}
      <section className="py-16">

        {/* TITLE */}
        {loading ? (
          <div className="flex justify-center mb-12">
            <Skeleton
              variant="text"
              width={260}
              height={40}
              sx={{ bgcolor: "#EFE6D8" }}
            />
          </div>
        ) : (
          <h2 className="text-2xl md:text-3xl font-semibold text-[#4A1F2A] text-center mb-12">
            Explore by Craft
          </h2>
        )}

        {/* GRID */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-4 lg:px-20">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton
                key={i}
                variant="rounded"
                height={220}
                sx={{
                  borderRadius: "16px",
                  bgcolor: "#EFE6D8",
                }}
              />
            ))}
          </div>
        ) : (
          <Grid />
        )}

      </section>


      {/* ================= TODAY'S DEAL ================= */}
      {/* ================= TODAY’S DEAL ================= */}
      <section className="pt-12">

        {/* TITLE */}
        {loading ? (
          <div className="flex justify-center pb-6">
            <Skeleton
              variant="text"
              width={200}
              height={40}
              sx={{ bgcolor: "#EFE6D8" }}
            />
          </div>
        ) : (
          <h2 className="text-3xl font-semibold text-[#4A1F2A] text-center pb-6">
            Today’s Deal
          </h2>
        )}

        {/* DEAL BANNER */}
        {loading ? (
          <div className="px-4 lg:px-20">
            <Skeleton
              variant="rounded"
              height={320}
              sx={{
                borderRadius: "24px",
                bgcolor: "#EFE6D8",
              }}
            />
          </div>
        ) : (
          <Deal />
        )}

      </section>


      {/* ================= SHOP BY CATEGORY ================= */}
      <section className="py-16 bg-[#F4EEDD]">

        {/* TITLE */}
        {loading ? (
          <div className="flex justify-center mb-12">
            <Skeleton
              variant="text"
              width={260}
              height={40}
              sx={{ bgcolor: "#EFE6D8" }}
            />
          </div>
        ) : (
          <h2 className="text-2xl md:text-3xl font-semibold text-[#4A1F2A] text-center mb-12">
            Shop by Category
          </h2>
        )}

        {/* CATEGORY GRID */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-4 lg:px-20">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton
                key={i}
                variant="rounded"
                height={260}
                sx={{
                  borderRadius: "16px",
                  bgcolor: "#EFE6D8",
                }}
              />
            ))}
          </div>
        ) : (
          <HomeCategory />
        )}

      </section>


      {/* ================= SELL WITH US ================= */}
      {/* <section className="px-4 lg:px-20 py-20">

        {loading ? (
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <Skeleton
              variant="rounded"
              height={420}
              sx={{
                borderRadius: "24px",
                bgcolor: "#EFE6D8",
              }}
            />

            <div className="absolute inset-0 flex items-center">
              <div className="pl-6 lg:pl-24 max-w-xl space-y-4">
                <Skeleton variant="text" width="80%" height={40} sx={{ bgcolor: "#E6DAC8" }} />
                <Skeleton variant="text" width="90%" height={30} sx={{ bgcolor: "#E6DAC8" }} />
                <Skeleton variant="rounded" width={200} height={48} sx={{ borderRadius: 999, bgcolor: "#E6DAC8" }} />
              </div>
            </div>
          </div>
        ) : (
         
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <img
              src={AA}
              alt="Sell Handcrafted Products"
              loading="lazy"
              className="w-full h-[280px] md:h-[380px] lg:h-[420px] object-cover brightness-75"
            />

            <div className="absolute inset-0 flex items-center">
              <div className="pl-6 lg:pl-24 max-w-xl">
                <h3 className="text-2xl md:text-4xl font-semibold text-[#FFF8ED] mb-4">
                  Sell Your Handcrafted Products
                </h3>

                <p className="text-lg md:text-xl text-[#FDEFD6] mb-8">
                  Join <span className="font-bold text-[#FBE3B0]">Swastik</span> and
                  reach customers across India.
                </p>

                <PrimaryButton startIcon={<StoreIcon />}>
                  Become a Seller
                </PrimaryButton>
              </div>
            </div>
          </div>
        )}

      </section> */}

      <section className="px-4 lg:px-20 py-20">
        {loading ? (
          /* ===== SKELETON BANNER ===== */
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <Skeleton
              variant="rounded"
              height={420}
              sx={{ borderRadius: "24px", bgcolor: "#EFE6D8" }}
            />
            <div className="absolute inset-0 flex items-center">
              <div className="pl-6 lg:pl-24 max-w-xl space-y-4">
                <Skeleton variant="text" width="80%" height={40} sx={{ bgcolor: "#E6DAC8" }} />
                <Skeleton variant="text" width="90%" height={30} sx={{ bgcolor: "#E6DAC8" }} />
                <Skeleton variant="rounded" width={220} height={52} sx={{ borderRadius: 999, bgcolor: "#E6DAC8" }} />
              </div>
            </div>
          </div>
        ) : (
          /* ===== REAL BANNER ===== */
          <div className="relative rounded-3xl overflow-hidden shadow-2xl group">

            {/* IMAGE */}
            <img
              src={AA}
              alt="Sell Handcrafted Products on Swastik"
              loading="lazy"
              className="w-full h-[300px] md:h-[380px] lg:h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* GRADIENT OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/35 to-transparent" />

            {/* CONTENT */}
            <div className="absolute inset-0 flex items-center">
              <div className="pl-6 pr-4 lg:pl-24 max-w-xl">

                <h3 className="text-2xl md:text-4xl font-semibold text-[#FFF8ED] mb-4 leading-tight">
                  Turn Your Craft Into Income
                </h3>

                <p className="text-base md:text-xl text-[#FDEFD6] mb-8 leading-relaxed">
                  Join <span className="font-bold text-[#FBE3B0]">Swastik</span> and sell
                  directly to customers across India.
                  <span className="block text-[#FBE3B0] text-sm md:text-base mt-1">
                    No middlemen • Fair pricing • Full support
                  </span>
                </p>

                <PrimaryButton
                  startIcon={<StoreIcon />}
                  className="px-8 py-3 text-base font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  Start Selling Today
                </PrimaryButton>

                <p className="text-xs text-[#EAD7B7] mt-4">
                  Free onboarding • Zero listing fee • Easy payouts
                </p>


              </div>
            </div>
          </div>
        )}
      </section>


    </main>
  );
};

export default Home;
