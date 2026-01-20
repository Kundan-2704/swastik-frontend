// import { useEffect, useRef, useState } from "react";

// export const useProductGallery = (product: any) => {
//   const [current, setCurrent] = useState(0);
//   const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
//   const [showLens, setShowLens] = useState(false);
//   const [startX, setStartX] = useState<number | null>(null);

//   const imageRef = useRef<HTMLImageElement | null>(null);

//   /* ================= AUTO SLIDE (FIXED, SINGLE SOURCE) ================= */
//   useEffect(() => {
//     if (!product?.images?.length || showLens) return;

//     const interval = setInterval(() => {
//       setCurrent((prev) =>
//         prev === product.images.length - 1 ? 0 : prev + 1
//       );
//     }, 4500);

//     return () => clearInterval(interval);
//   }, [product?.images, showLens]);

//   /* ================= ZOOM ================= */
//   const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
//     const rect = e.currentTarget.getBoundingClientRect();

//     const x = ((e.clientX - rect.left) / rect.width) * 100;
//     const y = ((e.clientY - rect.top) / rect.height) * 100;

//     setZoomPos({
//       x: Math.max(0, Math.min(100, x)),
//       y: Math.max(0, Math.min(100, y)),
//     });
//   };

//   /* ================= SWIPE ================= */
//   const handleTouchStart = (e: React.TouchEvent) => {
//     setShowLens(true); // ⛔ pause auto-slide
//     setStartX(e.touches[0].clientX);
//   };

//   const handleTouchEnd = (e: React.TouchEvent) => {
//     if (!startX) return;

//     const diff = startX - e.changedTouches[0].clientX;

//     if (diff > 50 && current < product.images.length - 1) {
//       setCurrent((p) => p + 1);
//     } else if (diff < -50 && current > 0) {
//       setCurrent((p) => p - 1);
//     }

//     setStartX(null);
//     setShowLens(false); // ▶ resume auto-slide
//   };

//   return {
//     current,
//     setCurrent,
//     zoomPos,
//     showLens,
//     setShowLens,
//     handleMouseMove,
//     handleTouchStart,
//     handleTouchEnd,
//     imageRef,
//   };
// };






import { useEffect, useRef, useState } from "react";

export const useProductGallery = (product: any) => {
  const [current, setCurrent] = useState(0);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [showLens, setShowLens] = useState(false);
  const [startX, setStartX] = useState<number | null>(null);

  const imageRef = useRef<HTMLDivElement | null>(null);
  const rafId = useRef<number | null>(null);

  const images = product?.images || [];

  /* ================= AUTO SLIDE ================= */
  useEffect(() => {
    if (!images.length || showLens) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 4500);

    return () => clearInterval(interval);
  }, [images.length, showLens]);

  /* ================= ZOOM (RAF OPTIMIZED) ================= */
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (rafId.current) return;

    rafId.current = requestAnimationFrame(() => {
      const rect = e.currentTarget.getBoundingClientRect();

      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      setZoomPos({
        x: Math.max(0, Math.min(100, x)),
        y: Math.max(0, Math.min(100, y)),
      });

      rafId.current = null;
    });
  };

  /* ================= PAUSE AUTO-SLIDE ON HOVER ================= */
  const handleMouseEnter = () => setShowLens(true);
  const handleMouseLeave = () => setShowLens(false);

  /* ================= SWIPE ================= */
  const handleTouchStart = (e: React.TouchEvent) => {
    setShowLens(true);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!startX) return;

    const diff = startX - e.changedTouches[0].clientX;

    if (diff > 50 && current < images.length - 1) {
      setCurrent((p) => p + 1);
    } else if (diff < -50 && current > 0) {
      setCurrent((p) => p - 1);
    }

    setStartX(null);
    setShowLens(false);
  };

  /* ================= CLEANUP RAF ================= */
  useEffect(() => {
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return {
    current,
    setCurrent,
    zoomPos,
    showLens,
    setShowLens,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
    handleTouchStart,
    handleTouchEnd,
    imageRef,
  };
};
