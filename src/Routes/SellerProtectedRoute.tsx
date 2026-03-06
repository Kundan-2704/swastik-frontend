





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
