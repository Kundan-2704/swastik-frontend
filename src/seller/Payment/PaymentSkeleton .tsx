import React from "react";

const PaymentSkeleton: React.FC = () => {
  return (
    <div className="space-y-4">
      {/* Header skeleton */}
      <div>
        <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
        <div className="h-3 w-64 bg-gray-200 rounded mt-2 animate-pulse" />
      </div>

      {/* Cards skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-2xl p-4 bg-white border border-[#F0E4CC] shadow-sm"
          >
            <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
            <div className="h-7 w-32 bg-gray-300 rounded mt-3 animate-pulse" />
            <div className="h-3 w-40 bg-gray-200 rounded mt-2 animate-pulse" />
          </div>
        ))}
      </div>

      {/* Actions skeleton */}
      <div className="rounded-2xl bg-white border border-[#F0E4CC] p-5 shadow-sm space-y-3">
        <div className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
        <div className="h-3 w-72 bg-gray-200 rounded animate-pulse" />

        <div className="flex gap-4 mt-4">
          <div className="h-10 w-44 bg-gray-300 rounded-xl animate-pulse" />
          <div className="h-10 w-44 bg-gray-300 rounded-xl animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default PaymentSkeleton;
