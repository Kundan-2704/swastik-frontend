import React from "react";

const PolicyLayout = ({ title, children }: any) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-14">
      <h1 className="text-3xl font-semibold mb-6">{title}</h1>
      <div className="space-y-4 text-sm leading-relaxed text-gray-700">
        {children}
      </div>
    </div>
  );
};

export default PolicyLayout;
