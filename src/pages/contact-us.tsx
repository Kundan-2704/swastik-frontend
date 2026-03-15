// import SEO from "../components/SEO";
// import PolicyLayout from "../layouts/PolicyLayout";

// const ContactUs = () => (
//   <>
//     <SEO
//       title="Contact Us | Swastik Kosa & Tassar"
//       description="Contact Swastik Kosa & Tassar for support, orders, and handloom queries."
//     />
//     <PolicyLayout title="Contact Us">
//       <p>Email: support@swastikhandloom.com</p>
//       <p>Phone: +91-9244576470</p>
//       <p>Address: Ward No. 21, House No. 104
//         Batapara, Champa
//         Janjgir-Champa, Chhattisgarh – 495671
//         India</p>
//     </PolicyLayout>
//   </>
// );

// export default ContactUs;



import React from "react";
import SEO from "../components/SEO";
import PolicyLayout from "../layouts/PolicyLayout";

const ContactUs: React.FC = () => {
  return (
    <>
      <SEO
        title="Contact Us | Swastik Kosa & Tussar"
        description="Get in touch with Swastik Kosa & Tussar for product inquiries, order support, and handloom assistance."
      />

      <PolicyLayout title="Contact Us">
        <div style={{ lineHeight: "1.8", maxWidth: "700px" }}>

          <p>
            If you have any questions about our handloom products, orders,
            or customer support services, feel free to contact us using
            the details below.
          </p>

          <p>
            <strong>Email:</strong>{" "}
            <a href="mailto:support@swastikhandloom.com">
              support@swastikhandloom.com
            </a>
          </p>

          <p>
            <strong>Phone:</strong>{" "}
            <a href="tel:+919244576470">
              +91 92445 76470
            </a>
          </p>

          <p>
            <strong>WhatsApp:</strong>{" "}
            <a
              href="https://wa.me/919244576470"
              target="_blank"
              rel="noopener noreferrer"
            >
              Chat with us on WhatsApp
            </a>
          </p>

          <p>
            <strong>Business Address:</strong>
            <br />
            Ward No. 21, House No. 104
            <br />
            Batapara, Champa
            <br />
            Janjgir-Champa, Chhattisgarh – 495671
            <br />
            India
          </p>

          <p>
            <strong>Customer Support Hours:</strong>
            <br />
            Monday – Saturday
            <br />
            10:00 AM – 6:00 PM IST
          </p>

          <p>
            We usually respond to all queries within 24 hours during
            business days.
          </p>

        </div>
      </PolicyLayout>
    </>
  );
};

export default ContactUs;
