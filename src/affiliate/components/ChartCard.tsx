import React from "react";

const ChartCard = ({ title }: { title: string }) => {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm border">
      <h3 className="font-medium mb-3">{title}</h3>

      <div className="h-52 flex items-center justify-center bg-gray-50 rounded-lg">
        chart area
      </div>
    </div>
  );
};

export default ChartCard;