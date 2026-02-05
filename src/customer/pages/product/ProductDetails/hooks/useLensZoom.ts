import { useRef, useState, useEffect } from "react";

export const useLensZoom = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [showLens, setShowLens] = useState(false);
  const [lensPos, setLensPos] = useState({ x: 0, y: 0 });

  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const updatePosition = (clientX: number, clientY: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    if (frameRef.current) cancelAnimationFrame(frameRef.current);

    frameRef.current = requestAnimationFrame(() => {
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      setLensPos({ x, y });
    });
  };

  /* Desktop */
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!showLens) return;
    updatePosition(e.clientX, e.clientY);
  };

  /* Mobile */
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!showLens) return;

    e.preventDefault();

    const touch = e.touches[0];
    if (!touch) return;

    updatePosition(touch.clientX, touch.clientY);
  };

  return {
    containerRef,
    showLens,
    lensPos,

    handleMouseMove,
    handleTouchMove,

    handleMouseEnter: () => setShowLens(true),
    handleMouseLeave: () => setShowLens(false),

    handleTouchStart: () => setShowLens(true),
    handleTouchEnd: () => setShowLens(false),
  };
};
