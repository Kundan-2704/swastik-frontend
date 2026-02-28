import { Outlet, NavLink } from "react-router-dom";

const AffiliateLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg p-6">
        <h2 className="text-xl font-bold mb-8">Affiliate Panel</h2>

        <nav className="space-y-4">
          <NavLink to="dashboard" className="block hover:text-orange-500">
            Dashboard
          </NavLink>

          <NavLink to="commissions" className="block hover:text-orange-500">
            Commissions
          </NavLink>

          <NavLink to="withdraw" className="block hover:text-orange-500">
            Withdraw
          </NavLink>
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default AffiliateLayout;