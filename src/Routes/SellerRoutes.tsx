import { Route, Routes } from "react-router-dom";
import HomePage from "../seller/HomePage/HomePage";
import Order from "../seller/Order/Order";
import Products from "../seller/Products/Products";
import AddProducts from "../seller/Products/AddProducts";
// import { Payment } from "@mui/icons-material";
import Transaction from "../seller/Transaction/Transaction";
import Accounts from "../seller/Accounts/Accounts";
import PaymentPage from "../seller/Payment/Payment";
import Setting from "../seller/Setting/Setting";
import SellerProductEdit from "../seller/Products/SellerProductEdit";
import ProductView from "../seller/Products/ProductView";
import SellerDeals from "../seller/Deals/SellerDeals";
import CreateDeal from "../seller/Deals/CreateDeal";
import Payout from "../seller/Payout/Payout";
import Reports from "../seller/Reports/Reports";
import Reviews from "../seller/Reviews/Reviews";
import Returns from "../seller/Returns/Returns";
import Shipping from "../seller/Shipping/Shipping";


const SellerRoutes: React.FC = () => {
  return (
    <Routes>
      {/* /seller */}
      <Route path="" element={<HomePage />} />

      {/* /seller/orders */}
      <Route path="orders" element={<Order />} />

<Route path="shipping" element={<Shipping />} />

      <Route path="returns" element={<Returns />} />

      {/* /seller/products */}
      <Route path="products" element={<Products />} />

      {/* /seller/products/view/:productId */}
      <Route
        path="products/view/:productId"
        element={<ProductView />}
      />

      {/* /seller/products/edit/:productId */}
      <Route
        path="products/edit/:productId"
        element={<SellerProductEdit />}
      />



      {/* /seller/add-product */}
      <Route path="add-product" element={<AddProducts />} />

      <Route path="deals" element={<SellerDeals />} />

      <Route path="deals/create" element={<CreateDeal />} />

      {/* /seller/payments */}
      <Route path="payments" element={<PaymentPage />} />

      <Route path="payouts" element={<Payout />} />

      {/* /seller/transactions */}
      <Route path="transactions" element={<Transaction />} />


      <Route path="reports" element={<Reports />} />


      <Route path="reviews" element={<Reviews />} />

      {/* /seller/account */}
      <Route path="account" element={<Accounts />} />

      {/* Future Routes */}
      <Route path="settings" element={<Setting />} />

    </Routes>
  );
};

export default SellerRoutes;



