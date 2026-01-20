import { useEffect, useRef } from "react";
import Navbar from "../customer/Navbar/Navbar";
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
import { fetchNotifications } from "../Redux Toolkit/Features/Customer/NotificationSlice";
import { socket } from "../socket";
import Policies from "../pages/Policies";

const CustomerRoutes = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const dispatch = useAppDispatch();

 

useEffect(() => {
  socket.on("notification", (data) => {
    console.log("🔔 Notification received:", data);

    dispatch(fetchNotifications()); // DB se refresh
  });

  return () => {
    socket.off("notification");
  };
}, [dispatch]);



  return (
    <div
      ref={scrollRef}
      className="customer-scroll min-h-screen"
    >


      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:categoryId" element={<Products />} />
        <Route
          path="/product-details/:categoryId/:name/:productId"
          element={<ProductDetails />}
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout/address" element={<Checkout />} />

        <Route path="/order-success" element={<OrderSuccess />} />

        <Route path="/account/*" element={<Profile />} />

        <Route path="/policies" element={<Policies />} />

      </Routes>

      <Footer />




    </div>
  );
};

export default CustomerRoutes;
