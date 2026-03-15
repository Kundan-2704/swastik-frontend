// import SEO from "../components/SEO";
// import PolicyLayout from "../layouts/PolicyLayout";

// const RefundReplacement = () => (
//   <>
//     <SEO
//       title="Refund & Replacement Policy | Swastik Kosa & Tassar"
//       description="Replacement-first policy for handloom sarees. Refunds only if replacement is not possible."
//     />
//     <PolicyLayout title="Refund & Replacement Policy">
//       <h2>Replacement</h2>
//       <p>Replacement requests must be raised within 48 hours.</p>

//       <h2>Inspection</h2>
//       <p>Returned products are inspected before approval.</p>

//       <h2>Refunds</h2>
//       <p>
//         Refunds are issued only if replacement is not possible and are processed
//         via Razorpay within 5–7 working days.
//       </p>
//     </PolicyLayout>
//   </>
// );

// export default RefundReplacement;






import React from "react";
import SEO from "../components/SEO";
import PolicyLayout from "../layouts/PolicyLayout";

const RefundReplacement = () => (
  <>
    <SEO
      title="Refund & Replacement Policy | Swastik Handloom"
      description="Replacement-first policy for handloom products at Swastik Handloom. Refunds are issued only when replacement is not possible."
    />

    <PolicyLayout title="Refund & Replacement Policy">
      <p>
        At <strong>Swastik Handloom</strong>, we aim to ensure customer
        satisfaction while maintaining the integrity of traditional handloom
        products. Due to the handcrafted nature of these products, we follow a
        <strong> replacement-first policy</strong>.
      </p>

      <h2>1. Replacement Policy</h2>
      <p>
        If you receive a damaged, defective, or incorrect product, you may
        request a replacement within <strong>48 hours</strong> of delivery.
        Customers must contact our support team and provide relevant details
        such as order ID and product images.
      </p>

      <h2>2. Product Inspection</h2>
      <p>
        Once the replacement request is submitted, the product may be inspected
        or verified before approval. If the issue is confirmed, a replacement
        will be arranged based on product availability.
      </p>

      <h2>3. Refund Policy</h2>
      <p>
        Refunds are issued only in situations where a replacement is not
        possible, such as when the product is out of stock or unavailable.
      </p>

      <h2>4. Refund Processing</h2>
      <p>
        Approved refunds are processed to the original payment method within
        <strong> 5–7 working days</strong> after confirmation.
      </p>

      <h2>5. Non-Returnable Products</h2>
      <p>
        Products cannot be returned for reasons such as personal preference,
        minor color variations, or natural irregularities in handloom fabrics,
        as these are part of the handcrafted process.
      </p>
    </PolicyLayout>
  </>
);

export default RefundReplacement;

