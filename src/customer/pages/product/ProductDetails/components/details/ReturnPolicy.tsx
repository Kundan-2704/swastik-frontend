import React from "react";
import { Shield } from "@mui/icons-material";

const ReturnPolicy = () => {
  return (
    <div className="mt-8 p-4 border border-[#E8DCC8] rounded-xl flex gap-3 bg-[#FFFCF7]">
      <Shield sx={{ color: "#B9935A" }} />
      <div>
        <p className="text-sm font-semibold text-[#4A1F2A]">
          Easy 7-Day Returns
        </p>
        <p className="text-xs text-[#7A6A58]">
          Return unused products within 7 days. Authenticity guaranteed.
        </p>
      </div>
    </div>
  );
};

export default ReturnPolicy;
