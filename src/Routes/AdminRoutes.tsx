






import { Route, Routes } from "react-router-dom";
import AdminDashboard from "../admin/Dashboard/AdminDashboard";
import CustomersTable from "../admin/Customer/CustomersTable";
import SellerTable from "../admin/Seller/SellerTable";
import SellerApproval from "../admin/Seller/SellerApproval";
import OrdersTable from "../admin/Order/OrdersTable";
import OrderDetails from "../admin/Order/OrderDetails";
import ProductsTable from "../admin/Product/ProductsTable";
import CategoriesTable from "../admin/Category/CategoriesTable";
import InventoryTable from "../admin/Inventory/InventoryTable";
import ReturnsTable from "../admin/Order/ReturnsTable";
import Coupon from "../admin/Coupon/Coupon";
import CouponForm from "../admin/Coupon/CouponForm";
import Deal from "../admin/Deal/Deal";
import BannersTable from "../admin/Marketing/BannersTable";
import PaymentTable from "../admin/Payment/PaymentsTable";
import PayoutTable from "../admin/Payment/PayoutsTable";
import SalesReport from "../admin/Reports/SalesReports";
import GridTable from "../admin/HomePage/GridTable";
import SareeTable from "../admin/HomePage/SareeTable";
import ShopByCategoryTable from "../admin/HomePage/ShopByCategoryTable";
import SeedCategories from "../admin/Category/SeedCategories";
import Settings from "../admin/Settings/Settings";
import HomeCategoryTable from "../admin/HomePage/HomeCategoryTable";
import AdminPaymentDetail from "../admin/Payment/AdminPaymentDetail";

const AdminRoutes = () => {
  return (
    <Routes>
      {/* ===== DASHBOARD ===== */}
      <Route index element={<AdminDashboard />} />

      {/* ===== USERS ===== */}
      <Route path="customers" element={<CustomersTable />} />

      {/* ===== SELLERS ===== */}
      <Route path="sellers" element={<SellerTable />} />
      <Route path="sellers/approval" element={<SellerApproval />} />

      {/* ===== CATALOG ===== */}
      <Route path="homepage" element={<HomeCategoryTable />} />
      <Route path="products" element={<ProductsTable />} />
      <Route path="categories" element={<CategoriesTable />} />
      <Route path="inventory" element={<InventoryTable />} />

      {/* ===== ORDERS ===== */}
      <Route path="orders" element={<OrdersTable />} />
      <Route path="orders/:orderId" element={<OrderDetails />} />
      <Route path="returns" element={<ReturnsTable />} />

      {/* ===== MARKETING ===== */}
      <Route path="coupons" element={<Coupon />} />
      <Route path="coupons/add" element={<CouponForm />} />
      <Route path="deals" element={<Deal />} />
      <Route path="banners" element={<BannersTable />} />

      {/* ===== PAYMENTS ===== */}
      <Route path="payments" element={<PaymentTable />} />
      <Route path="payouts" element={<PayoutTable />} />

<Route
  path="/payments/:id"
  element={<AdminPaymentDetail />}
/>


      {/* ===== REPORTS ===== */}
      <Route path="reports" element={<SalesReport />} />

      {/* ===== HOME PAGE MANAGEMENT ===== */}
      <Route path="home-grid" element={<GridTable />} />
      <Route path="saree-category" element={<SareeTable />} />
      <Route path="shop-by-category" element={<ShopByCategoryTable />} />

      {/* ===== SYSTEM ===== */}
      <Route path="seed-categories" element={<SeedCategories />} />
      <Route path="settings" element={<Settings />} />
    </Routes>
  );
};

export default AdminRoutes;
