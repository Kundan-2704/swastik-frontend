import React from "react";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import AutorenewOutlinedIcon from "@mui/icons-material/AutorenewOutlined";

const BRAND = "#4A1F2A";

const TrustStrip: React.FC = () => {
  return (
    <div className="w-full bg-[#FFFCF7] border-b border-[#EADFCF]">

      <div
        className="
        w-full
        
        flex
        items-center
        justify-center
        
        flex-wrap
        
        gap-x-4
        gap-y-1
        
        px-3
        py-2
        
        text-[11px]
        sm:text-sm
        
        font-medium
      "
        style={{ color: BRAND }}
      >

        <div className="flex items-center gap-1 whitespace-nowrap">
          <LocalShippingOutlinedIcon sx={{ fontSize: 16 }} />
          Free Shipping
        </div>

        <span className="hidden sm:inline text-[#D8CFC2]">|</span>

        <div className="flex items-center gap-1 whitespace-nowrap">
          <PaymentsOutlinedIcon sx={{ fontSize: 16 }} />
          Cash on Delivery
        </div>

        <span className="hidden sm:inline text-[#D8CFC2]">|</span>

        <div className="flex items-center gap-1 whitespace-nowrap">
          <AutorenewOutlinedIcon sx={{ fontSize: 16 }} />
          Easy Returns
        </div>

      </div>

    </div>
  );
};

export default TrustStrip;