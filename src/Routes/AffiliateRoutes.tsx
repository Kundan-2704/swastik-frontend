import React from "react";
import { Route } from "react-router-dom";
import AffiliateLayout from "../affiliate/layout/AffiliateLayout";
import AffiliateDashboard from "../affiliate/pages/AffiliateDashboard";
const AffiliateRoutes = (

  <Route path="/affiliate" element={<AffiliateLayout />}>

    <Route index element={<AffiliateDashboard />} />

    {/* <Route path="commissions" element={<Commissions />} /> */}

    {/* <Route path="withdraw" element={<Withdraw />} /> */}

  </Route>

);

export default AffiliateRoutes;