// import React, { useEffect } from "react";
// import { Navigate } from "react-router-dom";
// import { CircularProgress } from "@mui/material";
// import { useAppDispatch, useAppSelector } from "../../Redux Toolkit/Store";
// import { fetchSellerProfile } from "../../Redux Toolkit/Features/Seller/SellerSlice";

// const PendingApproval: React.FC = () => {
//   const dispatch = useAppDispatch();

//   const { account, loading } = useAppSelector(
//     (state) => state.sellerManagement
//   );

//   const accountStatus = account?.accountStatus;

//   // 🔁 fetch always once (refresh safe)
//   useEffect(() => {
//     dispatch(fetchSellerProfile());
//   }, [dispatch]);

//   // ⏳ loading state
//   if (loading || !accountStatus) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <CircularProgress />
//       </div>
//     );
//   }

//   // 🚀 ACTIVE seller never stays here
//   if (accountStatus === "ACTIVE") {
//     return <Navigate to="/seller" replace />;
//   }

//   // 🕒 only pending sellers see this
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
import { Navigate, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Redux Toolkit/Store";
import { fetchSellerProfile } from "../../Redux Toolkit/Features/Seller/SellerSlice";

const PendingApproval: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { account } = useAppSelector(
    (state) => state.sellerManagement
  );

  const accountStatus = account?.accountStatus;

  useEffect(() => {
    dispatch(fetchSellerProfile());
  }, [dispatch]);

  if (accountStatus === "ACTIVE") {
    return <Navigate to="/seller" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f7f3ee] via-[#f2ebe1] to-[#efe7dc] px-4">

      <div className="bg-white/70 backdrop-blur-xl border border-[#e7ddd0] shadow-2xl rounded-3xl p-12 max-w-xl w-full text-center space-y-8 transition-all">

        {/* Animated Status Circle */}
        <div className="relative w-20 h-20 mx-auto">
          <div className="absolute inset-0 rounded-full border-2 border-[#b08d57]/30"></div>
          <div className="absolute inset-2 rounded-full border-2 border-[#b08d57] border-t-transparent animate-spin"></div>
        </div>

        {/* Thank You */}
        <div className="space-y-3">
          <h1 className="text-3xl font-semibold text-[#4a2f25]">
            Thank You For Joining Swastik 🤍
          </h1>

          <p className="text-gray-600 leading-relaxed text-sm">
            We are honored to welcome you to our artisan community.
            Your craftsmanship helps preserve the legacy of authentic handloom heritage.
          </p>
        </div>

        {/* Approval Message */}
        <div className="space-y-2">
          <h2 className="text-xl font-medium text-[#5c3d2e]">
            Seller Approval In Progress
          </h2>

          <p className="text-gray-500 text-sm">
            Our team is carefully reviewing your seller profile to ensure quality
            and authenticity standards.
          </p>

          <p className="text-sm text-gray-500">
            Expected approval time:
            <span className="font-semibold text-[#b08d57]"> 24 – 48 Hours</span>
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">

          <button
            onClick={() => navigate("/")}
            className="px-7 py-3 rounded-full bg-[#b08d57] text-white font-medium tracking-wide shadow-md hover:scale-105 hover:shadow-lg transition duration-300"
          >
            Explore Swastik
          </button>

          <button
            onClick={() => navigate(-1)}
            className="px-7 py-3 rounded-full border border-[#d8c9b5] text-[#6b4c3b] font-medium hover:bg-[#f5efe7] transition duration-300"
          >
            Go Back
          </button>

        </div>

        {/* Brand Footer */}
        <div className="pt-6 border-t border-[#eee4d8]">
          <p className="text-xs tracking-[0.3em] text-[#b08d57]">
            SWASTIK HERITAGE SELLER NETWORK
          </p>
        </div>

      </div>
    </div>
  );
};

export default PendingApproval;
