import StatCard from "../components/StatCard";

const mockData = {
  totalClicks: 542,
  totalOrders: 38,
  pendingEarnings: 8200,
  totalEarnings: 45200,
  referralLink: "http://localhost:5173/?ref=AFF123",
};

const AffiliateDashboard = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Affiliate Dashboard</h1>

      <div className="grid grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Clicks" value={mockData.totalClicks} />
        <StatCard title="Total Orders" value={mockData.totalOrders} />
        <StatCard title="Pending Earnings" value={`₹${mockData.pendingEarnings}`} />
        <StatCard title="Total Earnings" value={`₹${mockData.totalEarnings}`} />
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="font-semibold mb-4">Your Referral Link</h2>

        <div className="flex gap-4">
          <input
            className="border p-2 w-full rounded"
            value={mockData.referralLink}
            readOnly
          />
          <button
            onClick={() => navigator.clipboard.writeText(mockData.referralLink)}
            className="bg-orange-500 text-white px-4 py-2 rounded"
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  );
};

export default AffiliateDashboard;