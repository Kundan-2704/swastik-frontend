// import { Favorite } from "@mui/icons-material";
// import { Button } from "@mui/material";

// const WishlistButton = () => {
//   return (
//     <Button
//       startIcon={<Favorite />}
//       variant="outlined"
//       fullWidth
//       sx={{
//         py: "0.9rem",
//         borderRadius: "999px",
//         borderColor: "#B9935A",
//         color: "#4A1F2A",
//         textTransform: "none",
//       }}
//     >
//       Wishlist
//     </Button>
//   );
// };

// export default WishlistButton;





import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../../Redux Toolkit/Store";
import { checkWishlist, toggleWishlist } from "../../../../../../Redux Toolkit/Features/Customer/wishlistSlice";

interface Props {
  productId: string;
}

const WishlistButton = ({ productId }: Props) => {
  const dispatch = useAppDispatch();

  const wished = useAppSelector(
    (state) => state.wishlist.items[productId]
  );

  const loading = useAppSelector(
    (state) => state.wishlist.loading
  );

  /* ✅ Check on load */
  useEffect(() => {
    dispatch(checkWishlist(productId));
  }, [dispatch, productId]);

  /* ✅ Toggle */
  const handleWishlist = () => {
    dispatch(toggleWishlist(productId));
  };

  return (
    <Button
      onClick={handleWishlist}
      startIcon={wished ? <Favorite /> : <FavoriteBorder />}
      variant="outlined"
      fullWidth
      disabled={loading}
      sx={{
        py: "0.9rem",
        borderRadius: "999px",
        borderColor: "#B9935A",
        color: wished ? "#B9935A" : "#4A1F2A",
        textTransform: "none",
      }}
    >
      {wished ? "Wishlisted" : "Wishlist"}
    </Button>
  );
};

export default WishlistButton;