import SEO from "../components/SEO";
import PolicyLayout from "../layouts/PolicyLayout";

const PrivacyPolicy = () => (
  <>
    <SEO
      title="Privacy Policy | Swastik Kosa & Tassar"
      description="Learn how Swastik Kosa & Tassar protects your personal information and processes payments securely via Razorpay."
    />
    <PolicyLayout title="Privacy Policy">
      <p>Swastik Kosa & Tassar respects your privacy and protects your data.</p>

      <h2>Information We Collect</h2>
      <p>Name, phone, email, address, and order details.</p>

      <h2>Payment Security</h2>
      <p>
        Payments are processed securely via Razorpay. We do not store card or UPI
        details.
      </p>

      <h2>Data Usage</h2>
      <p>Used only for orders, delivery, and support.</p>

      <h2>User Rights</h2>
      <p>You may request data deletion anytime.</p>
    </PolicyLayout>
  </>
);

export default PrivacyPolicy;
