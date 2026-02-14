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
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

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
        background: "linear-gradient(135deg, #8B4A0F 0%, #C58B4E 45%, #E5B676 100%)",
        borderRadius: "999px",
        px: "40px",
        py: "14px",
        fontSize: "16px",
        fontWeight: 700,
        letterSpacing: "0.04em",
        boxShadow: "0 14px 32px rgba(139, 74, 15, 0.45)",
        textTransform: "none",
        transition: "all .35s ease",

        "&:hover": {
          background: "linear-gradient(135deg, #6E3608 0%, #A86C34 45%, #D49A54 100%)",
          boxShadow: "0 18px 40px rgba(139, 74, 15, 0.55)",
          transform: "translateY(-2px) scale(1.02)",
        },

        "&:active": {
          transform: "scale(0.98)",
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

<section className="w-full border-b border-[#ECDCC2] bg-[#FBF7F2] overflow-hidden">
  <div className="max-w-7xl mx-auto px-4 lg:px-20 py-12 lg:pt-16 lg:pb-20">

    {/* ================= MOBILE HERO ================= */}
    <div className="block lg:hidden relative mb-12">

      <div className="relative w-full h-[400px] rounded-3xl overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeImage}
            src={heroImages[activeImage].src}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: "center top" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent" />
      </div>

      <div className="absolute bottom-6 left-6 right-6 text-white">
        <h1 className="font-royal text-3xl font-semibold leading-tight mb-2">
          Authentic Kosa & Tussar Sarees
        </h1>

        <p className="text-sm text-white/90 mb-4">
          Handwoven by master artisans of Chhattisgarh
        </p>

        <PrimaryButton
          startIcon={<ArrowForwardIcon />}
          onClick={() => navigate("/products")}
          className="w-full py-3.5 text-base font-semibold shadow-xl"
        >
          Shop Handloom Collection
        </PrimaryButton>

        <p className="text-xs text-white/80 mt-2 text-center">
          ⭐ 4.9 Rated by 2,000+ customers
        </p>
      </div>
    </div>

    {/* ================= DESKTOP HERO ================= */}
    <div className="hidden lg:flex items-center gap-20">

      {/* LEFT CONTENT */}
      <motion.div
        className="w-1/2"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="font-royal text-6xl font-semibold leading-[1.05] text-[#3B302A] mb-6">
          Authentic Kosa & Tussar <br />
          Handloom Sarees
        </h1>

        <p className="text-xl font-light text-[#5A4A3C] mb-4 max-w-xl">
          Directly from the weavers of Chhattisgarh — each piece handwoven with
          tradition, patience and pride.
        </p>

        <p className="text-sm text-[#8A7A68] mb-8">
          ⭐ 4.9 Rated by 2,000+ handloom lovers
        </p>

        {/* TRUST PILLS */}
        <div className="flex flex-wrap gap-3 mb-10">
          {[
            "100% Handloom Certified",
            "Direct From Weavers",
            "GI Tagged Kosa Silk",
            "Pan India Delivery",
          ].map((text, i) => (
            <div
              key={i}
              className="px-4 py-2 bg-white/70 backdrop-blur-md border border-white/50
                         rounded-full text-sm text-[#5A4A3C] shadow-sm"
            >
              {text}
            </div>
          ))}
        </div>

        <PrimaryButton
          startIcon={<ArrowForwardIcon />}
          onClick={() => navigate("/products")}
          className="px-16 py-4 text-lg font-semibold shadow-2xl hover:scale-[1.05]"
        >
          Shop Handloom Sarees
        </PrimaryButton>

        <p className="text-xs tracking-[0.3em] uppercase text-[#8A7A68] mt-4">
          Limited artisan pieces • Small batch weaving
        </p>
      </motion.div>

      {/* RIGHT IMAGE (EDGE BLEED + STORYTELLING) */}
      <motion.div
        className="w-1/2 relative"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="relative w-[120%] h-[520px] -mr-32 rounded-l-3xl overflow-hidden shadow-2xl border border-[#E7D6BE]">

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
              transition={{ duration: 1.2 }}
            />
          </AnimatePresence>

          {/* STORY TEXT */}
          <motion.div
            key={activeImage + "-text"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-10 left-6 text-white/90  tracking-[0.35em] uppercase text-xs opacity-90
"
          >
            {activeImage === 0 ? "Woven by Hands" : "Worn with Pride"}
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent" />
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
