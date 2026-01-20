import { useState } from "react";
import { addItemToCart } from "../../../../../Redux Toolkit/Features/Customer/CartSlice";
import { useAppDispatch } from "../../../../../Redux Toolkit/Store";
import { useCartAnimation } from "./useCartAnimation";

export const useAddToCart = (product: any) => {
  const dispatch = useAppDispatch();

  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState<string | null>(null);
  const [color, setColor] = useState<any>(null);

  const { imageRef, animateToCart } = useCartAnimation();

  const addToCart = async () => {
    if (!product) return;

    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      alert("Please login first");
      return;
    }

    try {
      setAdding(true);

      await dispatch(
        addItemToCart({
          jwt,
          request: {
            productId: product._id,
            quantity,
            size: size || "S",
            color: color?.name || "",
          },
        })
      ).unwrap();

      // 🔥 CART ANIMATION
      animateToCart();

      // ✅ Button success state
      setAdded(true);
      setTimeout(() => setAdded(false), 1200);
    } catch (err) {
      console.error("Add to cart failed:", err);
      alert("Failed to add item to cart");
    } finally {
      setAdding(false);
    }
  };

  return {
    // actions
    addToCart,

    // states
    adding,
    added,

    // animation ref (IMPORTANT)
    imageRef,

    // selectors
    quantity: { quantity, setQuantity },
    size: { size, setSize },
    color: { color, setColor },
  };
};
