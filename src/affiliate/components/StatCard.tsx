import React from "react";

interface Props {
  title: string;
  value: string;
  growth?: string;
}

const StatCard = ({ title, value, growth }: Props) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 border">
      <p className="text-gray-500 text-sm">{title}</p>

      <h2 className="text-xl font-semibold mt-1">{value}</h2>

      <span className="text-green-600 text-sm">
        {growth}
      </span>
    </div>
  );
};

export default StatCard;