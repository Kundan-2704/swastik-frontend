import { useState } from "react";

export const useImageZoom = () => {
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [showLens, setShowLens] = useState(false);

  const handleMouseMove = (e: any) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setZoomPos({
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
    });
  };

  return { zoomPos, showLens, setShowLens, handleMouseMove };
};
