import React from "react";
import StatCard from "../components/StatCard";
import ChartCard from "../components/ChartCard";
import TrafficSources from "../components/TrafficSources";
import ReferralLinkBox from "../components/ReferralLinkBox";
import TopProducts from "../components/TopProducts";
import RecentConversions from "../components/RecentConversions";

const AffiliateDashboard = () => {
  return (
    <div className="p-4 md:p-6 space-y-6">

      <h1 className="text-2xl font-semibold">Affiliate Analytics</h1>

      {/* stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Total Earnings" value="₹2,45,600" growth="+12%" />
        <StatCard title="Total Clicks" value="18,240" growth="+8%" />
        <StatCard title="Conversions" value="1,248" growth="+5%" />
        <StatCard title="Conversion Rate" value="3.6%" growth="+1.2%" />
      </div>

      {/* charts */}
      <div className="grid md:grid-cols-3 gap-4">
        <ChartCard title="Earnings Trend" />
        <ChartCard title="Clicks vs Conversions" />
        <TrafficSources />
      </div>

      {/* referral */}
      <ReferralLinkBox />

      {/* tables */}
      <div className="grid md:grid-cols-2 gap-4">
        <TopProducts />
        <RecentConversions />
      </div>

    </div>
  );
};

export default AffiliateDashboard;