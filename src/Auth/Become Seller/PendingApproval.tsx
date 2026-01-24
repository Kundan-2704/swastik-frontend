import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Redux Toolkit/Store";
import { CircularProgress } from "@mui/material";
import { fetchSellerProfile } from "../../Redux Toolkit/Features/Seller/SellerSlice";

const PendingApproval = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const status = useAppSelector(
    (state) => state.seller.sellerAuth.status
  );

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(fetchSellerProfile());
    }, 10000); // 🔁 every 10 sec

    return () => clearInterval(interval);
  }, [dispatch]);

  useEffect(() => {
    if (status === "approved") {
      navigate("/seller", { replace: true });
    }
  }, [status, navigate]);

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
