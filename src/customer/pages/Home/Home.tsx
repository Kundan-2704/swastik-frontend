import React, { useEffect } from "react";
import { motion } from "framer-motion";
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

  return (
    <main className="bg-[#F8F3E8]">

      <div className="w-full bg-gradient-to-r from-[#8B5E34] via-[#C58B4E] to-[#E5B676]
 text-white text-center py-1.5 text-sm font-medium backdrop-blur-sm">
        ⚠️ TEST MODE — Orders & payments are for demo purpose only
      </div>


      {/* ================= HERO SECTION ================= */}
      {loading ? (
        /* ================= SKELETON HERO ================= */
        <section className="w-full border-b border-[#ECDCC2]">
          <div className="max-w-7xl mx-auto px-4 lg:px-20 py-24 grid lg:grid-cols-2 gap-12">

            {/* LEFT SKELETON */}
            <div>
              <Skeleton
                variant="text"
                width="80%"
                height={60}
                sx={{ bgcolor: "#EFE6D8" }}
              />
              <Skeleton
                variant="text"
                width="60%"
                height={40}
                sx={{ bgcolor: "#EFE6D8" }}
              />
              <Skeleton
                variant="text"
                width="90%"
                height={30}
                sx={{ bgcolor: "#EFE6D8" }}
              />

              <Skeleton
                variant="rounded"
                width={180}
                height={48}
                sx={{ mt: 3, borderRadius: 999, bgcolor: "#EFE6D8" }}
              />
            </div>

            {/* RIGHT IMAGE SKELETON */}
            <Skeleton
              variant="rounded"
              width="100%"
              height={420}
              sx={{ borderRadius: "24px", bgcolor: "#EFE6D8" }}
            />
          </div>
        </section>
      ) : (
        /* ================= REAL HERO ================= */
        <section className="w-full border-b border-[#ECDCC2]">
          <div className="max-w-7xl mx-auto px-4 lg:px-20 py-12 lg:py-24 flex flex-col-reverse lg:flex-row items-center gap-12">

            {/* LEFT */}
            <div className="w-full lg:w-1/2">
              <motion.h1
                className="text-3xl md:text-5xl font-semibold text-[#3B302A] leading-tight mb-5"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                Pure Handloom <br />
                Kosa &amp; Tussar Sarees
              </motion.h1>

              <motion.p
                className="text-base md:text-xl text-[#5A4A3C] mb-7 max-w-xl"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.1 }}
              >
                Woven by skilled artisans of Chhattisgarh.
                Authentic, sustainable and timeless elegance.
              </motion.p>

              {/* TRUST BADGES */}
              <motion.div
                className="grid grid-cols-2 gap-3 mb-9 md:flex md:flex-wrap md:gap-5"
                initial="hidden"
                animate="show"
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.15 } },
                }}
              >
                {[
                  { icon: <VerifiedIcon fontSize="small" />, text: "100% Handloom Certified" },
                  { icon: <HandshakeIcon fontSize="small" />, text: "Direct From Weavers" },
                  { icon: <CurrencyRupeeIcon fontSize="small" />, text: "Cash on Delivery" },
                  { icon: <LocalShippingIcon fontSize="small" />, text: "Pan India Delivery" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-2 text-[#5A4A3C] text-sm font-medium"
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      show: { opacity: 1, y: 0 },
                    }}
                  >
                    {item.icon}
                    <span>{item.text}</span>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.4 }}
              >
                <PrimaryButton
                  onClick={() => navigate("/products")}
                >
                  Shop Sarees
                </PrimaryButton>

                <p className="text-xs text-[#8A7A68] mt-3">
                  Authentic handloom • Direct from weavers
                </p>


              </motion.div>
            </div>

            {/* RIGHT IMAGE */}
            <motion.div
              className="w-full lg:w-1/2 flex justify-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: "easeOut", delay: 0.25 }}
            >
              <div className="relative w-full max-w-md rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={AA}
                  alt="Handloom Weaver"
                  loading="lazy"
                  className="w-full h-[300px] md:h-[420px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
              </div>

            </motion.div>
          </div>
        </section>
      )}




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
