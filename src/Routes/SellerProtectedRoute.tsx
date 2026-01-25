// import React, { type JSX } from "react";
// import { Navigate } from "react-router-dom";
// import { useAppSelector } from "../Redux Toolkit/Store";

// interface Props {
//   children: JSX.Element;
// }

// const SellerProtectedRoute: React.FC<Props> = ({ children }) => {
//   const jwt = useAppSelector(
//     (state) => state.seller.sellerAuth.jwt
//   );

//   // ❌ Not logged in → redirect to seller login
//   if (!jwt) {
//     return <Navigate to="/seller/login" replace />;
//   }

//   // ✅ Logged in → allow access
//   return children;
// };

// export default SellerProtectedRoute;







// import React, { type JSX } from "react";
// import { Navigate } from "react-router-dom";
// import { useAppSelector } from "../Redux Toolkit/Store";

// interface Props {
//   children: JSX.Element;
// }

// const SellerProtectedRoute: React.FC<Props> = ({ children }) => {
//   const { jwt, status } = useAppSelector(
//     (state) => state.seller.sellerAuth
//   );

//   // ❌ Not logged in
//   if (!jwt) {
//     return <Navigate to="/seller/login" replace />;
//   }

//   // ⏳ Logged in but pending approval
//   if (status === "pending") {
//     return <Navigate to="/seller/pending-approval" replace />;
//   }

//   // ❌ Rejected seller (optional but recommended)
//   if (status === "rejected") {
//     return <Navigate to="/seller/rejected" replace />;
//   }

//   // ✅ Approved seller
//   return children;
// };

// export default SellerProtectedRoute;








import { Navigate } from "react-router-dom";
import { useAppSelector } from "../Redux Toolkit/Store";

const SellerProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { account } = useAppSelector((state) => state.sellerManagement);
  const jwt = localStorage.getItem("seller_jwt");

  if (!jwt) {
    return <Navigate to="/seller/login" replace />;
  }

  if (!account) {
    return <Navigate to="/seller/pending-approval" replace />;
  }

  if (account.accountStatus === "PENDING") {
    return <Navigate to="/seller/pending-approval" replace />;
  }

  if (account.accountStatus === "REJECTED") {
    return <Navigate to="/seller/rejected" replace />;
  }

  return children;
};

export default SellerProtectedRoute;
