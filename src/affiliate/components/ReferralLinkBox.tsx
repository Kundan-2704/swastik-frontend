import React from "react";

const ReferralLinkBox = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 border">

      <h3 className="font-semibold mb-2">
        Generate Affiliate Link
      </h3>

      <div className="flex gap-2">
        <input
          placeholder="Enter product url..."
          className="border p-2 rounded-lg w-full"
        />

        <button className="bg-black text-white px-4 rounded-lg">
          Generate
        </button>
      </div>

      <p className="text-xs text-gray-500 mt-2">
        Example: https://yourstore.com/product?id=123&ref=affiliateId
      </p>

    </div>
  );
};

export default ReferralLinkBox;