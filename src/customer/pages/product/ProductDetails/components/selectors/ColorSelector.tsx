import React from "react";

interface Props {
  colors: any[];
  color: any;
  setColor: (c: any) => void;
}

const ColorSelector: React.FC<Props> = ({ colors, color, setColor }) => {
  if (!colors?.length) return null;

  return (
    <div>
      <h4 className="text-sm font-medium">COLOR</h4>
      <div className="flex gap-3 mt-2">
        {colors.map((c, i) => (
          <button
            key={i}
            onClick={() => setColor(c)}
            title={c.name}
            className={`w-8 h-8 rounded-full border-2 transition
              ${color?.name === c.name
                ? "border-[#4A1F2A] scale-110"
                : "border-[#E8DCC8]"
              }
            `}
            style={{ backgroundColor: c.hex }}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorSelector;
