import { useEffect, useRef } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../customer/pages/Home/Home";
import ProductDetails from "../customer/pages/product/ProductDetails/ProductDetails";
import Cart from "../customer/pages/Cart/Cart";
import Checkout from "../customer/pages/Checkout/Checkout";
import Profile from "../customer/pages/Orders/Profile";
import Footer from "../customer/Footer/Footer";
import Products from "../customer/pages/product/Products";

import "../customer/style/customer-scroll.css";
import OrderSuccess from "../customer/pages/Checkout/OrderSuccess";
import { useAppDispatch, useAppSelector } from "../Redux Toolkit/Store";
import Policies from "../pages/Policies";
import PrivacyPolicy from "../pages/privacy-policy";
import Terms from "../pages/terms-conditions";
import RefundReplacement from "../pages/refund-replacement";
import Shipping from "../pages/shipping-policy";
import Contact from "../pages/contact-us";
import SellerPolicy from "../pages/seller-policy";
import Authenticity from "../pages/product-authenticity";
import Wishlist from "../pages/Wishlist/Wishlist";
import Navbar from "../customer/Navbar/Navbar";
const CustomerRoutes = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const dispatch = useAppDispatch();

 




  return (
    <div
      ref={scrollRef}
      className="customer-scroll min-h-screen"
    >


      <Navbar />
<div className="pt-[95px] lg:pt-0">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:categoryId" element={<Products />} />
        <Route
          path="/product-details/:categoryId/:name/:productId"
          element={<ProductDetails />}
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/checkout/address" element={<Checkout />} />

        <Route path="/order-success" element={<OrderSuccess />} />

        <Route path="/account/*" element={<Profile />} />

        <Route path="/policies" element={<Policies />} />

        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
<Route path="/terms-conditions" element={<Terms />} />
<Route path="/refund-replacement" element={<RefundReplacement />} />
<Route path="/shipping-policy" element={<Shipping />} />
<Route path="/contact-us" element={<Contact />} />
<Route path="/seller-policy" element={<SellerPolicy />} />
<Route path="/product-authenticity" element={<Authenticity />} />


      </Routes>
</div>
      <Footer />




    </div>
  );
};

export default CustomerRoutes;
