import React, { useRef, useState } from "react";

const LENS_SIZE = 150;
const ZOOM_LEVEL = 2.5;

const LensProductImage = ({ src }: { src: string }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [showLens, setShowLens] = useState(false);
  const [lensPos, setLensPos] = useState({ x: 50, y: 50 });

  const updatePosition = (clientX: number, clientY: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    let x = ((clientX - rect.left) / rect.width) * 100;
    let y = ((clientY - rect.top) / rect.height) * 100;

    // Clamp inside image
    x = Math.max(0, Math.min(100, x));
    y = Math.max(0, Math.min(100, y));

    setLensPos({ x, y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!showLens) return;
    updatePosition(e.clientX, e.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!showLens) return;

    e.preventDefault();

    const touch = e.touches[0];
    if (!touch) return;

    updatePosition(touch.clientX, touch.clientY);
  };

  return (
    <div className="w-full flex justify-center">
    <div
      ref={containerRef}
      className="
        relative
        w-full
        max-w-[580px]
        h-[520px]
        lg:h-[680px]
        overflow-hidden
        rounded-2xl
        bg-[#f6f4f1]
        touch-none
        select-none
      "

        onMouseEnter={() => setShowLens(true)}
        onMouseLeave={() => setShowLens(false)}
        onMouseMove={handleMouseMove}
        onTouchStart={() => setShowLens(true)}
        onTouchMove={handleTouchMove}
        onTouchEnd={() => setShowLens(false)}
      >
        {/* Base Image */}
        <img
          src={src}
          alt="product"
          draggable={false}
          className="w-full h-full object-cover"
        />

        {/* 🔍 Lens */}
        {showLens && (
          <div
            className="
              pointer-events-none
              absolute
              rounded-full
              border-2 border-white
              shadow-xl
            "
            style={{
              width: LENS_SIZE,
              height: LENS_SIZE,

              left: `calc(${lensPos.x}% - ${LENS_SIZE / 2}px)`,
              top: `calc(${lensPos.y}% - ${LENS_SIZE / 2}px)`,

              backgroundImage: `url(${src})`,
              backgroundRepeat: "no-repeat",

              backgroundSize: `${ZOOM_LEVEL * 100}%`,
              backgroundPosition: `${lensPos.x}% ${lensPos.y}%`,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default LensProductImage;
