
const AnalyticsDashboard = () => {
  return (
    <div className="w-full space-y-6">

      {/* PAGE TITLE */}
      <div>
        <h1 className="text-2xl font-semibold text-[#7a4a22]">
          Analytics
        </h1>
        <p className="text-sm text-gray-500">
          Sales & performance overview
        </p>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { title: "Total Revenue", value: "₹2,45,600" },
          { title: "Total Orders", value: "1,248" },
          { title: "Conversion Rate", value: "3.6%" },
          { title: "Avg Order Value", value: "₹1,968" },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-5 shadow-sm border"
          >
            <p className="text-sm text-gray-500">{item.title}</p>
            <h2 className="text-2xl font-semibold text-[#7a4a22] mt-2">
              {item.value}
            </h2>
          </div>
        ))}
      </div>

      {/* CHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* SALES TREND */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border">
          <h3 className="font-medium text-gray-700 mb-4">
            Sales Trend (Monthly)
          </h3>

          <div className="h-64 rounded-lg bg-gradient-to-r from-[#efe2c5] to-[#f7f2ea] flex items-center justify-center text-[#7a4a22] font-medium">
            Line / Bar Chart Placeholder
          </div>
        </div>

        {/* CATEGORY PERFORMANCE */}
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h3 className="font-medium text-gray-700 mb-4">
            Category Performance
          </h3>

          <div className="h-64 rounded-lg bg-gradient-to-b from-[#f7f2ea] to-[#efe2c5] flex items-center justify-center text-[#7a4a22] font-medium">
            Pie / Doughnut Chart
          </div>
        </div>
      </div>

      {/* TABLE + INSIGHTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* TOP PRODUCTS */}
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h3 className="font-medium text-gray-700 mb-4">
            Top Selling Products
          </h3>

          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="pb-2">Product</th>
                <th className="pb-2">Sales</th>
                <th className="pb-2">Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {[
                ["Kosa Silk Saree", "124", "₹86,800"],
                ["Tussar Handloom", "98", "₹72,300"],
                ["Printed Saree", "75", "₹41,200"],
              ].map((row, index) => (
                <tr key={index}>
                  <td className="py-2">{row[0]}</td>
                  <td className="py-2">{row[1]}</td>
                  <td className="py-2 font-medium text-[#7a4a22]">
                    {row[2]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* INSIGHTS */}
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h3 className="font-medium text-gray-700 mb-4">
            Key Insights
          </h3>

          <ul className="space-y-3 text-sm text-gray-600">
            <li>✔️ Sales increased by 18% compared to last month</li>
            <li>✔️ Wedding sarees have highest conversion rate</li>
            <li>⚠️ Returns increased in daily wear category</li>
            <li>💡 Best selling day: Saturday</li>
          </ul>
        </div>
      </div>

    </div>
  );
};

export default AnalyticsDashboard;
