
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
