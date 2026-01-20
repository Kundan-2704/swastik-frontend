

import { ElectricBolt } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";

const OrderItemCard = ({ orderItem , order }) => {
  const navigate = useNavigate();

  if (!orderItem || !orderItem.product) return null;
  return (
    <div 
    onClick={()=>navigate(`/account/orders/${order._id}/item/${orderItem._id}`)}
    className="
      text-sm 
      bg-[#FFFDF8] 
      p-5 
      space-y-4 
      border border-[#E3D4B6] 
      rounded-xl 
      cursor-pointer 
      shadow-sm 
      hover:shadow-md 
      transition-all
    ">
      {/* TOP: STATUS */}
      <div className="flex items-center gap-3">
        <Avatar
          sx={{
            bgcolor: "#4A1F2A",
            width: 30,
            height: 30,
            fontSize: 18,
          }}
        >
          <ElectricBolt sx={{ fontSize: 18, color: "#FBE3B0" }} />
        </Avatar>

        <div>
          <h1 className="font-semibold text-[#4A1F2A] text-xs">
           {order.orderStatus}
          </h1>
          <p className="text-[#7A6A58] text-xs">
            Arriving by {order.deliveryDate}
          </p>
        </div>
      </div>

      {/* BOTTOM: PRODUCT SUMMARY */}
      <div className="p-4 bg-[#FFF9F1] gap-3 flex rounded-lg border border-[#EAD9BF]">
        <div>
          <img
            className={"w-[70px] rounded-md"}
            alt=""
            src={orderItem.product.images[0]}
          />
        </div>

        <div className="w-full space-y-1">
          <h1 className="font-semibold text-[#4A1F2A] text-sm">
            Swastik
          </h1>
          <p className="text-[#5A4A3C] text-xs">
            {orderItem.product.title}
          </p>
          <p className="text-[#7A6A58] text-xs">
            <strong>Size: </strong> FREE
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderItemCard;
