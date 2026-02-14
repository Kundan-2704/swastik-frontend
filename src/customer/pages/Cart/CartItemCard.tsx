import { Add, Close, Remove } from "@mui/icons-material";
import { Button, Divider, IconButton } from "@mui/material";
import { useAppDispatch } from "../../../Redux Toolkit/Store";
import {
  deleteCartItem,
  fetchCart,
  updateCartItem,
} from "../../../Redux Toolkit/Features/Customer/CartSlice";

const CartItemCard = ({ item }: any) => {
  const dispatch = useAppDispatch();

  // ✅ SAFETY: if product not loaded yet, do not crash
  if (!item || !item.product) return null;

  const handleUpdateQuantity = (quantity: number) => {
    const jwt = localStorage.getItem("jwt") || "";
    if (!jwt || quantity < 1) return;

    dispatch(
      updateCartItem({
        jwt,
        cartitemId: item._id,
        quantity,
      })
    ).then(() => {
      dispatch(fetchCart(jwt));
    });
  };

  const handleRemoveItem = () => {
    dispatch(
      deleteCartItem({
        jwt: localStorage.getItem("jwt") || "",
        cartitemId: item._id,
      })
    );
  };

  return (
    <div className="border border-[#E3D4B6] rounded-xl bg-[#FFFAF2] shadow-sm relative overflow-hidden">
      {/* ---------- ITEM AREA ---------- */}
      <div className="p-5 flex gap-4">
        {/* IMAGE */}
        <div>
          <img
            className="w-[95px] h-[110px] rounded-xl object-cover shadow-sm"
            src={item.product.images?.[0] || "/placeholder.png"}
            alt=""
          />
        </div>

        {/* DETAILS */}
        <div className="space-y-1.5">
          <h1 className="font-semibold text-lg text-[#4A1F2A]">
            Swastik Clothing
          </h1>

          <p className="text-[#5A4A3C] font-medium text-sm">
            {item.product.title || "Product details unavailable"}
          </p>

          <p className="text-xs text-[#7A6A58]">
            <strong>Sold by:</strong> Natural Lifestyle Products Pvt Ltd
          </p>

          <p className="text-xs text-[#4A1F2A]">
            <strong>7 days replacement</strong> available
          </p>

          <p className="text-sm text-[#7A6A58]">
            <strong>Quantity</strong>: {item.quantity}
          </p>
        </div>
      </div>

      {/* ---------- DIVIDER ---------- */}
      <Divider sx={{ borderColor: "#E3D4B6" }} />

      {/* ---------- BOTTOM AREA ---------- */}
      <div className="px-5 py-3 flex justify-between items-center">
        {/* QUANTITY CONTROL */}
        <div className="flex items-center gap-2 w-[140px] justify-between">
          <Button
            size="small"
            sx={{
              minWidth: "32px",
              height: "32px",
              borderRadius: "50%",
              borderColor: "#D3B58A",
              color: "#4A1F2A",
            }}
            variant="outlined"
            onClick={() => handleUpdateQuantity(item.quantity - 1)}
          >
            <Remove />
          </Button>

          <span className="px-3 font-semibold text-[#4A1F2A]">
            {item.quantity}
          </span>

          <Button
            size="small"
            sx={{
              minWidth: "32px",
              height: "32px",
              borderRadius: "50%",
              borderColor: "#D3B58A",
              color: "#4A1F2A",
            }}
            variant="outlined"
            onClick={() => handleUpdateQuantity(item.quantity + 1)}
          >
            <Add />
          </Button>
        </div>

        {/* PRICE */}
        <div>
          <p className="font-semibold text-[#4A1F2A] text-lg">
            ₹{(item.product.sellingPrice || 0) * item.quantity}
          </p>
        </div>
      </div>

      {/* ---------- REMOVE BUTTON ---------- */}
      <div className="absolute top-1.5 right-1.5">
        <IconButton
          sx={{
            backgroundColor: "#F2E7D9",
            color: "#4A1F2A",
            "&:hover": { backgroundColor: "#E8D9C5" },
          }}
          onClick={handleRemoveItem}
        >
          <Close />
        </IconButton>
      </div>
    </div>
  );
};

export default CartItemCard;
