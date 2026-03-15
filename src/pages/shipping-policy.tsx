// import SEO from "../components/SEO";
// import PolicyLayout from "../layouts/PolicyLayout";

// const ShippingPolicy = () => (
//   <>
//     <SEO
//       title="Shipping Policy | Swastik Kosa & Tassar"
//       description="Shipping timelines, delivery partners, and processing information for Swastik Kosa & Tassar."
//     />
//     <PolicyLayout title="Shipping Policy">
//       <p>Orders are processed within 2–3 working days.</p>
//       <p>Delivery usually takes 3–7 working days.</p>
//       <p>Delays may occur due to weather or remote locations.</p>
//       <p>Incorrect address may result in re-shipping charges.</p>
//     </PolicyLayout>
//   </>
// );

// export default ShippingPolicy;





import React from "react";
import SEO from "../components/SEO";
import PolicyLayout from "../layouts/PolicyLayout";

const ShippingPolicy = () => (
  <>
    <SEO
      title="Shipping Policy | Swastik Handloom"
      description="Shipping timelines, order processing, and delivery information for Swastik Handloom marketplace."
    />

    <PolicyLayout title="Shipping Policy">
      <p>
        At <strong>Swastik Handloom</strong>, we strive to ensure timely and
        reliable delivery of all orders placed on our platform.
      </p>

      <h2>Order Processing</h2>
      <p>
        Orders are typically processed within <strong>2–3 working days</strong>
        after confirmation. Processing time may vary depending on product
        availability or seller dispatch timelines.
      </p>

      <h2>Delivery Time</h2>
      <p>
        After dispatch, delivery usually takes <strong>3–7 working days</strong>
        depending on the delivery location and courier service availability.
      </p>

      <h2>Delivery Partners</h2>
      <p>
        We work with trusted logistics partners to ensure safe and efficient
        delivery of your orders.
      </p>

      <h2>Shipping Delays</h2>
      <p>
        Delivery timelines may occasionally be affected by external factors
        such as weather conditions, courier delays, public holidays, or
        remote delivery locations.
      </p>

      <h2>Incorrect Address</h2>
      <p>
        Customers are responsible for providing accurate shipping information.
        If an incorrect or incomplete address results in a failed delivery,
        additional re-shipping charges may apply.
      </p>
    </PolicyLayout>
  </>
);

export default ShippingPolicy;
