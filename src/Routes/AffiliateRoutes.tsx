import { Route } from "react-router-dom";
import AffiliateLayout from "../affiliate/layout/AffiliateLayout";
import AffiliateDashboard from "../affiliate/pages/AffiliateDashboard";
import AffiliateCommissions from "../affiliate/pages/AffiliateCommissions";
import AffiliateWithdraw from "../affiliate/pages/AffiliateWithdraw";
import AffiliateProtectedRoute from "./AffiliateProtectedRoute";

const AffiliateRoutes = () => {
  return (
    <Route
      path="/affiliate"
      element={
        <AffiliateProtectedRoute>
          <AffiliateLayout />
        </AffiliateProtectedRoute>
      }
    >
      <Route path="dashboard" element={<AffiliateDashboard />} />
      <Route path="commissions" element={<AffiliateCommissions />} />
      <Route path="withdraw" element={<AffiliateWithdraw />} />
    </Route>
  );
};

export default AffiliateRoutes;