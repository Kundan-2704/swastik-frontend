import React from "react";

interface Props {
  sizes: string[];
  size: string | null;
  setSize: (s: string) => void;
}

const SizeSelector: React.FC<Props> = ({ sizes, size, setSize }) => {
  if (!sizes?.length) return null;

  return (
    <div>
      <h4 className="text-sm font-medium">SIZE</h4>
      <div className="flex gap-2 mt-2 flex-wrap">
        {sizes.map((s) => (
          <button
            key={s}
            onClick={() => setSize(s)}
            className={`px-4 py-1 rounded-full text-sm border transition
              ${size === s
                ? "bg-[#4A1F2A] text-white border-[#4A1F2A]"
                : "border-[#D3B58A] text-[#4A1F2A] hover:bg-[#F8F3E8]"
              }
            `}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;
