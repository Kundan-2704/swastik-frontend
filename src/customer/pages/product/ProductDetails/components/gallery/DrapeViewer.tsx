import { useRef, useState } from "react";

type Props = {
  images: string[];
};

const DrapeViewer = ({ images }: Props) => {
  const [index, setIndex] = useState(0);
  const startX = useRef<number | null>(null);

  const onMouseDown = (e: React.MouseEvent) => {
    startX.current = e.clientX;
  };

  const onMouseUp = (e: React.MouseEvent) => {
    if (!startX.current) return;

    const diff = startX.current - e.clientX;
    if (diff > 40 && index < images.length - 1) setIndex((p) => p + 1);
    if (diff < -40 && index > 0) setIndex((p) => p - 1);

    startX.current = null;
  };

  return (
    <div
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      className="w-full h-full cursor-grab select-none"
    >
      <img
        src={images[index]}
        alt="Drape view"
        className="w-full h-full object-contain rounded-xl"
      />
    </div>
  );
};

export default DrapeViewer;
