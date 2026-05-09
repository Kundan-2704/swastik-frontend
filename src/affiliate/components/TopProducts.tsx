import React from "react";

const data = [
  {
    name: "Running Shoes",
    clicks: 1200,
    conversions: 210,
    commission: "₹32,000"
  },
  {
    name: "Wireless Headphones",
    clicks: 890,
    conversions: 150,
    commission: "₹18,200"
  }
];

const TopProducts = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 border">

      <h3 className="font-semibold mb-3">
        Top Products
      </h3>

      <table className="w-full text-sm">

        <thead>
          <tr className="text-left text-gray-500">
            <th>Product</th>
            <th>Clicks</th>
            <th>Conversions</th>
            <th>Commission</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, i) => (
            <tr key={i} className="border-t">

              <td className="py-2">
                {item.name}
              </td>

              <td>
                {item.clicks}
              </td>

              <td>
                {item.conversions}
              </td>

              <td className="font-medium">
                {item.commission}
              </td>

            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
};

export default TopProducts;