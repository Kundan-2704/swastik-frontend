import { useState } from "react";
import { useImageZoom } from "./useImageZoom";
import { useSwipe } from "./useSwipe";

export const useGallery = (images: string[]) => {
  const [current, setCurrent] = useState(0);
  const zoom = useImageZoom();
  const swipe = useSwipe(images.length, setCurrent);

  return { current, setCurrent, images, ...zoom, ...swipe };
};
