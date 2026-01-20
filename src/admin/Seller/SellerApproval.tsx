import React, { useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  Chip,
  Avatar,
} from "@mui/material";
import { Check, Close } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../Redux Toolkit/Store";
import {
  fetchSellers,
  updateSellerAccountStatus,
} from "../../Redux Toolkit/Features/Seller/SellerSlice";

/* ================= COMPONENT ================= */

const SellerApproval = () => {
  const dispatch = useAppDispatch();

  const { sellers, loading } = useAppSelector(
    (state) => state.sellerManagement
  );

  /* ================= FETCH ALL SELLERS ================= */
  useEffect(() => {
    // 🔥 Fetch all sellers (filtering done locally)
    dispatch(fetchSellers(undefined));
  }, [dispatch]);

  /* ================= FILTER ONLY PENDING SELLERS ================= */
  // ✅ BACKEND FIELD: accountStatus
  const pendingSellers = sellers.filter(
    (seller: any) => seller.accountStatus === "PENDING_VERIFICATION"
  );

  /* ================= ACTIONS ================= */

  const handleApprove = (sellerId: string) => {
    dispatch(
      updateSellerAccountStatus({
        sellerId,
        status: "ACTIVE", // ✅ backend expects this
      })
    );
  };

  const handleReject = (sellerId: string) => {
    dispatch(
      updateSellerAccountStatus({
        sellerId,
        status: "BLOCKED",
      })
    );
  };

  return (
    <Box className="bg-[#FFFDF9] min-h-screen">
      {/* ================= HEADER ================= */}
      <Box className="mb-6">
        <Typography variant="h5" className="font-semibold text-[#4A1F2A]">
          Seller Approval
        </Typography>
        <Typography variant="body2" className="text-[#7A6A58]">
          Review & approve weavers and sellers
        </Typography>
      </Box>

      {/* ================= LIST ================= */}
      <div className="space-y-4">
        {!loading &&
          pendingSellers.map((seller: any) => (
            <Paper
              key={seller._id}
              elevation={0}
              className="rounded-2xl p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              style={{
                background: "#FFFCF7",
                border: "1px solid #E3D4B6",
              }}
            >
              {/* ================= LEFT INFO ================= */}
              <div className="flex items-center gap-4">
                <Avatar sx={{ bgcolor: "#B9935A", color: "#fff" }}>
                  {seller.sellerName?.charAt(0)}
                </Avatar>

                <div>
                  <Typography className="font-semibold text-[#4A1F2A]">
                    {seller.sellerName}
                  </Typography>

                  <Typography variant="body2" className="text-[#7A6A58]">
                    {seller.email}
                  </Typography>

                  <Typography variant="body2" className="text-[#7A6A58]">
                    Mobile: {seller.mobile}
                  </Typography>
                </div>
              </div>

              {/* ================= STATUS + ACTIONS ================= */}
              <div className="flex items-center gap-3">
                <Chip
                  label="Verification Pending"
                  size="small"
                  sx={{
                    backgroundColor: "#FFF3CD",
                    color: "#856404",
                    fontWeight: 500,
                  }}
                />

                <Button
                  variant="contained"
                  size="small"
                  startIcon={<Check />}
                  sx={{
                    backgroundColor: "#4CAF50",
                    "&:hover": { backgroundColor: "#43A047" },
                  }}
                  onClick={() => handleApprove(seller._id)}
                >
                  Approve
                </Button>

                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<Close />}
                  sx={{
                    borderColor: "#D32F2F",
                    color: "#D32F2F",
                    "&:hover": {
                      backgroundColor: "#FDECEA",
                      borderColor: "#D32F2F",
                    },
                  }}
                  onClick={() => handleReject(seller._id)}
                >
                  Reject
                </Button>
              </div>
            </Paper>
          ))}
      </div>

      {/* ================= EMPTY STATE ================= */}
      {!loading && pendingSellers.length === 0 && (
        <Paper
          elevation={0}
          className="rounded-2xl p-10 mt-10 text-center"
          style={{
            background: "#FFFCF7",
            border: "1px dashed #E3D4B6",
          }}
        >
          <Typography className="text-[#7A6A58]">
            No sellers pending approval 🎉
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default SellerApproval;
