import SEO from "../components/SEO";
import PolicyLayout from "../layouts/PolicyLayout";

const RefundReplacement = () => (
  <>
    <SEO
      title="Refund & Replacement Policy | Swastik Kosa & Tassar"
      description="Replacement-first policy for handloom sarees. Refunds only if replacement is not possible."
    />
    <PolicyLayout title="Refund & Replacement Policy">
      <h2>Replacement</h2>
      <p>Replacement requests must be raised within 48 hours.</p>

      <h2>Inspection</h2>
      <p>Returned products are inspected before approval.</p>

      <h2>Refunds</h2>
      <p>
        Refunds are issued only if replacement is not possible and are processed
        via Razorpay within 5–7 working days.
      </p>
    </PolicyLayout>
  </>
);

export default RefundReplacement;
