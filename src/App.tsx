

import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@mui/material";
import { customeTheme } from "./Theme/customeTheme";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Route, Routes } from "react-router-dom";
import SellerDashboard from "./seller/SellerDashboard/SellerDashboard";
import BecomeSeller from "./Auth/Become Seller/BecomeSeller";
import CustomerRoutes from "./Routes/CustomerRoutes";
import Auth from "./Auth/Auth";
import SellerLogin from "./Auth/Login/SellerLogin";
import SellerProtectedRoute from "./Routes/SellerProtectedRoute";

import { useAppDispatch, useAppSelector } from "./Redux Toolkit/Store";
import { useEffect } from "react";
import { fetchUserProfile, resetUserState } from "./Redux Toolkit/Features/Customer/UserSlice";
import { createHomeCategory } from "./Redux Toolkit/Features/Customer/HomeCategorySlice";
import { homeCategories } from "./Data/Category/HomeCategories";
import AdminLogin from "./admin/Login/AdminLogin";
import AdminRoute from "./Routes/AdminRoute";
import AdminLayout from "./admin/Layout/AdminLayout";
import AdminRoutes from "./Routes/AdminRoutes";
import AdminDashboard from "./admin/Dashboard/AdminDashboard";
import CustomersTable from "./admin/Customer/CustomersTable";
import SellerTable from "./admin/Seller/SellerTable";
import SellerApproval from "./admin/Seller/SellerApproval";
import OrdersTable from "./admin/Order/OrdersTable";
import OrderDetails from "./admin/Order/OrderDetails";
import PendingApproval from "./Auth/Become Seller/PendingApproval";
// import { GlobalAIAgent } from "./ai-agent/GlobalAIAgent";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AffiliateWithdraw from "./affiliate/pages/AffiliateWithdraw";
import AffiliateCommissions from "./affiliate/pages/AffiliateCommissions";
import AffiliateDashboard from "./affiliate/pages/AffiliateDashboard";
import AffiliateLayout from "./affiliate/layout/AffiliateLayout";
import { requestNotificationPermission } from "./hooks/usePushNotification";

function App() {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);





  // ✅ CUSTOMER PROFILE LOAD (ONLY CUSTOMER)
  // useEffect(() => {
  //   const customerJwt = localStorage.getItem("jwt");
  //   if (customerJwt || auth.jwt) {
  //     dispatch(fetchUserProfile());
  //   }
  // }, [auth.jwt, dispatch]);

//   useEffect(() => {
//   const customerJwt = localStorage.getItem("jwt");

//   if (customerJwt || auth.jwt) {
//     dispatch(fetchUserProfile());
//   } else {
//     dispatch(resetUserState());   // 👈 VERY IMPORTANT
//   }
// }, []);

useEffect(() => {
  if (auth.jwt) {
    dispatch(fetchUserProfile());
  } else {
    dispatch(resetUserState());
  }
}, [auth.jwt]);

  // ✅ HOME CATEGORIES (SAFE GLOBAL)
  useEffect(() => {
    dispatch(createHomeCategory(homeCategories));
  }, [dispatch]);

//  useEffect(() => {
//   requestNotificationPermission();
// }, []);


// ✅ NAYA — App.tsx mein yeh lagao:
useEffect(() => {
  const jwt = localStorage.getItem("jwt");
  const sellerJwt = localStorage.getItem("seller_jwt");

  if (sellerJwt) {
    requestNotificationPermission("seller");
  } else if (jwt) {
    requestNotificationPermission("user");
  }
}, [auth.jwt]); // auth change hone pe dobara run hoga

  return (
    <ThemeProvider theme={customeTheme}>

 


      <Toaster position="top-right" />

      <Routes>

        {/* ================= PUBLIC ROUTES ================= */}
        <Route path="/login" element={<Auth />} />
        <Route path="/become-seller" element={<BecomeSeller />} />
        <Route path="/seller/login" element={<SellerLogin />} />
        <Route
  path="/seller/pending-approval"
  element={<PendingApproval />}
/>
    

        {/* ================= SELLER (PROTECTED) ================= */}
        <Route
          path="/seller/*"
          element={
            <SellerProtectedRoute>
              <SellerDashboard />
            </SellerProtectedRoute>
          }
        />

        {/* ================= ADMIN ================= */}
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          {/* 👇 NESTED ADMIN ROUTES */}
          <Route index element={<AdminDashboard />} />
          <Route path="customers" element={<CustomersTable />} />
          <Route path="sellers" element={<SellerTable />} />
          <Route path="sellers/approval" element={<SellerApproval />} />
          <Route path="orders" element={<OrdersTable />} />
          <Route path="orders/:orderId" element={<OrderDetails />} />
          <Route path="*" element={<AdminRoutes />} />
        </Route>

{/* ================= AFFILIATE MOCK ================= */}
<Route path="/affiliate" element={<AffiliateLayout />}>
  <Route path="dashboard" element={<AffiliateDashboard />} />
  <Route path="commissions" element={<AffiliateCommissions />} />
  <Route path="withdraw" element={<AffiliateWithdraw />} />
</Route>

        {/* ================= CUSTOMER ================= */}
        <Route path="/*" element={<CustomerRoutes />} />




      </Routes>

{/* <GlobalAIAgent /> */}

    </ThemeProvider>
  );
}

export default App;
