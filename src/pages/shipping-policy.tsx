import SEO from "../components/SEO";
import PolicyLayout from "../layouts/PolicyLayout";

const ShippingPolicy = () => (
  <>
    <SEO
      title="Shipping Policy | Swastik Kosa & Tassar"
      description="Shipping timelines, delivery partners, and processing information for Swastik Kosa & Tassar."
    />
    <PolicyLayout title="Shipping Policy">
      <p>Orders are processed within 2–3 working days.</p>
      <p>Delivery usually takes 3–7 working days.</p>
      <p>Delays may occur due to weather or remote locations.</p>
      <p>Incorrect address may result in re-shipping charges.</p>
    </PolicyLayout>
  </>
);

export default ShippingPolicy;
