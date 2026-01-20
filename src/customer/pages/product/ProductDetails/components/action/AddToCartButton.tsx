import {
  AddShoppingCart,
  CheckCircle,
} from "@mui/icons-material";
import { Button, CircularProgress } from "@mui/material";

interface Props {
  product: any;
  addToCart: () => void;
  adding: boolean;
  added: boolean;
}

const AddToCartButton: React.FC<Props> = ({
  product,
  addToCart,
  adding,
  added,
}) => {
  return (
    <Button
      startIcon={
        added ? (
          <CheckCircle />
        ) : adding ? (
          <CircularProgress size={18} color="inherit" />
        ) : (
          <AddShoppingCart />
        )
      }
      variant="contained"
      fullWidth
      disabled={product.quantity <= 0 || adding || added}
      sx={{
        py: "0.9rem",
        backgroundColor: added ? "#2E7D32" : "#4A1F2A",
        borderRadius: "999px",
        textTransform: "none",
        fontWeight: 600,
        opacity: product.quantity <= 0 ? 0.6 : 1,
      }}
      onClick={addToCart}
    >
      {product.quantity <= 0
        ? "Out of Stock"
        : added
        ? "Added to Cart"
        : adding
        ? "Adding..."
        : "Add to Bag"}
    </Button>
  );
};

export default AddToCartButton;
