



import Navbar from "../../Common/Navbar";
import AdminDrawerList from "../Sidebar/AdminDrawerList";
import { Outlet } from "react-router-dom";
// AdminLayout.tsx
import "../../admin/style/admin-dashboard.css";


const AdminLayout = () => {


  return (
    <div
      data-lenis-prevent
      className="h-screen bg-[#FFFCF7] overflow-hidden">
      {/* ===== TOP NAVBAR (FIXED HEIGHT) ===== */}
      <div className="h-16 shrink-0">
        <Navbar DrawerList={AdminDrawerList} />
      </div>

      {/* ===== PAGE BODY ===== */}
      <section className="flex h-[calc(100vh-4rem)] overflow-hidden">
        {/* ===== SIDEBAR (DESKTOP) ===== */}
        <aside className="hidden lg:block w-64 shrink-0 overflow-hidden border-r">
          <AdminDrawerList />
        </aside>

        {/* ===== MAIN CONTENT (ONLY SCROLL HERE) ===== */}
        <main className="admin-dashboard-content flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </section>
    </div>
  );
};

export default AdminLayout;
