// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAppDispatch, useAppSelector } from "../../Redux Toolkit/Store";
// import { CircularProgress } from "@mui/material";
// import { fetchSellerProfile } from "../../Redux Toolkit/Features/Seller/SellerSlice";

// const PendingApproval = () => {
//  const navigate = useNavigate();
//   const dispatch = useAppDispatch();

//   const accountStatus = useAppSelector(
//     (state) => state.seller.sellerAuth.accountStatus
//   );

//   useEffect(() => {
//     if (accountStatus !== "ACTIVE") {
//       const interval = setInterval(() => {
//         dispatch(fetchSellerProfile());
//       }, 10000);

//       return () => clearInterval(interval);
//     }
//   }, [dispatch, accountStatus]);

//   useEffect(() => {
//     if (accountStatus === "ACTIVE") {
//       navigate("/seller", { replace: true });
//     }
//   }, [accountStatus, navigate]);


//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <div className="text-center space-y-6">
//         <CircularProgress />
//         <p className="text-sm text-gray-600">
//           Waiting for admin approval...
//         </p>
//       </div>
//     </div>
//   );
// };

// export default PendingApproval;







import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../Redux Toolkit/Store";
import { fetchSellerProfile } from "../../Redux Toolkit/Features/Seller/SellerSlice";

const PendingApproval: React.FC = () => {
  const dispatch = useAppDispatch();

  const { account, loading } = useAppSelector(
    (state) => state.sellerManagement
  );

  const accountStatus = account?.accountStatus;

  // 🔁 fetch always once (refresh safe)
  useEffect(() => {
    dispatch(fetchSellerProfile());
  }, [dispatch]);

  // ⏳ loading state
  if (loading || !accountStatus) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <CircularProgress />
      </div>
    );
  }

  // 🚀 ACTIVE seller never stays here
  if (accountStatus === "ACTIVE") {
    return <Navigate to="/seller" replace />;
  }

  // 🕒 only pending sellers see this
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-6">
        <CircularProgress />
        <p className="text-sm text-gray-600">
          Waiting for admin approval...
        </p>
      </div>
    </div>
  );
};

export default PendingApproval;
