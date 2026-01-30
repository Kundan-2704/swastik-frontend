import { Drawer, Button, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";

type Props = {
  open: boolean;
  onClose: () => void;
  product: any;
  quantity: number;
};

const MiniCartDrawer = ({ open, onClose, product, quantity }: Props) => {
  const navigate = useNavigate();

  if (!product) return null;

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <div className="w-[340px] p-5 flex flex-col h-full bg-[#F6F1E8]">
        <h2 className="text-lg font-semibold mb-3 text-[#4A1F2A]">Added to Cart</h2>

        <div className="flex gap-3 items-center">
          <img
            src={product.images?.[0]}
            alt={product.title}
            className="w-20 h-24 object-cover rounded"
          />

          <div className="flex-1">
            <p className="text-sm font-medium line-clamp-2">
              {product.title}
            </p>
            <p className="text-sm text-gray-600">Qty: {quantity}</p>
            <p className="text-sm font-semibold mt-1">₹{product.sellingPrice}</p>
          </div>
        </div>

        <Divider sx={{ my: 3, borderColor: "#E5D7C3" }} />

       <div className="mt-auto flex flex-col gap-3">

          <Button
            variant="contained"
            fullWidth
            onClick={() => navigate("/cart")}
            sx={{
              borderRadius: 999,
              textTransform: "none",
              backgroundColor: "#4A1F2A",
              fontWeight: 600,
            }}
          >
            View Cart
          </Button>

          <Button
            variant="outlined"
            fullWidth
            onClick={() => navigate("/checkout")}
            sx={{
              borderRadius: 999,
              textTransform: "none",
              borderColor: "#4A1F2A",
              color: "#4A1F2A",
              fontWeight: 600,
            }}
          >
            Checkout
          </Button>
        </div>
      </div>
    </Drawer>
  );
};

export default MiniCartDrawer;
