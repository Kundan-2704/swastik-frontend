import React from "react";

const Policies = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-700">
      <h1 className="text-2xl font-bold mb-4">Terms & Policies</h1>

      <p className="mb-4 text-sm text-red-500">
        This website is currently in testing mode. All features are subject to change.
      </p>

      <section className="mb-6">
        <h2 className="font-semibold text-lg">1. Terms & Conditions</h2>
        <p className="text-sm mt-2">
          This platform is under development. Orders, payments, and data are for testing
          purposes only. We reserve the right to reset data at any time.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="font-semibold text-lg">2. Privacy Policy</h2>
        <p className="text-sm mt-2">
          We collect basic user information for testing. No real data is shared with third parties.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="font-semibold text-lg">3. Refund Policy</h2>
        <p className="text-sm mt-2">
          All payments are in test mode. No real money is charged during testing.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="font-semibold text-lg">4. Updates</h2>
        <p className="text-sm mt-2">
          These policies may change anytime before production launch.
        </p>
      </section>
    </div>
  );
};

export default Policies;
