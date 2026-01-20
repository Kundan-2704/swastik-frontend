import  { useEffect } from "react";
import Navbar from "../../Common/Navbar";
import AdminDrawerList from "../Sidebar/AdminDrawerList";
import AdminRoutes from "../../Routes/AdminRoutes";
import { useAppDispatch } from "../../Redux Toolkit/Store";
import { fetchHomeCategory } from "../../Redux Toolkit/Features/Admin/AdminSlice";

const Dashboard = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchHomeCategory(localStorage.getItem("jwt") || ""));
  }, [dispatch]);

  return (
    <div 
     
    className="min-h-screen bg-[#FFFCF7] flex flex-col">
      {/* ✅ NAVBAR */}
      <Navbar DrawerList={AdminDrawerList} />

      {/* ✅ BODY */}
      <div className="flex flex-1 overflow-hidden">
        {/* DRAWER */}
        <aside className="hidden lg:block w-[260px] flex-shrink-0">
          <AdminDrawerList />
        </aside>

        {/* PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-10">
          <AdminRoutes />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
