

// import React, { useEffect } from "react";
// import {
//   Box,
//   Paper,
//   Typography,
//   Chip,
//   Avatar,
//   Button,
// } from "@mui/material";
// import {
//   CheckCircle,
//   Block,
//   Visibility,
//   Verified,
// } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";
// import { useAppDispatch, useAppSelector } from "../../Redux Toolkit/Store";
// import {
//   fetchSellers,
//   updateSellerAccountStatus,
// } from "../../Redux Toolkit/Features/Seller/SellerSlice";

// /* ================= COMPONENT ================= */

// const SellerTable = () => {
//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();

//   const { sellers, loading } = useAppSelector(
//     (state) => state.sellerManagement
//   );

//   /* ===== FETCH ALL SELLERS ===== */
//   useEffect(() => {
//     dispatch(fetchSellers(undefined)); // fetch all
//   }, [dispatch]);

//   /* ===== ACTIONS ===== */

//   const handleBlock = (id: string) => {
//     dispatch(
//       updateSellerAccountStatus({
//         sellerId: id,
//         status: "BLOCKED",
//       })
//     );
//   };

//   const handleUnblock = (id: string) => {
//     dispatch(
//       updateSellerAccountStatus({
//         sellerId: id,
//         status: "ACTIVE",
//       })
//     );
//   };

//   const handleView = (id: string) => {
//     navigate(`/admin/sellers/${id}`);
//   };

//   const handleApprovals = () => {
//     navigate("/admin/sellers/approval");
//   };

//   return (
//     <Box className="bg-[#FFFDF9] min-h-screen">
//       {/* ===== HEADER ===== */}
//       <Box className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
//         <div>
//           <Typography variant="h5" className="font-semibold text-[#4A1F2A]">
//             Sellers / Weavers
//           </Typography>
//           <Typography variant="body2" className="text-[#7A6A58]">
//             Manage all registered sellers and weavers
//           </Typography>
//         </div>

//         <Button
//           variant="contained"
//           startIcon={<Verified />}
//           onClick={handleApprovals}
//           sx={{
//             backgroundColor: "#B9935A",
//             "&:hover": { backgroundColor: "#A8844E" },
//           }}
//         >
//           Seller Approvals
//         </Button>
//       </Box>

//       {/* ===== SELLER LIST ===== */}
//       <div className="space-y-4">
//         {!loading &&
//           sellers.map((seller: any) => (
//             <Paper
//               key={seller._id}
//               elevation={0}
//               className="rounded-2xl p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
//               style={{
//                 background: "#FFFCF7",
//                 border: "1px solid #E3D4B6",
//               }}
//             >
//               {/* LEFT INFO */}
//               <div className="flex items-center gap-4">
//                 <Avatar sx={{ bgcolor: "#B9935A", color: "#fff" }}>
//                   {seller.sellerName?.charAt(0)}
//                 </Avatar>

//                 <div>
//                   <Typography className="font-semibold text-[#4A1F2A]">
//                     {seller.sellerName}
//                   </Typography>

//                   <Typography variant="body2" className="text-[#7A6A58]">
//                     {seller.ownerName || "—"} • {seller.type || "Seller"}
//                   </Typography>

//                   <Typography variant="body2" className="text-[#7A6A58]">
//                     📍 {seller.address?.village || "N/A"}
//                   </Typography>
//                 </div>
//               </div>

//               {/* MIDDLE STATS */}
//               <div className="flex flex-wrap items-center gap-3 text-sm text-[#4A1F2A]">
//                 <Chip
//                   label={`Products: ${seller.productsCount || 0}`}
//                   size="small"
//                   sx={{ backgroundColor: "#FFF5E7" }}
//                 />
//                 <Chip
//                   label={`Orders: ${seller.ordersCount || 0}`}
//                   size="small"
//                   sx={{ backgroundColor: "#FFF5E7" }}
//                 />

//                 <Chip
//                   icon={<Verified />}
//                   label={
//                     seller.kycStatus === "VERIFIED"
//                       ? "KYC Verified"
//                       : "KYC Pending"
//                   }
//                   sx={{
//                     backgroundColor:
//                       seller.kycStatus === "VERIFIED"
//                         ? "#E8F5E9"
//                         : "#FFF3CD",
//                     color:
//                       seller.kycStatus === "VERIFIED"
//                         ? "#2E7D32"
//                         : "#856404",
//                     fontWeight: 500,
//                   }}
//                 />
//               </div>

//               {/* RIGHT ACTIONS */}
//               <div className="flex items-center gap-3">
//                 <Chip
//                   icon={
//                     seller.status === "ACTIVE" ? (
//                       <CheckCircle />
//                     ) : (
//                       <Block />
//                     )
//                   }
//                   label={seller.status === "ACTIVE" ? "Active" : "Blocked"}
//                   sx={{
//                     backgroundColor:
//                       seller.status === "ACTIVE"
//                         ? "#E8F5E9"
//                         : "#FDECEA",
//                     color:
//                       seller.status === "ACTIVE"
//                         ? "#2E7D32"
//                         : "#D32F2F",
//                     fontWeight: 500,
//                   }}
//                 />

//                 <Button
//                   size="small"
//                   startIcon={<Visibility />}
//                   onClick={() => handleView(seller._id)}
//                 >
//                   View
//                 </Button>

//                 {seller.status === "ACTIVE" ? (
//                   <Button
//                     size="small"
//                     color="error"
//                     startIcon={<Block />}
//                     onClick={() => handleBlock(seller._id)}
//                   >
//                     Block
//                   </Button>
//                 ) : (
//                   <Button
//                     size="small"
//                     color="success"
//                     startIcon={<CheckCircle />}
//                     onClick={() => handleUnblock(seller._id)}
//                   >
//                     Unblock
//                   </Button>
//                 )}
//               </div>
//             </Paper>
//           ))}
//       </div>

//       {/* ===== EMPTY STATE ===== */}
//       {!loading && sellers.length === 0 && (
//         <Paper
//           elevation={0}
//           className="rounded-2xl p-10 mt-10 text-center"
//           style={{
//             background: "#FFFCF7",
//             border: "1px dashed #E3D4B6",
//           }}
//         >
//           <Typography className="text-[#7A6A58]">
//             No sellers found
//           </Typography>
//         </Paper>
//       )}
//     </Box>
//   );
// };

// export default SellerTable;




import React, { useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Chip,
  Avatar,
  Button,
} from "@mui/material";
import {
  CheckCircle,
  Block,
  Visibility,
  Verified,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Redux Toolkit/Store";
import {
  fetchSellers,
  updateSellerAccountStatus,
} from "../../Redux Toolkit/Features/Seller/SellerSlice";

const SellerTable = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { sellers, loading } = useAppSelector(
    (state) => state.sellerManagement
  );

  useEffect(() => {
    dispatch(fetchSellers(undefined));
  }, [dispatch]);

  const handleBlock = (id: string) => {
    dispatch(
      updateSellerAccountStatus({
        sellerId: id,
        status: "BLOCKED",
      })
    );
  };

  const handleUnblock = (id: string) => {
    dispatch(
      updateSellerAccountStatus({
        sellerId: id,
        status: "ACTIVE",
      })
    );
  };

  const handleView = (id: string) => {
    navigate(`/admin/sellers/${id}`);
  };

  const handleApprovals = () => {
    navigate("/admin/sellers/approval");
  };

  return (
    <Box className="bg-[#FFFDF9] min-h-screen">
      {/* HEADER */}
      <Box className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <Typography variant="h5" className="font-semibold text-[#4A1F2A]">
            Sellers / Weavers
          </Typography>
          <Typography variant="body2" className="text-[#7A6A58]">
            Manage all registered sellers and weavers
          </Typography>
        </div>

        <Button
          variant="contained"
          startIcon={<Verified />}
          onClick={handleApprovals}
          sx={{
            backgroundColor: "#B9935A",
            "&:hover": { backgroundColor: "#A8844E" },
          }}
        >
          Seller Approvals
        </Button>
      </Box>

      {/* SELLER LIST */}
      <div className="space-y-4">
        {!loading &&
          sellers.map((seller: any) => (
            <Paper
              key={seller._id}
              elevation={0}
              className="rounded-2xl p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              style={{
                background: "#FFFCF7",
                border: "1px solid #E3D4B6",
              }}
            >
              {/* LEFT */}
              <div className="flex items-center gap-4">
                <Avatar sx={{ bgcolor: "#B9935A", color: "#fff" }}>
                  {seller.sellerName?.charAt(0)}
                </Avatar>

                <div>
                  <Typography className="font-semibold text-[#4A1F2A]">
                    {seller.sellerName}
                  </Typography>

                  <Typography variant="body2" className="text-[#7A6A58]">
                    {seller.ownerName || "—"} •{" "}
                    {seller.type || "Seller"}
                  </Typography>

                  <Typography variant="body2" className="text-[#7A6A58]">
                    📍 {seller.address?.village || "N/A"}
                  </Typography>
                </div>
              </div>

              {/* STATS */}
              <div className="flex flex-wrap items-center gap-3 text-sm text-[#4A1F2A]">
                <Chip
                  label={`Products: ${seller.productsCount || 0}`}
                  size="small"
                  sx={{ backgroundColor: "#FFF5E7" }}
                />

                <Chip
                  label={`Orders: ${seller.ordersCount || 0}`}
                  size="small"
                  sx={{ backgroundColor: "#FFF5E7" }}
                />

                <Chip
                  icon={<Verified />}
                  label={
                    seller.kycStatus === "VERIFIED"
                      ? "KYC Verified"
                      : "KYC Pending"
                  }
                  sx={{
                    backgroundColor:
                      seller.kycStatus === "VERIFIED"
                        ? "#E8F5E9"
                        : "#FFF3CD",
                    color:
                      seller.kycStatus === "VERIFIED"
                        ? "#2E7D32"
                        : "#856404",
                    fontWeight: 500,
                  }}
                />
              </div>

              {/* ACTIONS */}
              <div className="flex items-center gap-3">
                <Chip
                  icon={
                    seller.status === "ACTIVE" ? (
                      <CheckCircle />
                    ) : (
                      <Block />
                    )
                  }
                  label={
                    seller.status === "ACTIVE"
                      ? "Active"
                      : "Blocked"
                  }
                  sx={{
                    backgroundColor:
                      seller.status === "ACTIVE"
                        ? "#E8F5E9"
                        : "#FDECEA",
                    color:
                      seller.status === "ACTIVE"
                        ? "#2E7D32"
                        : "#D32F2F",
                    fontWeight: 500,
                  }}
                />

                <Button
                  size="small"
                  startIcon={<Visibility />}
                  onClick={() => handleView(seller._id)}
                >
                  View
                </Button>

                {seller.status === "ACTIVE" ? (
                  <Button
                    size="small"
                    color="error"
                    startIcon={<Block />}
                    onClick={() => handleBlock(seller._id)}
                  >
                    Block
                  </Button>
                ) : (
                  <Button
                    size="small"
                    color="success"
                    startIcon={<CheckCircle />}
                    onClick={() => handleUnblock(seller._id)}
                  >
                    Unblock
                  </Button>
                )}
              </div>
            </Paper>
          ))}
      </div>

      {/* EMPTY STATE */}
      {!loading && sellers.length === 0 && (
        <Paper
          elevation={0}
          className="rounded-2xl p-10 mt-10 text-center"
          style={{
            background: "#FFFCF7",
            border: "1px dashed #E3D4B6",
          }}
        >
          <Typography className="text-[#7A6A58]">
            No sellers found
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default SellerTable;
