
import { useRef, useState, useEffect } from "react";

export const useImageZoom = () => {
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [isZooming, setIsZooming] = useState(false);

  const frameRef = useRef<number | null>(null);

  /* Cleanup animation frame */
  useEffect(() => {
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const updatePosition = (
    clientX: number,
    clientY: number,
    rect: DOMRect
  ) => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);

    frameRef.current = requestAnimationFrame(() => {
      const x = ((clientX - rect.left) / rect.width) * 100;
      const y = ((clientY - rect.top) / rect.height) * 100;

      setZoomPos({
        x: Math.max(0, Math.min(100, x)),
        y: Math.max(0, Math.min(100, y)),
      });
    });
  };

  /* 🖱 DESKTOP */
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZooming) return;

    const rect = e.currentTarget.getBoundingClientRect();
    updatePosition(e.clientX, e.clientY, rect);
  };

  /* 📱 MOBILE */
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isZooming) return;

    e.preventDefault(); // ⭐ prevents scroll conflict

    const touch = e.touches[0];
    if (!touch) return;

    const rect = e.currentTarget.getBoundingClientRect();
    updatePosition(touch.clientX, touch.clientY, rect);
  };

  return {
    zoomPos,
    isZooming,

    /* handlers */
    handleMouseMove,
    handleTouchMove,

    handleMouseEnter: () => setIsZooming(true),
    handleMouseLeave: () => setIsZooming(false),

    handleTouchStart: () => setIsZooming(true),
    handleTouchEnd: () => setIsZooming(false),
  };
};
