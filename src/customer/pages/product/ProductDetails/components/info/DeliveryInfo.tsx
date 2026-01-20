import React from "react";
import { LocalShipping } from "@mui/icons-material";

const DeliveryInfo = () => {
  return (
    <div className="mt-5 p-3 border border-[#E8DCC8] rounded-xl bg-[#FDF9F2]">
      <div className="flex items-center gap-2">
        <LocalShipping sx={{ fontSize: 18, color: "#B9935A" }} />
        <p className="text-sm text-[#4A1F2A] font-medium">
          Delivery in 5–7 working days
        </p>
      </div>
      <p className="text-xs text-[#7A6A58] mt-1">
        Free delivery above ₹7000 | Easy returns
      </p>
    </div>
  );
};

export default DeliveryInfo;
