import React from "react";

const Reviews = () => {
  return (
    <div className="mt-16">
      <h2 className="text-sm font-semibold text-[#4A1F2A] mb-4">
        Customer Reviews
      </h2>

      <div className="space-y-4">
        <div className="p-4 border rounded-xl bg-[#FDF9F2]">
          <p className="font-medium">⭐️⭐️⭐️⭐️⭐️</p>
          <p className="text-sm mt-1">
            Beautiful saree, fabric feels premium. Totally worth it.
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Verified Buyer
          </p>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
