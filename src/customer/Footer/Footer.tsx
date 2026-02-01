


// import { Link } from "react-router-dom";

// const Footer = () => {
//   return (
//     <footer className="mt-20 bg-[#3B302A] text-[#FFF8ED]">
//       {/* Upper section */}
//       <div className="max-w-6xl mx-auto px-4 lg:px-8 py-12 border-b border-[#C89F5D]/40">
//         <div className="grid gap-10 md:grid-cols-4">
//           {/* Brand */}
//           <div className="md:col-span-2 space-y-4">
//             <div className="flex items-center gap-3">
//               <div className="h-10 w-10 rounded-full border border-[#C89F5D] flex items-center justify-center text-sm font-semibold tracking-[0.2em]">
//                 {/* Swastik icon placeholder – replace with your SVG/logo */}
//                 S
//               </div>
//               <div>
//                 <p className="text-lg font-semibold tracking-wide">
//                   Swastik Kosa & Tassar
//                 </p>
//                 <p className="text-xs uppercase tracking-[0.2em] text-[#D9A86C]">
//                   Handcrafted • Heritage • Luxury
//                 </p>
//               </div>
//             </div>
//             <p className="text-sm leading-relaxed text-[#EAD9BF]">
//               Curated premium Kosa & Tassar sarees, handwoven by master
//               artisans of Chhattisgarh. Ethical, authentic and crafted for
//               timeless wardrobes.
//             </p>
//           </div>

//           {/* Quick links */}
//           <div className="space-y-3">
//             <h4 className="text-sm font-semibold tracking-wide text-[#D9A86C]">
//               SHOP
//             </h4>
//             <ul className="space-y-2 text-sm text-[#FFF8ED]/80">
//               <li className="hover:text-[#D9A86C] transition-colors cursor-pointer">
//                 Kosa Sarees
//               </li>
//               <li className="hover:text-[#D9A86C] transition-colors cursor-pointer">
//                 Tassar Sarees
//               </li>
//               <li className="hover:text-[#D9A86C] transition-colors cursor-pointer">
//                 Handloom Collection
//               </li>
//               <li className="hover:text-[#D9A86C] transition-colors cursor-pointer">
//                 Wedding Edit
//               </li>
//             </ul>
//           </div>

//           {/* Support */}
//           <div className="space-y-3">
//             <h4 className="text-sm font-semibold tracking-wide text-[#D9A86C]">
//               SUPPORT
//             </h4>
//             <ul className="space-y-2 text-sm text-[#FFF8ED]/80">
//               <li className="hover:text-[#D9A86C] transition-colors cursor-pointer">
//                 Shipping & Returns
//               </li>
//               <li className="hover:text-[#D9A86C] transition-colors cursor-pointer">
//                 Care Instructions
//               </li>
//               <li className="hover:text-[#D9A86C] transition-colors cursor-pointer">
//                 FAQs
//               </li>
//               <li className="hover:text-[#D9A86C] transition-colors cursor-pointer">
//                 Contact Us
//               </li>
//             </ul>
//           </div>
//         </div>

//         {/* Newsletter */}
//         <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//           <div className="space-y-1">
//             <p className="text-sm font-medium">Stay in touch</p>
//             <p className="text-xs text-[#EAD9BF]">
//               Get updates on new collections, craft stories and exclusive
//               offers.
//             </p>
//           </div>
//           <form className="flex w-full max-w-md gap-2">
//             <input
//               type="email"
//               placeholder="Enter your email"
//               className="flex-1 rounded-full bg-[#FFF8ED]/5 border border-[#C89F5D]/40 px-4 py-2 text-xs outline-none placeholder:text-[#EAD9BF] focus:border-[#D9A86C]"
//             />
//             <button
//               type="submit"
//               className="rounded-full bg-[#8B5E34] px-5 py-2 text-xs font-semibold tracking-wide hover:bg-[#6B4423] transition-colors"
//             >
//               Subscribe
//             </button>
//           </form>
//         </div>
//       </div>

//       {/* Bottom bar */}
//       <div className="max-w-6xl mx-auto px-4 lg:px-8 py-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between text-[11px] text-[#EAD9BF]">
//         <p>© {new Date().getFullYear()} Swastik Kosa & Tassar. All rights reserved.</p>
//         <div className="flex flex-wrap gap-4 items-center">
//           <Link
//             to="/policies"
//             className="hover:text-[#D9A86C] transition-colors"
//           >
//             Terms & Policies
//           </Link>

//           <span className="hidden md:inline-block">•</span>

//           <Link
//             to="/policies"
//             className="hover:text-[#D9A86C] transition-colors"
//           >
//             Privacy Policy
//           </Link>

//           <span className="hidden md:inline-block">•</span>

//           <span>Secure Payments via Razorpay</span>
//         </div>

//       </div>
//     </footer>
//   );
// };

// export default Footer;






import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      className="mt-20 bg-[#3B302A] text-[#FFF8ED]"
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* Upper section */}
      <div className="max-w-6xl mx-auto px-4 lg:px-8 py-12 border-b border-[#C89F5D]/40">
        <div className="grid gap-10 md:grid-cols-4">
          
          {/* Brand */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div
                className="h-10 w-10 rounded-full border border-[#C89F5D] flex items-center justify-center text-sm font-semibold tracking-[0.2em]"
                aria-hidden="true"
              >
                S
              </div>
              <div>
                <p className="text-lg font-semibold tracking-wide">
                  Swastik Kosa & Tassar
                </p>
                <p className="text-xs uppercase tracking-[0.2em] text-[#D9A86C]">
                  Handcrafted • Heritage • Luxury
                </p>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-[#EAD9BF]">
              Authentic Kosa & Tassar handloom sarees, handwoven by verified
              artisans of Chhattisgarh. GI-tagged, ethical, and timeless.
            </p>

            {/* Contact quick info */}
            <p className="text-xs text-[#EAD9BF]/80">
              Support:{" "}
              <a
                href="mailto:support@swastikhandloom.com"
                className="underline hover:text-[#D9A86C]"
              >
                support@swastikhandloom.com
              </a>{" "}
              |{" "}
              <a
                href="tel:+91XXXXXXXXXX"
                className="underline hover:text-[#D9A86C]"
              >
                +91XXXXXXXXXX
              </a>
            </p>
          </div>

          {/* Shop */}
          <nav aria-label="Footer shop links">
            <h4 className="text-sm font-semibold text-[#D9A86C] mb-3">SHOP</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/kosa-sarees">Kosa Sarees</Link></li>
              <li><Link to="/tassar-sarees">Tassar Sarees</Link></li>
              <li><Link to="/handloom">Handloom Collection</Link></li>
              <li><Link to="/wedding-edit">Wedding Edit</Link></li>
            </ul>
          </nav>

          {/* Support */}
          <nav aria-label="Footer support links">
            <h4 className="text-sm font-semibold text-[#D9A86C] mb-3">SUPPORT</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/shipping-policy">Shipping Policy</Link></li>
              <li><Link to="/refund-replacement">Refund & Replacement</Link></li>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/contact-us">Contact Us</Link></li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Bottom */}
      <div className="max-w-6xl mx-auto px-4 py-4 text-[11px] text-[#EAD9BF] flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} Swastik Kosa & Tassar. All rights reserved.
        </p>

        <nav
          className="flex flex-wrap gap-3"
          aria-label="Footer legal links"
        >
          <Link to="/terms-conditions">Terms</Link>
          <Link to="/privacy-policy">Privacy</Link>
          <Link to="/refund-replacement">Refund</Link>
          <Link to="/shipping-policy">Shipping</Link>
          <Link to="/seller-policy">Seller Policy</Link>
          <Link to="/product-authenticity">Authenticity</Link>
          <span aria-label="Payment security notice">
            Secure Payments via Razorpay
          </span>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
