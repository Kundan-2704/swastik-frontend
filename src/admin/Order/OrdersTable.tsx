// import { useEffect } from "react";
// import { useAppDispatch, useAppSelector } from "../../Redux Toolkit/Store";
// import { fetchAllOrders } from "../../Redux Toolkit/Features/Admin/AdminOrderSlice";

// const AdminOrderTable = () => {
//   const dispatch = useAppDispatch();

//   // ✅ SAME KEY AS apiAdmin INTERCEPTOR

//   // ✅ BETTER NAMING
//   const orders = useAppSelector(
//     (state) => state.adminOrders.orders
//   );
//   const loading = useAppSelector(
//     (state) => state.adminOrders.loading
//   );
//   const error = useAppSelector(
//     (state) => state.adminOrders.error
//   );


//   // 🔥 FETCH ORDERS
//   useEffect(() => {
//     dispatch(fetchAllOrders());
//   }, [dispatch]);


//   /* ================= LOADING ================= */
//   if (loading) {
//     return (
//       <p className="text-sm text-gray-500">
//         Loading orders...
//       </p>
//     );
//   }

//   /* ================= ERROR ================= */
//   if (error) {
//     return (
//       <p className="text-sm text-red-500">
//         {error}
//       </p>
//     );
//   }

//   return (
//     <div className="space-y-4">
//       {/* ===== TITLE ===== */}
//       <div>
//         <h2 className="text-xl font-semibold text-[#4A1F2A]">
//           All Seller Orders
//         </h2>
//         <p className="text-xs text-gray-500 mt-1">
//           View and track all orders from sellers.
//         </p>
//       </div>

//       {/* ===== TABLE ===== */}
//       <div className="rounded-2xl bg-white border border-[#F0E4CC] overflow-hidden shadow-sm">
//         <table className="w-full text-left text-sm">
//           <thead className="bg-[#FFF7EA] text-xs text-gray-600 uppercase font-semibold">
//             <tr>
//               <th className="px-4 py-3">Order ID</th>
//               <th className="px-4 py-3">Product</th>
//               <th className="px-4 py-3">Customer</th>
//               <th className="px-4 py-3">Seller</th>
//               <th className="px-4 py-3">Date</th>
//               <th className="px-4 py-3">Amount</th>
//               <th className="px-4 py-3">Status</th>
//               <th className="px-4 py-3">details</th>
//             </tr>
//           </thead>

//           <tbody>
//             {/* ===== ORDERS MAP ===== */}
//             {orders.map((order: any) => {
//               const item = order.orderItems?.[0];
//               const product = item?.product;
//               const shipping = order.shippingAddress;

//               return (
//                 <tr key={order._id} className="border-t">
//                   {/* ORDER ID */}
//                   <td className="px-4 py-4 font-medium">
//                     {order._id}
//                   </td>

//                   {/* PRODUCT */}
//                   <td className="px-4 py-4">
//                     <div className="flex gap-3">
//                       <img
//                         src={
//                           product?.images?.[0] ||
//                           "/placeholder.png"
//                         }
//                         alt="product"
//                         className="w-14 h-18 rounded-lg object-cover border"
//                       />
//                       <div>
//                         <p className="font-semibold">
//                           {product?.title || "Product"}
//                         </p>
//                         <p className="text-xs text-gray-600">
//                           Qty: {item?.quantity || 1}
//                         </p>
//                       </div>
//                     </div>
//                   </td>

//                   {/* CUSTOMER */}
//                   <td className="px-4 py-4 text-xs">
//                     <p className="font-semibold">
//                       {shipping?.name || "-"}
//                     </p>
//                     <p>
//                       {shipping?.city || "-"},{" "}
//                       {shipping?.state || "-"}
//                     </p>
//                   </td>

//                   {/* SELLER */}
//                   <td className="px-4 py-4 text-xs">
//                     {order.seller?.shopName || "-"}
//                   </td>

//                   {/* DATE */}
//                   <td className="px-4 py-4 text-xs text-gray-500">
//                     {order.orderDate
//                       ? new Date(
//                         order.orderDate
//                       ).toLocaleDateString()
//                       : "-"}
//                   </td>

//                   {/* AMOUNT */}
//                   <td className="px-4 py-4 font-medium">
//                     ₹{order.totalSellingPrice}
//                   </td>

//                   {/* STATUS */}
//                   <td className="px-4 py-4">
//                     <span className="px-3 py-1 rounded-full text-xs font-semibold border">
//                       {order.orderStatus}
//                     </span>
//                   </td>

//                   {/* DETAILS BUTTON */}
//                   <td className="px-4 py-4">
//                     <button className="text-blue-500 hover:text-blue-700">
//                       View Details
//                     </button>
//                   </td>

//                 </tr>
//               );
//             })}

//             {/* ===== EMPTY STATE ===== */}
//             {orders.length === 0 && (
//               <tr>
//                 <td
//                   colSpan={7}
//                   className="px-4 py-8 text-center text-xs text-gray-400"
//                 >
//                   No orders found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AdminOrderTable;






import { use, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../Redux Toolkit/Store";
import { fetchAllOrders } from "../../Redux Toolkit/Features/Admin/AdminOrderSlice";
import { useNavigate } from "react-router-dom";

const OrderTable = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { orders, loading, error } = useAppSelector(
    (state) => state.adminOrders
  );

  /* ================= FETCH ORDERS ================= */
  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <p className="text-sm text-gray-500">
        Loading orders...
      </p>
    );
  }

  /* ================= ERROR ================= */
  if (error) {
    return (
      <p className="text-sm text-red-500">
        {error}
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {/* ===== TITLE ===== */}
      <div>
        <h2 className="text-xl font-semibold text-[#4A1F2A]">
          All Seller Orders
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          View and track all orders from sellers.
        </p>
      </div>

      {/* ===== TABLE ===== */}
      <div className="rounded-2xl bg-white border border-[#F0E4CC] overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#FFF7EA] text-xs text-gray-600 uppercase font-semibold">
            <tr>
              <th className="px-4 py-3">Order ID</th>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Seller</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Details</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order: any) => {
              const shipping = order.shippingAddress;

              return (
                <tr
                  key={order._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  {/* ORDER ID */}
                  <td className="px-4 py-4 font-medium">
                    {order._id}
                  </td>

                  {/* PRODUCT (SAFE – NO POPULATE REQUIRED) */}
                  <td className="px-4 py-4">
                    <p className="font-semibold">Product</p>
                    <p className="text-xs text-gray-600">
                      Qty: {order.totalItem || 1}
                    </p>
                  </td>

                  {/* CUSTOMER */}
                  <td className="px-4 py-4 text-xs">
                    <p className="font-semibold">
                      {shipping?.name || "-"}
                    </p>
                    <p>
                      {shipping?.city || "-"},{" "}
                      {shipping?.state || "-"}
                    </p>
                  </td>

                  {/* SELLER */}
                  <td className="px-4 py-4 text-xs">
                    {order.seller?.email || "-"}
                  </td>

                  {/* DATE */}
                  <td className="px-4 py-4 text-xs text-gray-500">
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString()
                      : "-"}
                  </td>

                  {/* AMOUNT */}
                  <td className="px-4 py-4 font-medium">
                    ₹{order.totalSellingPrice}
                  </td>

                  {/* STATUS */}
                  <td className="px-4 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold border
                        ${
                          order.orderStatus === "DELIVERED"
                            ? "bg-green-50 text-green-700 border-green-300"
                            : order.orderStatus === "CANCELLED"
                            ? "bg-red-50 text-red-700 border-red-300"
                            : "bg-yellow-50 text-yellow-700 border-yellow-300"
                        }`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>

                  {/* DETAILS */}
                  <td className="px-4 py-4">
                    <button className="text-blue-500 hover:text-blue-700 text-sm font-medium"
                    onClick={() => navigate(`/admin/orders/${order._id}`)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              );
            })}

            {/* EMPTY STATE */}
            {orders.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="px-4 py-8 text-center text-xs text-gray-400"
                >
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderTable;
