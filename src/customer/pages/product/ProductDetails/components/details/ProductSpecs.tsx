
// const ProductSpecs = ({ details }: any) => {
//   if (!details) return null;

//   return (
//     <div className="mt-10">
//       <h2 className="text-sm font-semibold text-[#4A1F2A] mb-3">
//         Product Details
//       </h2>

//       <div className="space-y-2 text-sm text-[#5A4A3C]">
//         <Spec label="Fabric" value={details.fabric} />
//         <Spec label="Weave" value={details.weave} />
//         <Spec label="Saree Length" value={details.sareeLength} />
//         <Spec label="Blouse Piece" value={details.blousePiece} />
//         <Spec label="Care" value={details.care} />
//         <Spec label="Origin" value={details.origin} />
//       </div>
//     </div>
//   );
// };

// const Spec = ({ label, value }: any) => (
//   <div className="flex justify-between">
//     <span>{label}</span>
//     <span className="font-medium text-right max-w-[60%]">
//       {value || "-"}
//     </span>
//   </div>
// );

// export default ProductSpecs;






import React from "react";

type ProductDetails = {
  fabric?: string;
  weave?: string;
  sareeLength?: string;
  blousePiece?: string;
  care?: string;
  origin?: string;
};

type Props = {
  details?: ProductDetails;
};

const ProductSpecs: React.FC<Props> = ({ details }) => {
  if (!details) return null;

  const specs = [
    { label: "Fabric", value: details.fabric },
    { label: "Weave", value: details.weave },
    { label: "Saree Length", value: details.sareeLength },
    { label: "Blouse Piece", value: details.blousePiece },
    { label: "Care", value: details.care },
    { label: "Origin", value: details.origin },
  ];

  return (
    <section className="mt-10 rounded-3xl border border-[#E8DCCF] bg-[#FFF9F3] p-6 md:p-7 shadow-sm">
      {/* Heading */}
      <h2 className="mb-5 text-xs font-semibold tracking-widest text-[#4A1F2A] uppercase">
        Product Details
      </h2>

      {/* Specs list */}
      <div className="divide-y divide-[#E6D8C8]/50 text-sm">
        {specs.map((spec) => (
          <Spec key={spec.label} {...spec} />
        ))}
      </div>
    </section>
  );
};

type SpecProps = {
  label: string;
  value?: string;
};

const Spec: React.FC<SpecProps> = ({ label, value }) => {
  return (
    <div className="flex items-start justify-between gap-6 py-3">
      {/* Label */}
      <span className="text-[#6B4E37]">{label}</span>

      {/* Value */}
      <span className="max-w-[60%] text-right font-semibold text-[#3F2A1D] leading-relaxed">
        {value || "—"}
      </span>
    </div>
  );
};

export default ProductSpecs;
