const AffiliateWithdraw = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Withdraw Earnings</h1>

      <div className="bg-white p-8 rounded-lg shadow max-w-md">
        <p className="mb-4 text-gray-600">
          Minimum withdrawal amount is ₹1000
        </p>

        <button className="bg-green-600 text-white px-6 py-3 rounded w-full">
          Request Withdrawal
        </button>
      </div>
    </div>
  );
};

export default AffiliateWithdraw;