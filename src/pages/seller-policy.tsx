import SEO from "../components/SEO";
import PolicyLayout from "../layouts/PolicyLayout";

const SellerPolicy = () => (
  <>
    <SEO
      title="Seller Policy | Swastik Kosa & Tassar"
      description="Seller rules, KYC, authenticity requirements, and payout cycle for marketplace sellers."
    />
    <PolicyLayout title="Seller Policy">
      <p>All sellers must provide genuine handloom products.</p>
      <p>KYC verification is mandatory.</p>
      <p>Fake or machine-made items are strictly prohibited.</p>
      <p>Payouts are processed within 7–10 working days.</p>
    </PolicyLayout>
  </>
);

export default SellerPolicy;
