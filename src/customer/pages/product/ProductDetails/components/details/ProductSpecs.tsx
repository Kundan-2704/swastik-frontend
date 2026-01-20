import React from "react";

const ProductSpecs = ({ details }: any) => {
  if (!details) return null;

  return (
    <div className="mt-10">
      <h2 className="text-sm font-semibold text-[#4A1F2A] mb-3">
        Product Details
      </h2>

      <div className="space-y-2 text-sm text-[#5A4A3C]">
        <Spec label="Fabric" value={details.fabric} />
        <Spec label="Weave" value={details.weave} />
        <Spec label="Saree Length" value={details.sareeLength} />
        <Spec label="Blouse Piece" value={details.blousePiece} />
        <Spec label="Care" value={details.care} />
        <Spec label="Origin" value={details.origin} />
      </div>
    </div>
  );
};

const Spec = ({ label, value }: any) => (
  <div className="flex justify-between">
    <span>{label}</span>
    <span className="font-medium text-right max-w-[60%]">
      {value || "-"}
    </span>
  </div>
);

export default ProductSpecs;
