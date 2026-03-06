





// import { Navigate } from "react-router-dom";
// import { useAppSelector } from "../Redux Toolkit/Store";

// const SellerProtectedRoute = ({ children }: { children: JSX.Element }) => {
//   const { account } = useAppSelector((state) => state.sellerManagement);
//   const jwt = localStorage.getItem("seller_jwt");

//   if (!jwt) {
//     return <Navigate to="/seller/login" replace />;
//   }

//   if (!account) {
//     return <Navigate to="/seller/pending-approval" replace />;
//   }

//   if (account.accountStatus === "PENDING") {
//     return <Navigate to="/seller/pending-approval" replace />;
//   }

//   if (account.accountStatus === "REJECTED") {
//     return <Navigate to="/seller/rejected" replace />;
//   }

//   return children;
// };

// export default SellerProtectedRoute;







import { useEffect, type JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../Redux Toolkit/Store";
import { fetchSellerAccount } from "../Redux Toolkit/Features/Seller/SellerSlice";

const SellerProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const dispatch = useAppDispatch();
  const { account, accountFetched } = useAppSelector(
    (state) => state.sellerManagement
  );
  const jwt = localStorage.getItem("seller_jwt");

  // ✅ Dispatch fetch here — don't rely on children to do it
  useEffect(() => {
    if (jwt && !accountFetched) {
      dispatch(fetchSellerAccount());
    }
  }, [jwt, accountFetched, dispatch]);

  // 1. No JWT → login
  if (!jwt) {
    return <Navigate to="/seller/login" replace />;
  }

  // 2. Still fetching → spinner
  if (!accountFetched) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // 3. Fetch done → check status
  if (!account || account.accountStatus === "PENDING") {
    return <Navigate to="/seller/pending-approval" replace />;
  }

  if (account.accountStatus === "REJECTED") {
    return <Navigate to="/seller/rejected" replace />;
  }

  return children;
};

export default SellerProtectedRoute;