import { useRef } from "react";
import { flyToCart } from "../util/flyToCart";

export const useCartAnimation = () => {
  const imageRef = useRef<HTMLImageElement | null>(null);

  const animateToCart = () => {
    flyToCart(imageRef.current);
  };

  return { imageRef, animateToCart };
};
