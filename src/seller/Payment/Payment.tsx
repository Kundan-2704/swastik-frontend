import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../Redux Toolkit/Store";
import { fetchSellerPaymentSummary } from "../../Redux Toolkit/Features/Seller/paymentSlice";
import PaymentSkeleton from "./PaymentSkeleton ";
import StatCard from "./StatCard";

const PaymentPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { summary, loading, error } = useAppSelector(
    (state) => state.sellerPayments
  );

  useEffect(() => {
    dispatch(fetchSellerPaymentSummary());
  }, [dispatch]);

  if (loading) return <PaymentSkeleton />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-4">
      {/* HEADER */}
      <div>
        <h2 className="text-xl font-semibold text-[#4A1F2A]">Payments</h2>
        <p className="text-xs text-gray-500 mt-1">
          Overview of your payouts and settlements.
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Total Earnings" value={summary?.totalEarnings ?? 0} />
        <StatCard title="Available" value={summary?.available ?? 0} />
        <StatCard title="On Hold" value={summary?.onHold ?? 0} highlight />

      </div>

      {/* ACTIONS */}
      <div className="rounded-2xl bg-white border border-[#F0E4CC] p-5 shadow-sm">
        <p className="text-sm font-semibold text-[#4A1F2A] mb-2">
          Payout details
        </p>
        <p className="text-xs text-gray-500 mb-4">
          Integrate with your bank account or UPI to receive payments.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 text-sm">
          <button
            onClick={() => alert("Open bank connect modal")}
            className="px-4 py-2 rounded-xl border border-[#B9935A] text-[#B9935A] font-medium hover:bg-[#FFF7EA]"
          >
            Connect Bank Account
          </button>

          <button
            onClick={() => window.location.href = "/seller/payout-history"}
            className="px-4 py-2 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50"
          >
            View Payout History
          </button>
        </div>
      </div>
    </div>



  );
};

export default PaymentPage;
