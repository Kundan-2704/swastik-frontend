import React from "react";
import { motion } from "framer-motion";
import { Button } from "@mui/material";

import VerifiedIcon from "@mui/icons-material/Verified";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import HandshakeIcon from "@mui/icons-material/Handshake";

import AA from "../../../assets/AA.jpg";

const HeroSection: React.FC = () => {
  return (
    <section className="w-full border-b border-[#ECDCC2]">
      <div
        className="
          max-w-7xl mx-auto
          px-4 lg:px-20
          py-12 lg:py-24
          flex flex-col-reverse lg:flex-row
          items-center gap-12
        "
      >
        {/* ================= LEFT CONTENT ================= */}
        <div className="w-full lg:w-1/2">

          {/* HEADING */}
          <motion.h1
            className="text-3xl md:text-5xl font-semibold text-[#3B302A] leading-tight mb-5"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Pure Handloom <br />
            Kosa &amp; Tussar Sarees
          </motion.h1>

          {/* SUB TEXT */}
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
            className="
              grid grid-cols-2 gap-3 mb-9
              md:flex md:flex-wrap md:gap-5
            "
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.15 } },
            }}
          >
            {[
              {
                icon: <VerifiedIcon fontSize="small" />,
                text: "100% Handloom Certified",
              },
              {
                icon: <HandshakeIcon fontSize="small" />,
                text: "Direct From Weavers",
              },
              {
                icon: <CurrencyRupeeIcon fontSize="small" />,
                text: "Cash on Delivery",
              },
              {
                icon: <LocalShippingIcon fontSize="small" />,
                text: "Pan India Delivery",
              },
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

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
          >
            <Button
              variant="contained"
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
              Shop Sarees
            </Button>
          </motion.div>
        </div>

        {/* ================= RIGHT IMAGE ================= */}
        <motion.div
          className="w-full lg:w-1/2 flex justify-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.9,
            ease: "easeOut",
            delay: 0.25,
          }}
        >
          <div className="w-full max-w-md rounded-3xl overflow-hidden shadow-2xl">
            <img
              src={AA}
              alt="Handloom Saree Model"
              loading="lazy"
              className="w-full h-[300px] md:h-[420px] object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
