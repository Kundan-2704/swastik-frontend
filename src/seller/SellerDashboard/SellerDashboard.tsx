





import React, { useEffect } from "react";
import SellerDrawerList from "./Sidebar/SellerDrawerList";
import SellerRoutes from "../../Routes/SellerRoutes";
import Navbar from "../../Common/Navbar";
import { useAppDispatch, useAppSelector } from "../../Redux Toolkit/Store";
import { fetchSellerReport } from "../../Redux Toolkit/Features/Seller/SellerSlice";
// SellerDashboard.tsx
import "../../seller/style/dashboard.css";
import { socket } from "../../socket";
import { fetchSellerNotifications } from "../../Redux Toolkit/Features/Seller/NotificationSlice";


const SellerDashboard: React.FC = () => {
  const dispatch = useAppDispatch();

useEffect(() => {
  socket.on("notification", (data) => {
    console.log("🔔 Notification received:", data);

    dispatch(fetchSellerNotifications()); // DB se refresh
  });

  return () => {
    socket.off("notification");
  };
}, [dispatch]);


  const sellerJwt = useAppSelector(
    (state) => state.seller.sellerAuth.jwt
  );

  useEffect(() => {
    if (sellerJwt) {
      dispatch(fetchSellerReport());
    }
  }, [dispatch, sellerJwt]);


 


  return (
    <div data-lenis-prevent   // 🔥🔥🔥 REQUIRED
      className="h-screen bg-[#FFFCF7] overflow-hidden">
      {/* ===== NAVBAR (FIXED HEIGHT) ===== */}
      <div className="h-16 shrink-0">
        <Navbar DrawerList={SellerDrawerList} />
      </div>

      {/* ===== BODY ===== */}
      <section className="flex h-[calc(100vh-4rem)] overflow-hidden">
        {/* ===== SIDEBAR ===== */}
        <aside className="hidden lg:block w-64 shrink-0 border-r overflow-hidden">
          <SellerDrawerList />
        </aside>

        {/* ===== CONTENT (ONLY SCROLL HERE) ===== */}
        <main className="dashboard-content flex-1 overflow-y-auto p-4 lg:p-10">
          <SellerRoutes />
        </main>
      </section>
    </div>
  );
};

export default SellerDashboard;
