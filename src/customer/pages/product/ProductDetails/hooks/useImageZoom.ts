




// import { useState } from "react";

// export const useImageZoom = () => {
//   const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
//   const [isZooming, setIsZooming] = useState(false);

//   const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
//     if (!isZooming) return;

//     const rect = e.currentTarget.getBoundingClientRect();
//     const x = ((e.clientX - rect.left) / rect.width) * 100;
//     const y = ((e.clientY - rect.top) / rect.height) * 100;

//     setZoomPos({
//       x: Math.max(0, Math.min(100, x)),
//       y: Math.max(0, Math.min(100, y)),
//     });
//   };

//   return {
//     zoomPos,
//     isZooming,
//     handleMouseMove,
//     handleMouseEnter: () => setIsZooming(true),
//     handleMouseLeave: () => setIsZooming(false),
//   };
// };








import { useState } from "react";

export const useImageZoom = () => {
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [isZooming, setIsZooming] = useState(false);

  const updatePosition = (
    clientX: number,
    clientY: number,
    rect: DOMRect
  ) => {
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;

    setZoomPos({
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
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
