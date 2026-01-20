// import { Divider } from "@mui/material";
// import React, { useState } from "react";
// import Order from "./Order";
// import OrderDetails from "./OrderDetails";
// import { Route, Routes, useNavigate } from "react-router";
// import UserDetails from "../Account/UserDetails";
// import { performLogout } from "../../../Redux Toolkit/Features/Auth/AuthSlice";
// import { useAppDispatch } from "../../../Redux Toolkit/Store";

// const menu = [
//   { name: "Orders", path: "/account/orders" },
//   { name: "Profile", path: "/account" },
//   { name: "Saved Card", path: "/account/saved-card" },
//   { name: "Addresses", path: "/account/addresses" },
//   { name: "Logout", path: "/" },
// ];

// const Profile = () => {

//   const dispatch=useAppDispatch();

//   const [active, setActive] = useState("Orders");
//   const navigate = useNavigate()

//   const handleClick=(item:any)=>{
//     if(item.name==="Logout")handleLogout();
//     navigate(item.path)
//   }

//   const handleLogout=()=>{
//     dispatch(performLogout());
//   }

//   return (
//     <div className="px-5 lg:px-52 min-h-screen mt-10 bg-[#FFFCF7]">
//       {/* USER NAME */}
//       <div>
//         <h1 className="text-2xl font-semibold pb-5 text-[#4A1F2A] tracking-wide">
//           Kundan
//         </h1>
//       </div>

//       <Divider sx={{ borderColor: "#E3D4B6" }} />

//       <div className="grid grid-cols-1 lg:grid-cols-3 lg:min-h-[78vh] mt-5 gap-5">

//         {/* LEFT MENU */}
//         <div className="col-span-1 lg:border-r border-[#E3D4B6] lg:pr-5 py-5 space-y-3">
//           {menu.map((item) => (
//             <div
//               key={item.path}
//               onClick={() => {
//                 setActive(item.name);
//                 handleClick(item)
//               }}

//               className={`px-5 py-3 rounded-xl cursor-pointer transition-all
//                 ${
//                   active === item.name
//                     ? "bg-[#FFF5E7] border border-[#B9935A] shadow-sm text-[#4A1F2A] font-semibold"
//                     : "text-[#7A6A58] hover:bg-[#FFF9F1] hover:shadow-sm hover:text-[#4A1F2A]"
//                 }
//               `}
//             >
//               <p className="tracking-wide">{item.name}</p>
//             </div>
//           ))}
//         </div>

//         {/* RIGHT CONTENT */}
//         <div className="lg:col-span-2 lg:pl-5 py-5 space-y-5">
//           {/* Orders + Details as you already had */}
//           <Routes>
//             <Route path="/" element={<UserDetails/>}/>
//             <Route path="/orders" element={<Order />}/>
//             <Route path="/orders/:orderId/item/:orderItemId" element={<OrderDetails />}/>
//           </Routes>


//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;








import { Divider, Avatar } from "@mui/material";
import React, { Suspense, useEffect, useMemo, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
import { performLogout } from "../../../Redux Toolkit/Features/Auth/AuthSlice";
import UserDetails from "../Account/UserDetails";
import OrderSkeleton from "./OrderSkeleton";

// Lazy load (PERFORMANCE 🔥)
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

  // ================================
  // ACTIVE MENU SYNC WITH URL
  // ================================
  useEffect(() => {
    const current = menu.find((m) =>
      location.pathname.startsWith(m.path)
    );
    if (current) setActive(current.name);
  }, [location.pathname]);

  // ================================
  // MENU CLICK
  // ================================
  const handleClick = (item: any) => {
    if (item.name === "Logout") {
      dispatch(performLogout());
      navigate("/", { replace: true });
      return;
    }
    navigate(item.path);
  };

  return (
    <div className="px-5 lg:px-52 min-h-screen mt-10 bg-[#FFFCF7]">

      {/* ==========================
          AMAZON STYLE PROFILE CARD
         ========================== */}
      <div className="bg-[#FFF5E7] p-5 rounded-xl border border-[#E3D4B6] shadow-sm flex items-center gap-4 mb-5">
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

      <Divider sx={{ borderColor: "#E3D4B6" }} />

      <div className="grid grid-cols-1 lg:grid-cols-3 lg:min-h-[78vh] mt-5 gap-5">

        {/* ==========================
              LEFT MENU (STICKY)
           ========================== */}
        <div className="col-span-1 lg:border-r border-[#E3D4B6] lg:pr-5 py-5">
          <div className="sticky top-24 space-y-2">
            {menu.map((item) => (
              <button
                key={item.path}
                onClick={() => handleClick(item)}
                className={`w-full text-left px-5 py-3 rounded-xl transition-all
                  ${active === item.name
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

        {/* ==========================
              RIGHT CONTENT AREA
           ========================== */}
        <div className="lg:col-span-2 lg:pl-5 py-5 space-y-5">
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
