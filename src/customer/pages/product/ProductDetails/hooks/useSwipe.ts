import { useState } from "react";

export const useSwipe = (length: number, setCurrent: any) => {
  const [startX, setStartX] = useState<number | null>(null);

  const handleTouchStart = (e: any) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: any) => {
    if (!startX) return;

    const diff = startX - e.changedTouches[0].clientX;

    if (diff > 50) setCurrent((p: number) => Math.min(p + 1, length - 1));
    if (diff < -50) setCurrent((p: number) => Math.max(p - 1, 0));

    setStartX(null);
  };

  return { handleTouchStart, handleTouchEnd };
};
