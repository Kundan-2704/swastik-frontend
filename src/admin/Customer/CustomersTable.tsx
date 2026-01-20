// import React from "react";
// import {
//   Box,
//   Paper,
//   Typography,
//   Divider,
//   Chip,
//   Avatar,
//   Button,
// } from "@mui/material";
// import { Block, CheckCircle, Visibility } from "@mui/icons-material";

// /* ================= MOCK DATA (API se aayega later) ================= */

// const customers = [
//   {
//     id: "1",
//     name: "Amit Sharma",
//     email: "amit@gmail.com",
//     mobile: "9876543210",
//     orders: 12,
//     status: "ACTIVE",
//   },
//   {
//     id: "2",
//     name: "Priya Verma",
//     email: "priya@gmail.com",
//     mobile: "9123456780",
//     orders: 4,
//     status: "BLOCKED",
//   },
//   {
//     id: "3",
//     name: "Rahul Sahu",
//     email: "rahul@gmail.com",
//     mobile: "9988776655",
//     orders: 7,
//     status: "ACTIVE",
//   },
// ];

// /* ================= COMPONENT ================= */

// const CustomersTable = () => {
//   const handleBlock = (id: string) => {
//     console.log("Block customer:", id);
//     // TODO: dispatch blockCustomer(id)
//   };

//   const handleUnblock = (id: string) => {
//     console.log("Unblock customer:", id);
//     // TODO: dispatch unblockCustomer(id)
//   };

//   const handleView = (id: string) => {
//     console.log("View customer:", id);
//     // TODO: navigate(`/admin/customers/${id}`)
//   };

//   return (
//     <Box className="bg-[#FFFDF9] min-h-screen">
//       {/* ===== HEADER ===== */}
//       <Box className="mb-6">
//         <Typography variant="h5" className="font-semibold text-[#4A1F2A]">
//           Customers
//         </Typography>
//         <Typography variant="body2" className="text-[#7A6A58]">
//           Manage all registered customers
//         </Typography>
//       </Box>

//       {/* ===== LIST ===== */}
//       <div className="space-y-4">
//         {customers.map((customer) => (
//           <Paper
//             key={customer.id}
//             elevation={0}
//             className="rounded-2xl p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
//             style={{
//               background: "#FFFCF7",
//               border: "1px solid #E3D4B6",
//             }}
//           >
//             {/* LEFT INFO */}
//             <div className="flex items-center gap-4">
//               <Avatar sx={{ bgcolor: "#B9935A", color: "#fff" }}>
//                 {customer.name.charAt(0)}
//               </Avatar>

//               <div>
//                 <Typography className="font-semibold text-[#4A1F2A]">
//                   {customer.name}
//                 </Typography>

//                 <Typography variant="body2" className="text-[#7A6A58]">
//                   {customer.email}
//                 </Typography>

//                 <Typography variant="body2" className="text-[#7A6A58]">
//                   📞 {customer.mobile}
//                 </Typography>
//               </div>
//             </div>

//             {/* RIGHT ACTIONS */}
//             <div className="flex items-center gap-3">
//               <Chip
//                 label={
//                   customer.status === "ACTIVE"
//                     ? "Active"
//                     : "Blocked"
//                 }
//                 icon={
//                   customer.status === "ACTIVE" ? (
//                     <CheckCircle />
//                   ) : (
//                     <Block />
//                   )
//                 }
//                 sx={{
//                   backgroundColor:
//                     customer.status === "ACTIVE"
//                       ? "#E8F5E9"
//                       : "#FDECEA",
//                   color:
//                     customer.status === "ACTIVE"
//                       ? "#2E7D32"
//                       : "#D32F2F",
//                   fontWeight: 500,
//                 }}
//               />

//               <Typography
//                 variant="body2"
//                 className="text-[#7A6A58]"
//               >
//                 Orders: {customer.orders}
//               </Typography>

//               <Button
//                 size="small"
//                 startIcon={<Visibility />}
//                 onClick={() => handleView(customer.id)}
//               >
//                 View
//               </Button>

//               {customer.status === "ACTIVE" ? (
//                 <Button
//                   size="small"
//                   color="error"
//                   startIcon={<Block />}
//                   onClick={() => handleBlock(customer.id)}
//                 >
//                   Block
//                 </Button>
//               ) : (
//                 <Button
//                   size="small"
//                   color="success"
//                   startIcon={<CheckCircle />}
//                   onClick={() => handleUnblock(customer.id)}
//                 >
//                   Unblock
//                 </Button>
//               )}
//             </div>
//           </Paper>
//         ))}
//       </div>

//       {/* ===== EMPTY STATE ===== */}
//       {customers.length === 0 && (
//         <Paper
//           elevation={0}
//           className="rounded-2xl p-10 mt-10 text-center"
//           style={{
//             background: "#FFFCF7",
//             border: "1px dashed #E3D4B6",
//           }}
//         >
//           <Typography className="text-[#7A6A58]">
//             No customers found
//           </Typography>
//         </Paper>
//       )}
//     </Box>
//   );
// };

// export default CustomersTable;




import React, { useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Chip,
  Avatar,
  Button,
} from "@mui/material";
import { Block, CheckCircle, Visibility } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../Redux Toolkit/Store";
import { useNavigate } from "react-router-dom";
import { fetchCustomers, updateCustomerStatus } from "../../Redux Toolkit/Features/Admin/AdminCustomerSlice";

const CustomersTable = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const jwt = localStorage.getItem("jwt") || "";

  const { customers, loading } = useAppSelector(
    (state) => state.adminCustomers
  );

  useEffect(() => {
    if (jwt) {
      dispatch(fetchCustomers(jwt)),
        dispatch(
          updateCustomerStatus({
            jwt,
            customerId: customers[0]?._id || "",
            status: "BLOCKED",
          })
        );
    }
  }, [dispatch, jwt]);




  const handleBlock = (id: string) => {
    console.log("Block customer:", id);
  };

  const handleUnblock = (id: string) => {
    console.log("Unblock customer:", id);
  };

  const handleView = (id: string) => {
    navigate(`/admin/customers/${id}`);
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <Box className="min-h-screen flex items-center justify-center">
        <Typography>Loading customers...</Typography>
      </Box>
    );
  }

  return (
    <Box className="bg-[#FFFDF9] min-h-screen">
      {/* ===== HEADER ===== */}
      <Box className="mb-6">
        <Typography variant="h5" className="font-semibold text-[#4A1F2A]">
          Customers
        </Typography>
        <Typography variant="body2" className="text-[#7A6A58]">
          Manage all registered customers
        </Typography>
      </Box>

      {/* ===== LIST ===== */}
      <div className="space-y-4">
        {customers.map((customer: any) => (
          <Paper
            key={customer._id}
            elevation={0}
            className="rounded-2xl p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            style={{
              background: "#FFFCF7",
              border: "1px solid #E3D4B6",
            }}
          >
            {/* LEFT INFO */}
            <div className="flex items-center gap-4">
              <Avatar sx={{ bgcolor: "#B9935A", color: "#fff" }}>
                {customer.name?.charAt(0)}
              </Avatar>

              <div>
                <Typography className="font-semibold text-[#4A1F2A]">
                  {customer.name}
                </Typography>

                <Typography variant="body2" className="text-[#7A6A58]">
                  {customer.email}
                </Typography>

                <Typography variant="body2" className="text-[#7A6A58]">
                  📞 {customer.mobile}
                </Typography>
              </div>
            </div>

            {/* RIGHT ACTIONS */}
            <div className="flex items-center gap-3">
              <Chip
                label={customer.status === "ACTIVE" ? "Active" : "Blocked"}
                icon={
                  customer.status === "ACTIVE" ? (
                    <CheckCircle />
                  ) : (
                    <Block />
                  )
                }
                sx={{
                  backgroundColor:
                    customer.status === "ACTIVE"
                      ? "#E8F5E9"
                      : "#FDECEA",
                  color:
                    customer.status === "ACTIVE"
                      ? "#2E7D32"
                      : "#D32F2F",
                  fontWeight: 500,
                }}
              />

              <Typography variant="body2" className="text-[#7A6A58]">
                Orders: {customer.totalOrders || 0}
              </Typography>

              <Button
                size="small"
                startIcon={<Visibility />}
                onClick={() => handleView(customer._id)}
              >
                View
              </Button>

              {customer.status === "ACTIVE" ? (
                <Button
                  size="small"
                  color="error"
                  startIcon={<Block />}
                  onClick={() => handleBlock(customer._id)}
                >
                  Block
                </Button>
              ) : (
                <Button
                  size="small"
                  color="success"
                  startIcon={<CheckCircle />}
                  onClick={() => handleUnblock(customer._id)}
                >
                  Unblock
                </Button>
              )}
            </div>
          </Paper>
        ))}
      </div>

      {/* ===== EMPTY STATE ===== */}
      {customers.length === 0 && (
        <Paper
          elevation={0}
          className="rounded-2xl p-10 mt-10 text-center"
          style={{
            background: "#FFFCF7",
            border: "1px dashed #E3D4B6",
          }}
        >
          <Typography className="text-[#7A6A58]">
            No customers found
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default CustomersTable;
