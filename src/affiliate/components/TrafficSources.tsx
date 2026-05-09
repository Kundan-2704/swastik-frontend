import React from "react";

const TrafficSources = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 border">

      <h3 className="font-semibold mb-3">
        Traffic Sources
      </h3>

      <ul className="text-sm space-y-2">

        <li className="flex justify-between">
          <span>Instagram</span>
          <span>42%</span>
        </li>

        <li className="flex justify-between">
          <span>YouTube</span>
          <span>28%</span>
        </li>

        <li className="flex justify-between">
          <span>Website</span>
          <span>20%</span>
        </li>

        <li className="flex justify-between">
          <span>Facebook</span>
          <span>10%</span>
        </li>

      </ul>

    </div>
  );
};

export default TrafficSources;