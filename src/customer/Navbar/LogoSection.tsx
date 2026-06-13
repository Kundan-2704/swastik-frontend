import React from "react";
import { IconButton } from "@mui/material";
import { Home, Menu } from "@mui/icons-material";
import Logo from "../../assets/swastik-logo.png";
import type { NavigateFunction } from "react-router-dom";

interface LogoSectionProps {
  isLarge: boolean;
  setMobileMenu: React.Dispatch<React.SetStateAction<boolean>>;
  navigate: NavigateFunction;
}

const LogoSection: React.FC<LogoSectionProps> = ({
  isLarge,
  setMobileMenu,
  navigate,
}) => {
  /* ✅ DESKTOP (UNCHANGED) */
  if (isLarge) {
    return (
      <div
        role="button"
        tabIndex={0}
        onClick={() => navigate("/")}
        className="flex items-center gap-3 cursor-pointer select-none"
      >
        <div className="w-10 h-10 rounded-full bg-white shadow-sm">
          <img
            src={Logo}
            alt="Swastik Logo"
            className="w-full h-full rounded-full object-cover"
            draggable={false}
          />
        </div>

        <div className="leading-tight">
          <h1 className="logo text-[1.7rem] text-[#4A1F2A] tracking-wide">
            Swastik
          </h1>

          <p className="text-[10px] uppercase tracking-[0.28em] text-[#A8824F]/70">
            Heritage Woven Luxury
          </p>
        </div>
      </div>
    );
  }

  /* ✅ MOBILE (PERFECT CENTERED) */
  return (
    <div className="grid grid-cols-3 items-center w-full">

      {/* LEFT → MENU */}
      <div>
        <IconButton
          onClick={() => setMobileMenu(true)}
          size="small"
          sx={{ padding: 0.5 }}
        >
          <Menu sx={{ color: "#B5933A", fontSize: 24 }} />
        </IconButton>
      </div>

      {/* CENTER → BRAND */}
      <div className="text-center">
        <h1
          role="button"
          onClick={() => navigate("/")}
          className="
            logo
            text-[2rem]   /* ✅ BIGGER */
            text-[#4A1F2A]
            tracking-[0.04em]
            whitespace-nowrap
          "
        >
          Swastik
        </h1>
      </div>

      {/* RIGHT → EMPTY SPACER (MAGIC 😂) */}
      <div />
    </div>
  );
};

export default LogoSection;