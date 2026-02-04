// import { Divider, Avatar } from "@mui/material";
// import React, { Suspense, useEffect, useMemo, useState } from "react";
// import { Route, Routes, useLocation, useNavigate } from "react-router";
// import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
// import { performLogout } from "../../../Redux Toolkit/Features/Auth/AuthSlice";
// import UserDetails from "../Account/UserDetails";
// import OrderSkeleton from "./OrderSkeleton";

// // Lazy load (PERFORMANCE 🔥)
// const Order = React.lazy(() => import("./Order"));
// const OrderDetails = React.lazy(() => import("./OrderDetails"));

// const menu = [
//   { name: "Profile", path: "/account" },
//   { name: "Orders", path: "/account/orders" },
//   { name: "Saved Card", path: "/account/saved-card" },
//   { name: "Addresses", path: "/account/addresses" },
//   { name: "Logout", path: "/" },
// ];

// const Profile = () => {
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const user = useAppSelector((state) => state.user.user);

//   const [active, setActive] = useState("Profile");

//   // ================================
//   // ACTIVE MENU SYNC WITH URL
//   // ================================

//   useEffect(() => {
//   const current = [...menu]
//     .sort((a, b) => b.path.length - a.path.length)
//     .find((m) => location.pathname.startsWith(m.path));

//   if (current) setActive(current.name);
// }, [location.pathname]);


//   // ================================
//   // MENU CLICK
//   // ================================
//   const handleClick = (item: any) => {
//     if (item.name === "Logout") {
//       dispatch(performLogout());
//       navigate("/", { replace: true });
//       return;
//     }
//     navigate(item.path);
//   };

//   return (
//     <div className="px-5 lg:px-52 min-h-screen mt-10 bg-[#FFFCF7]">

//       {/* ==========================
//           AMAZON STYLE PROFILE CARD
//          ========================== */}
//       <div className="bg-[#FFF5E7] p-5 rounded-xl border border-[#E3D4B6] shadow-sm flex items-center gap-4 mb-5">
//         <Avatar sx={{ bgcolor: "#4A1F2A", width: 56, height: 56 }}>
//           {user?.fullName?.[0]}
//         </Avatar>
//         <div>
//           <p className="text-xs text-[#7A6A58]">Hello 👋</p>
//           <h1 className="text-lg font-semibold text-[#4A1F2A]">
//             {user?.fullName || "User"}
//           </h1>
//           <p className="text-xs text-[#7A6A58]">{user?.email}</p>
//         </div>
//       </div>

//       <Divider sx={{ borderColor: "#E3D4B6" }} />

//       <div className="grid grid-cols-1 lg:grid-cols-3 lg:min-h-[78vh] mt-5 gap-5">

//         {/* ==========================
//               LEFT MENU (STICKY)
//            ========================== */}
//         <div className="col-span-1 lg:border-r border-[#E3D4B6] lg:pr-5 py-5">
//           <div className="sticky top-24 space-y-2">
//             {menu.map((item) => (
//               <button
//                 key={item.path}
//                 onClick={() => handleClick(item)}
//                 className={`w-full text-left px-5 py-3 rounded-xl transition-all
//                   ${active === item.name
//                     ? "bg-[#FFF5E7] border border-[#B9935A] shadow-sm text-[#4A1F2A] font-semibold"
//                     : "text-[#7A6A58] hover:bg-[#FFF9F1] hover:text-[#4A1F2A]"
//                   }
//                 `}
//               >
//                 {item.name}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* ==========================
//               RIGHT CONTENT AREA
//            ========================== */}
//         <div className="lg:col-span-2 lg:pl-5 py-5 space-y-5">
//           <Suspense fallback={<OrderSkeleton />}>
//             <Routes>
//               <Route path="/" element={<UserDetails />} />
//               <Route path="/orders" element={<Order />} />
//               <Route
//                 path="/orders/:orderId/item/:orderItemId"
//                 element={<OrderDetails />}
//               />
//             </Routes>
//           </Suspense>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;







import { Divider, Avatar } from "@mui/material";
import React, { Suspense, useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
import { performLogout } from "../../../Redux Toolkit/Features/Auth/AuthSlice";
import UserDetails from "../Account/UserDetails";
import OrderSkeleton from "./OrderSkeleton";

// Lazy loaded pages
const Order = React.lazy(() => import("./Order"));
const OrderDetails = React.lazy(() => import("./OrderDetails"));

const menu = [
  { name: "Profile", path: "/account" },
  { name: "Orders", path: "/account/orders" },
  { name: "Saved Card", path: "/account/saved-card" },
  { name: "Addresses", path: "/account/addresses" },
  { name: "Logout", path: "/" },
];

const Profile = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const user = useAppSelector((state) => state.user.user);
  const [active, setActive] = useState("Profile");
  const [openMenu, setOpenMenu] = useState(false);


  // 🔥 Active menu sync (FIXED)
  useEffect(() => {
    const current = [...menu]
      .sort((a, b) => b.path.length - a.path.length)
      .find((m) => location.pathname.startsWith(m.path));

    if (current) setActive(current.name);
  }, [location.pathname]);

  // 🔥 Navigation handler
  const handleClick = (item) => {
    if (item.name === "Logout") {
      dispatch(performLogout());
      navigate("/", { replace: true });
      return;
    }
    navigate(item.path);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-52 min-h-screen mt-6 bg-[#FFFCF7]">

      {/* ================= PROFILE HEADER ================= */}
      <div className="bg-[#FFF5E7] p-5 rounded-xl border border-[#E3D4B6] shadow-sm flex items-center gap-4">
        <Avatar sx={{ bgcolor: "#4A1F2A", width: 56, height: 56 }}>
          {user?.fullName?.[0]}
        </Avatar>
        <div>
          <p className="text-xs text-[#7A6A58]">Hello 👋</p>
          <h1 className="text-lg font-semibold text-[#4A1F2A]">
            {user?.fullName || "User"}
          </h1>
          <p className="text-xs text-[#7A6A58]">{user?.email}</p>
        </div>
      </div>

      <Divider sx={{ borderColor: "#E3D4B6", my: 3 }} />

      {/* ================= MOBILE MENU ================= */}
     {/* ================= MOBILE MENU (CUSTOM) ================= */}
<div className="lg:hidden relative mb-4">
  <button
    onClick={() => setOpenMenu(!openMenu)}
    className="w-full flex justify-between items-center px-4 py-3 rounded-xl
      border border-[#E3D4B6] bg-[#FFF5E7] text-[#4A1F2A] shadow-sm"
  >
    <span className="font-medium">{active}</span>
    <span className="text-sm">▾</span>
  </button>

  {openMenu && (
    <div className="absolute z-50 mt-2 w-full rounded-xl border border-[#E3D4B6]
      bg-[#FFFCF7] shadow-lg overflow-hidden">
      {menu
        .filter(m => m.name !== "Logout")
        .map(item => (
          <button
            key={item.name}
            onClick={() => {
              handleClick(item);
              setOpenMenu(false);
            }}
            className={`w-full text-left px-4 py-3 transition-all
              ${
                active === item.name
                  ? "bg-[#FFF5E7] text-[#4A1F2A] font-semibold"
                  : "hover:bg-[#FFF9F1] text-[#7A6A58]"
              }
            `}
          >
            {item.name}
          </button>
        ))}
    </div>
  )}
</div>


      {/* ================= MAIN GRID ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ================= DESKTOP SIDEBAR ================= */}
        <div className="hidden lg:block lg:col-span-1 border-r border-[#E3D4B6] pr-5">
          <div className="sticky top-24 space-y-2">
            {menu.map((item) => (
              <button
                key={item.path}
                onClick={() => handleClick(item)}
                className={`w-full text-left px-5 py-3 rounded-xl transition-all
                  ${
                    active === item.name
                      ? "bg-[#FFF5E7] border border-[#B9935A] shadow-sm text-[#4A1F2A] font-semibold"
                      : "text-[#7A6A58] hover:bg-[#FFF9F1] hover:text-[#4A1F2A]"
                  }
                `}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>

        {/* ================= CONTENT ================= */}
        <div className="lg:col-span-2 py-2 space-y-5">
          <Suspense fallback={<OrderSkeleton />}>
            <Routes>
              <Route path="/" element={<UserDetails />} />
              <Route path="/orders" element={<Order />} />
              <Route
                path="/orders/:orderId/item/:orderItemId"
                element={<OrderDetails />}
              />
            </Routes>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Profile;
