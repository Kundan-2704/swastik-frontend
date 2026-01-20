import { Button } from "@mui/material";

interface Props {
  product: any;
  onBuy: () => void;
}

const MobileBottomBar: React.FC<Props> = ({ product, onBuy }) => {
  if (!product || product.quantity <= 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#E8DCC8] p-3 flex items-center justify-between lg:hidden">
      <div>
        <p className="text-xs text-gray-500">Price</p>
        <p className="font-semibold text-[#4A1F2A]">
          ₹{product.sellingPrice}
        </p>
      </div>

      <Button
        variant="contained"
        sx={{
          backgroundColor: "#4A1F2A",
          borderRadius: "999px",
          textTransform: "none",
          px: 4,
        }}
        onClick={onBuy}
      >
        Buy Now
      </Button>
    </div>
  );
};

export default MobileBottomBar;
