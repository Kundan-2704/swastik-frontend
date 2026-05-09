import React from "react";

const RecentConversions = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 border">

      <h3 className="font-semibold mb-3">
        Recent Conversions
      </h3>

      <ul className="space-y-2 text-sm">

        <li className="flex justify-between border-b pb-1">
          <span>Order #12345</span>
          <span>₹320</span>
        </li>

        <li className="flex justify-between border-b pb-1">
          <span>Order #12346</span>
          <span>₹520</span>
        </li>

      </ul>

    </div>
  );
};

export default RecentConversions;