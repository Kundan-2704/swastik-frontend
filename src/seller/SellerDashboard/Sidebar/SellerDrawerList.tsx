
import {
  AccountBox,
  Dashboard,
  Inventory,
  LibraryAdd,
  Logout,
  Payment as PaymentIcon,
  ReceiptLong,
  ShoppingBag,
  AssignmentReturn,
  AccountBalanceWallet,
  Assessment,
  Star,
  Settings,
  Edit,
  FireTruck,
} from "@mui/icons-material";
import LocalOffer from "@mui/icons-material/LocalOffer";
import { ListItemIcon, ListItemText } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../Redux Toolkit/Store";
import { logoutSeller } from "../../../Redux Toolkit/Features/Seller/SellerAuthenticationSlice";

/* ================= TYPES ================= */

type ToggleDrawerFn = (open: boolean) => () => void;

interface MenuItem {
  name: string;
  path: string;
  icon: React.ReactNode;
  activeIcon: React.ReactNode;
}

/* ================= TOP MENU ================= */

const menu: MenuItem[] = [
  {
    name: "Dashboard",
    path: "/seller",
    icon: <Dashboard />,
    activeIcon: <Dashboard className="text-white" />,
  },
  {
    name: "Orders",
    path: "/seller/orders",
    icon: <ShoppingBag />,
    activeIcon: <ShoppingBag className="text-white" />,
  },
  {
  name: "Shipping",
  path: "/seller/shipping",
  icon: <FireTruck />,
  activeIcon: <FireTruck className="text-white" />,
},

  {
    name: "Returns",
    path: "/seller/returns",
    icon: <AssignmentReturn />,
    activeIcon: <AssignmentReturn className="text-white" />,
  },
  {
    name: "Products",
    path: "/seller/products",
    icon: <Inventory />,
    activeIcon: <Inventory className="text-white" />,
  },
  {
    name: "Add Product",
    path: "/seller/add-product",
    icon: <LibraryAdd />,
    activeIcon: <LibraryAdd className="text-white" />,
  },
   {
    name: "Deals",
    path: "/seller/deals",
    icon: <LocalOffer />,
    activeIcon: <LocalOffer className="text-white" />,
  },
  {
    name: "Payments",
    path: "/seller/payments",
    icon: <PaymentIcon />,
    activeIcon: <PaymentIcon className="text-white" />,
  },
  {
    name: "Payouts",
    path: "/seller/payouts",
    icon: <AccountBalanceWallet />,
    activeIcon: <AccountBalanceWallet className="text-white" />,
  },
  {
    name: "Transactions",
    path: "/seller/transactions",
    icon: <ReceiptLong />,
    activeIcon: <ReceiptLong className="text-white" />,
  },
  {
    name: "Reports",
    path: "/seller/reports",
    icon: <Assessment />,
    activeIcon: <Assessment className="text-white" />,
  },
  {
    name: "Reviews",
    path: "/seller/reviews",
    icon: <Star />,
    activeIcon: <Star className="text-white" />,
  },
];

/* ================= BOTTOM MENU ================= */

const menu2: MenuItem[] = [
  {
    name: "Account",
    path: "/seller/account",
    icon: <AccountBox />,
    activeIcon: <AccountBox className="text-white" />,
  },
  {
    name: "Settings",
    path: "/seller/settings",
    icon: <Settings />,
    activeIcon: <Settings className="text-white" />,
  },
  {
    name: "Logout",
    path: "/seller/login",
    icon: <Logout />,
    activeIcon: <Logout className="text-white" />,
  },
];

interface SellerDrawerListProps {
  toggleDrawer?: ToggleDrawerFn;
}

/* ================= COMPONENT ================= */

// const SellerDrawerList: React.FC<SellerDrawerListProps> = ({
//   toggleDrawer = () => () => { },
// }) => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();

//   const isActive = (path: string): boolean => location.pathname === path;

//   const handleLogout = () => {
//     dispatch(logoutSeller());
//     navigate("/seller/login", { replace: true });
//     toggleDrawer(false)();
//   };

//   return (
//     <div
//       className="flex flex-col justify-between h-full w-[260px] bg-[#FFFCF7]"
//       style={{ borderRight: "1px solid #E3D4B6" }}
//     >
//       {/* ================= TOP MENU ================= */}
//       <div className="space-y-2 mt-5">
//         {menu.map((item) => (
//           <div
//             key={item.path}
//             onClick={() => {
//               navigate(item.path);
//               toggleDrawer(false)();
//             }}
//             className={`
//               flex items-center gap-4 cursor-pointer px-6 py-3 rounded-r-full transition-all
//               ${isActive(item.path)
//                 ? "bg-[#B9935A] text-white shadow-md"
//                 : "text-[#4A1F2A] hover:bg-[#FFF5E7]"
//               }
//             `}
//           >
//             <ListItemIcon className="min-w-[36px]">
//               {isActive(item.path) ? item.activeIcon : item.icon}
//             </ListItemIcon>
//             <ListItemText primary={item.name} />
//           </div>
//         ))}
//       </div>

//       {/* ================= BOTTOM MENU ================= */}
//       <div
//         className="space-y-2 mb-5 pb-3 border-t pt-5"
//         style={{ borderColor: "#E3D4B6" }}
//       >
//         {menu2.map((item) => (
//           <div
//             key={item.path}
//             onClick={() => {
//               if (item.name === "Logout") {
//                 handleLogout();
//               } else {
//                 navigate(item.path);
//                 toggleDrawer(false)();
//               }
//             }}
//             className={`
//               flex items-center gap-4 cursor-pointer px-6 py-3 rounded-r-full transition-all
//               ${isActive(item.path)
//                 ? "bg-[#B9935A] text-white shadow-md"
//                 : "text-[#4A1F2A] hover:bg-[#FFF5E7]"
//               }
//             `}
//           >
//             <ListItemIcon className="min-w-[36px]">
//               {isActive(item.path) ? item.activeIcon : item.icon}
//             </ListItemIcon>
//             <ListItemText primary={item.name} />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };


const SellerDrawerList: React.FC<SellerDrawerListProps> = ({
  toggleDrawer = () => () => {},
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isActive = (path: string): boolean => location.pathname === path;

  const handleLogout = () => {
    dispatch(logoutSeller());
    navigate("/seller/login", { replace: true });
    toggleDrawer(false)();
  };

  return (
    <div
      data-lenis-prevent   // 🔥🔥🔥 REQUIRED
      className="flex flex-col h-full w-[260px] bg-[#FFFCF7]"
      style={{ borderRight: "1px solid #E3D4B6" }}
    >
      {/* ================= TOP MENU (SCROLLABLE) ================= */}
      <div className="flex-1 overflow-y-auto mt-5 space-y-2 pr-1">
        {menu.map((item) => (
          <div
            key={item.path}
            onClick={() => {
              navigate(item.path);
              toggleDrawer(false)();
            }}
            className={`
              flex items-center gap-4 cursor-pointer px-6 py-3 rounded-r-full transition-all
              ${
                isActive(item.path)
                  ? "bg-[#B9935A] text-white shadow-md"
                  : "text-[#4A1F2A] hover:bg-[#FFF5E7]"
              }
            `}
          >
            <ListItemIcon className="min-w-[36px]">
              {isActive(item.path) ? item.activeIcon : item.icon}
            </ListItemIcon>
            <ListItemText primary={item.name} />
          </div>
        ))}
      </div>

      {/* ================= BOTTOM MENU (FIXED) ================= */}
      <div
        className="space-y-2 pb-5 pt-5 border-t bg-[#FFFCF7]"
        style={{ borderColor: "#E3D4B6" }}
      >
        {menu2.map((item) => (
          <div
            key={item.path}
            onClick={() => {
              if (item.name === "Logout") {
                handleLogout();
              } else {
                navigate(item.path);
                toggleDrawer(false)();
              }
            }}
            className={`
              flex items-center gap-4 cursor-pointer px-6 py-3 rounded-r-full transition-all
              ${
                isActive(item.path)
                  ? "bg-[#B9935A] text-white shadow-md"
                  : "text-[#4A1F2A] hover:bg-[#FFF5E7]"
              }
            `}
          >
            <ListItemIcon className="min-w-[36px]">
              {isActive(item.path) ? item.activeIcon : item.icon}
            </ListItemIcon>
            <ListItemText primary={item.name} />
          </div>
        ))}
      </div>
    </div>
  );
};



export default SellerDrawerList;
