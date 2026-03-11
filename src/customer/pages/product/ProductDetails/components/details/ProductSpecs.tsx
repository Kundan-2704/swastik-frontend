
// import React from "react";

// type ProductDetails = {
//   fabric?: string;
//   weave?: string;
//   sareeLength?: string;
//   blousePiece?: string;
//   care?: string;
//   origin?: string;
// };

// type Props = {
//   details?: ProductDetails;
// };

// const ProductSpecs: React.FC<Props> = ({ details }) => {
//   if (!details) return null;

//   const specs = [
//     { label: "Fabric", value: details.fabric },
//     { label: "Weave", value: details.weave },
//     { label: "Saree Length", value: details.sareeLength },
//     { label: "Blouse Piece", value: details.blousePiece },
//     { label: "Care", value: details.care },
//     { label: "Origin", value: details.origin },
//   ];

//   return (
//     <section className="mt-10 rounded-3xl border border-[#E8DCCF] bg-[#FFF9F3] p-6 md:p-7 shadow-sm">
//       {/* Heading */}
//       <h2 className="mb-5 text-xs font-semibold tracking-widest text-[#4A1F2A] uppercase">
//         Product Details
//       </h2>

//       {/* Specs list */}
//       <div className="divide-y divide-[#E6D8C8]/50 text-sm">
//         {specs.map((spec) => (
//           <Spec key={spec.label} {...spec} />
//         ))}
//       </div>
//     </section>
//   );
// };

// type SpecProps = {
//   label: string;
//   value?: string;
// };

// const Spec: React.FC<SpecProps> = ({ label, value }) => {
//   return (
//     <div className="flex items-start justify-between gap-6 py-3">
//       {/* Label */}
//       <span className="text-[#6B4E37]">{label}</span>

//       {/* Value */}
//       <span className="max-w-[60%] text-right font-semibold text-[#3F2A1D] leading-relaxed">
//         {value || "—"}
//       </span>
//     </div>
//   );
// };

// export default ProductSpecs;




import React from "react";

type ProductDetails = {
  [key: string]: string | undefined;
};

type Props = {
  details?: ProductDetails;
};

const formatLabel = (key: string) => {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());
};

const ProductSpecs: React.FC<Props> = ({ details }) => {
  if (!details) return null;

  const specs = Object.entries(details);

  return (
    <section className="mt-10 rounded-3xl border border-[#E8DCCF] bg-[#FFF9F3] p-6 md:p-7 shadow-sm">
      
      <h2 className="mb-5 text-xs font-semibold tracking-widest text-[#4A1F2A] uppercase">
        Product Details
      </h2>

      <div className="divide-y divide-[#E6D8C8]/50 text-sm">
        {specs.map(([key, value]) => (
          <Spec key={key} label={formatLabel(key)} value={value} />
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
  if (!value) return null;

  return (
    <div className="flex items-start justify-between gap-6 py-3">
      <span className="text-[#6B4E37]">{label}</span>

      <span className="max-w-[60%] text-right font-semibold text-[#3F2A1D] leading-relaxed">
        {value}
      </span>
    </div>
  );
};

export default ProductSpecs;