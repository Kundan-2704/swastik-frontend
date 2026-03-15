// import SEO from "../components/SEO";
// import PolicyLayout from "../layouts/PolicyLayout";

// const SellerPolicy = () => (
//   <>
//     <SEO
//       title="Seller Policy | Swastik Kosa & Tassar"
//       description="Seller rules, KYC, authenticity requirements, and payout cycle for marketplace sellers."
//     />
//     <PolicyLayout title="Seller Policy">
//       <p>All sellers must provide genuine handloom products.</p>
//       <p>KYC verification is mandatory.</p>
//       <p>Fake or machine-made items are strictly prohibited.</p>
//       <p>Payouts are processed within 7–10 working days.</p>
//     </PolicyLayout>
//   </>
// );

// export default SellerPolicy;




import React from "react";
import SEO from "../components/SEO";
import PolicyLayout from "../layouts/PolicyLayout";

const SellerPolicy = () => (
  <>
    <SEO
      title="Seller Policy | Swastik Handloom"
      description="Seller rules, KYC requirements, authenticity guidelines, and payout policy for sellers on the Swastik Handloom marketplace."
    />

    <PolicyLayout title="Seller Policy">
      <p>
        <strong>Swastik Handloom</strong> operates as a multi-vendor
        marketplace that connects customers with independent sellers offering
        authentic handloom products. Sellers must follow the marketplace
        policies outlined below to maintain product quality and customer trust.
      </p>

      <h2>1. Seller Eligibility</h2>
      <p>
        Sellers wishing to list products on the Swastik Handloom marketplace
        must complete the seller registration process and provide valid
        identification and business details.
      </p>

      <h2>2. KYC Verification</h2>
      <p>
        All sellers must complete KYC verification before listing products.
        This may include identity proof, address proof, and bank account
        details required for payouts.
      </p>

      <h2>3. Product Authenticity</h2>
      <p>
        Sellers must list only genuine handloom products. Fake,
        machine-made, or misleading items are strictly prohibited.
        Swastik Handloom reserves the right to remove such listings and
        suspend the seller account.
      </p>

      <h2>4. Product Listings</h2>
      <p>
        Sellers are responsible for providing accurate product information,
        including descriptions, pricing, images, and specifications.
        Misleading or incorrect listings may result in removal from the
        platform.
      </p>

      <h2>5. Order Fulfillment</h2>
      <p>
        Sellers must process and dispatch orders within the agreed time frame
        and ensure proper packaging to prevent damage during shipping.
      </p>

      <h2>6. Payout Policy</h2>
      <p>
        Seller payouts are processed after successful order delivery and
        completion of the return or replacement window. Payments are typically
        released within <strong>7–10 working days</strong> to the registered
        bank account.
      </p>

      <h2>7. Policy Violations</h2>
      <p>
        Swastik Handloom reserves the right to suspend, restrict, or remove
        sellers who violate marketplace policies, provide counterfeit
        products, or engage in fraudulent activities.
      </p>
    </PolicyLayout>
  </>
);

export default SellerPolicy;

