import React, { useRef } from "react";

type Props = {
  src: string;
  alt?: string;
};

const ZoomImage: React.FC<Props> = ({ src, alt }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    container.style.backgroundPosition = `${x}% ${y}%`;
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="hidden lg:block w-full h-full bg-no-repeat bg-cover cursor-zoom-in rounded-xl"
      style={{
        backgroundImage: `url(${src})`,
        backgroundSize: "180%",
      }}
    >
      <img
        src={src}
        alt={alt}
        className="opacity-0 w-full h-full object-cover"
      />
    </div>
  );
};

export default ZoomImage;
