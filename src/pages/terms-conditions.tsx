// import SEO from "../components/SEO";
// import PolicyLayout from "../layouts/PolicyLayout";

// const Terms = () => (
//   <>
//     <SEO
//       title="Terms & Conditions | Swastik Kosa & Tassar"
//       description="Read the terms and conditions for using Swastik Kosa & Tassar handloom marketplace."
//     />
//     <PolicyLayout title="Terms & Conditions">
//       <p>
//         Swastik Kosa & Tassar is a multivendor marketplace for authentic handloom
//         products.
//       </p>

//       <h2>Seller Responsibility</h2>
//       <p>Sellers are responsible for product quality and authenticity.</p>

//       <h2>Handloom Variations</h2>
//       <p>Minor variations are natural and not defects.</p>

//       <h2>Jurisdiction</h2>
//       <p>All disputes are subject to Chhattisgarh, India jurisdiction.</p>
//     </PolicyLayout>
//   </>
// );

// export default Terms;





import React from "react";
import SEO from "../components/SEO";
import PolicyLayout from "../layouts/PolicyLayout";

const Terms = () => (
  <>
    <SEO
      title="Terms & Conditions | Swastik Handloom"
      description="Terms and conditions for using the Swastik Handloom multi-vendor marketplace for authentic handloom products."
    />

    <PolicyLayout title="Terms & Conditions">
      <p>
        Welcome to <strong>Swastik Handloom</strong>. By accessing or using this
        website, you agree to comply with and be bound by the following Terms
        and Conditions. These terms govern your use of our platform and all
        transactions conducted through it.
      </p>

      <h2>1. Marketplace Model</h2>
      <p>
        Swastik Handloom operates as a multi-vendor marketplace that connects
        customers with independent sellers offering authentic handloom
        products. While we provide the platform and payment infrastructure,
        individual sellers are responsible for listing and supplying their
        products.
      </p>

      <h2>2. Seller Responsibility</h2>
      <p>
        Sellers are responsible for ensuring the accuracy of product
        descriptions, pricing, quality, and authenticity of the items listed on
        the platform. Swastik Handloom may take action against sellers who
        violate marketplace policies or provide misleading information.
      </p>

      <h2>3. Product Authenticity</h2>
      <p>
        Products listed on the platform are expected to be genuine handloom
        items. Due to the handmade nature of traditional textiles, minor
        variations in color, weave, or design may occur and should not be
        considered defects.
      </p>

      <h2>4. Orders & Payments</h2>
      <p>
        All payments made through the website are processed securely through
        trusted payment gateway providers such as Razorpay. Swastik Handloom
        does not store sensitive payment details such as card numbers or UPI
        credentials on its servers.
      </p>

      <h2>5. Order Cancellation</h2>
      <p>
        Swastik Handloom reserves the right to cancel orders in cases of pricing
        errors, suspected fraud, stock unavailability, or violations of
        marketplace policies.
      </p>

      <h2>6. Limitation of Liability</h2>
      <p>
        Swastik Handloom acts as a marketplace facilitator and is not directly
        responsible for manufacturing or producing the products listed by
        sellers. However, we aim to ensure a safe and reliable shopping
        experience for all customers.
      </p>

      <h2>7. Jurisdiction</h2>
      <p>
        Any disputes arising from the use of this website or transactions
        conducted through it shall be governed by the laws of India and subject
        to the jurisdiction of courts located in Chhattisgarh, India.
      </p>

      <h2>8. Policy Updates</h2>
      <p>
        Swastik Handloom reserves the right to update or modify these Terms &
        Conditions at any time without prior notice. Continued use of the
        website constitutes acceptance of the updated terms.
      </p>
    </PolicyLayout>
  </>
);

export default Terms;

