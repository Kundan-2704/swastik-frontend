import { Favorite } from "@mui/icons-material";
import { Button } from "@mui/material";

const WishlistButton = () => {
  return (
    <Button
      startIcon={<Favorite />}
      variant="outlined"
      fullWidth
      sx={{
        py: "0.9rem",
        borderRadius: "999px",
        borderColor: "#B9935A",
        color: "#4A1F2A",
        textTransform: "none",
      }}
    >
      Wishlist
    </Button>
  );
};

export default WishlistButton;
