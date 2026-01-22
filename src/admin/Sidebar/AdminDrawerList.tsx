import {
  Dashboard,
  Home,                 // ✅ Homepage icon
  People,
  Store,
  Check,
  Checkroom,
  Category,
  Inventory2,
  ShoppingBag,
  AssignmentReturn,
  Payments,
  AccountBalance,
  LocalOffer,
  Campaign,
  Assessment,
  Settings,
  IntegrationInstructions,
  Logout,
} from "@mui/icons-material";
import { Divider, ListItemIcon, ListItemText } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../Redux Toolkit/Store";

/* ================= TYPES ================= */

type MenuItem = {
  name: string;
  path: string;
  icon: React.ReactNode;
};

type MenuSection = {
  title: string;
  items: MenuItem[];
};

/* ================= MENU CONFIG ================= */

const menuSections: MenuSection[] = [
  {
    title: "Overview",
    items: [
      {
        name: "Dashboard",
        path: "/admin",
        icon: <Dashboard />,
      },
    ],
  },

  {
    title: "Users",
    items: [
      {
        name: "Customers",
        path: "/admin/customers",
        icon: <People />,
      },
      {
        name: "Sellers",
        path: "/admin/sellers",
        icon: <Store />,
      },
      {
        name: "Seller Approvals",
        path: "/admin/sellers/approval",
        icon: <Check />,
      },
    ],
  },

  {
    title: "Catalog",
    items: [
      {
        name: "Homepage",            // ✅ ADDED HERE
        path: "/admin/homepage",
        icon: <Home />,
      },
      {
        name: "Sarees",
        path: "/admin/products",
        icon: <Checkroom />,
      },
      {
        name: "Categories",
        path: "/admin/categories",
        icon: <Category />,
      },
      {
        name: "Inventory",
        path: "/admin/inventory",
        icon: <Inventory2 />,
      },
    ],
  },

  {
    title: "Orders",
    items: [
      {
        name: "All Orders",
        path: "/admin/orders",
        icon: <ShoppingBag />,
      },
      {
        name: "Returns & Refunds",
        path: "/admin/returns",
        icon: <AssignmentReturn />,
      },
    ],
  },

  {
    title: "Marketing",
    items: [
      {
        name: "Coupons",
        path: "/admin/coupons",
        icon: <LocalOffer />,
      },
      {
        name: "Deals & Banners",
        path: "/admin/deals",
        icon: <Campaign />,
      },
    ],
  },

  {
    title: "Payments",
    items: [
      {
        name: "Payments",
        path: "/admin/payments",
        icon: <Payments />,
      },
      {
        name: "Payouts",
        path: "/admin/payouts",
        icon: <AccountBalance />,
      },
    ],
  },

  {
    title: "Reports",
    items: [
      {
        name: "Sales Reports",
        path: "/admin/reports",
        icon: <Assessment />,
      },
    ],
  },

  {
    title: "System",
    items: [
      {
        name: "Seed Categories",
        path: "/admin/seed-categories",
        icon: <IntegrationInstructions />,
      },
      {
        name: "Settings",
        path: "/admin/settings",
        icon: <Settings />,
      },
    ],
  },
];

/* ================= COMPONENT ================= */

const AdminDrawerList = () => {
  const user = useAppSelector((state) => state.user.user);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) =>
    location.pathname === path ||
    location.pathname.startsWith(path + "/");

  return (
    <div
      data-lenis-prevent
      className="flex flex-col justify-between h-full w-[260px] bg-[#FFFCF7]"
      style={{ borderRight: "1px solid #E3D4B6" }}
    >
      {/* ===== MENU ===== */}
      <div className="px-4 pt-6 space-y-6 overflow-y-auto">
        {/* HEADER */}
        <div>
          <h2 className="text-lg font-semibold text-[#4A1F2A]">
            Admin Panel
          </h2>
          <p className="text-xs text-[#7A6A58]">
            Handloom Multivendor Platform
          </p>
        </div>

        {/* SECTIONS */}
        {menuSections.map((section) => (
          <div key={section.title}>
            <p className="px-3 mb-2 text-[11px] uppercase tracking-wide text-[#9C8465]">
              {section.title}
            </p>

            {section.items.map((item) => {
              const active = isActive(item.path);

              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-r-full transition-all
                    ${active
                      ? "bg-[#B9935A] text-white shadow-md"
                      : "text-[#4A1F2A] hover:bg-[#FFF5E7]"
                    }`}
                >
                  <ListItemIcon className="min-w-[36px]">
                    {item.icon}
                  </ListItemIcon>

                  <ListItemText
                    primary={
                      <span className="font-medium">
                        {item.name}
                      </span>
                    }
                  />
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* ===== FOOTER ===== */}
      <div className="px-4 mb-6">
        <Divider className="mb-4" />

        <p className="text-center text-sm font-medium text-[#4A1F2A]">
          {user?.fullName}
        </p>

        <Divider className="my-4" />

        <button
          onClick={() => {
            localStorage.removeItem("admin_jwt");
            navigate("/admin/login");
          }}
          className="w-full flex items-center gap-4 px-4 py-3 rounded-r-full text-[#4A1F2A] hover:bg-[#FFF5E7]"
        >
          <Logout />
          <span>Logout</span>
        </button>

      </div>
    </div>
  );
};

export default AdminDrawerList;
