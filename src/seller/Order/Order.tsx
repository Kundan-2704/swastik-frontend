import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../Redux Toolkit/Store";
import {
  fetchSellrOrders,
  updateOrdersStatus,
} from "../../Redux Toolkit/Features/Seller/SellerOrderSlice";

type OrderStatus = "PENDING" | "SHIPPED" | "DELIVERED" | "CANCELLED";

const Order = () => {
  const dispatch = useAppDispatch();

  const jwt = localStorage.getItem("jwt");

  // 🔹 Redux orders
  const orders = useAppSelector(
    (state) => state.sellerOrders?.orders || []
  );

  // 🔹 Status modal states
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] =
    useState<OrderStatus>("PENDING");

  // 🔹 Fetch orders
  useEffect(() => {
    if (jwt) {
      dispatch(fetchSellrOrders(jwt));
    }
  }, [dispatch, jwt]);

  const getStatusButtonClasses = (status: OrderStatus) => {
    switch (status) {
      case "PENDING":
        return "border-amber-500 text-amber-600 bg-amber-50";
      case "SHIPPED":
        return "border-blue-500 text-blue-600 bg-blue-50";
      case "DELIVERED":
        return "border-emerald-500 text-emerald-600 bg-emerald-50";
      case "CANCELLED":
        return "border-rose-500 text-rose-600 bg-rose-50";
      default:
        return "border-gray-300 text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="space-y-4">
      {/* TITLE */}
      <div>
        <h2 className="text-xl font-semibold text-[#4A1F2A]">All Orders</h2>
        <p className="text-xs text-gray-500 mt-1">
          Track and manage all customer orders.
        </p>
      </div>

      {/* TABLE */}
      <div className="rounded-2xl bg-white border border-[#F0E4CC] overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#FFF7EA] text-xs text-gray-600 uppercase font-semibold">
            <tr>
              <th className="px-4 py-3">Order ID</th>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Shipping Address</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order: any) => {
              const item = order.orderItems?.[0];
              const product = item?.product;
              const shipping = order.shippingAddress;

              return (
                <tr key={order._id} className="border-t">
                  {/* ORDER ID */}
                  <td className="px-4 py-4 font-medium text-[#4A1F2A]">
                    {order._id}
                  </td>

                  {/* PRODUCT */}
                  <td className="px-4 py-4">
                    <div className="flex gap-3">
                      <img
                        src={product?.images?.[0] || "/placeholder.png"}
                        className="w-16 h-20 rounded-lg object-cover border"
                      />
                      <div>
                        <p className="font-semibold text-[#4A1F2A]">
                          {product?.title || "Product"}
                        </p>
                        <p className="text-xs text-gray-600">
                          Price: ₹{item?.sellingPrice ?? "-"}
                        </p>
                        <p className="text-xs text-gray-600">
                          Size: {item?.size ?? "-"}
                        </p>
                        <p className="text-xs text-gray-600">
                          Qty: {item?.quantity ?? "-"}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* SHIPPING */}
                  <td className="px-4 py-4 text-sm">
                    <p className="font-semibold text-[#4A1F2A]">
                      {shipping?.name || "-"}
                    </p>
                    <p>{shipping?.locality || "-"}</p>
                    <p>
                      {shipping?.city || "-"}, {shipping?.state || "-"} -{" "}
                      {shipping?.pincode || "-"}
                    </p>
                    <p className="text-xs mt-1">
                      Mobile: {shipping?.mobile || "-"}
                    </p>
                  </td>

                  {/* DATE */}
                  <td className="px-4 py-4 text-xs text-gray-500">
                    {order.orderDate
                      ? new Date(order.orderDate).toLocaleDateString()
                      : "-"}
                  </td>

                  {/* AMOUNT */}
                  <td className="px-4 py-4 font-medium">
                    ₹{order.totalSellingPrice ?? "-"}
                  </td>

                  {/* STATUS */}
                  <td className="px-4 py-4">
                    <span
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${getStatusButtonClasses(
                        order.orderStatus
                      )}`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td className="px-4 py-4 text-right space-x-2">
                    

                    <button
                      className="text-xs px-3 py-1 rounded-full border border-[#B9935A] text-[#B9935A]"
                      onClick={() => {
                        setSelectedOrderId(order._id);
                        setSelectedStatus(order.orderStatus);
                        setIsStatusModalOpen(true);
                      }}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              );
            })}

            {orders.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-8 text-center text-xs text-gray-400"
                >
                  No orders yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* STATUS UPDATE MODAL */}
      {isStatusModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-sm p-5 border border-[#F0E4CC]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-[#4A1F2A]">
                Update Order Status
              </h3>
              <button
                onClick={() => setIsStatusModalOpen(false)}
                className="text-xs text-gray-500"
              >
                ✕
              </button>
            </div>

            <select
              value={selectedStatus}
              onChange={(e) =>
                setSelectedStatus(e.target.value as OrderStatus)
              }
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm"
            >
              <option value="PENDING">Pending</option>
              <option value="SHIPPED">Shipped</option>
              <option value="DELIVERED">Delivered</option>
              <option value="CANCELLED">Cancelled</option>
            </select>

            <div className="flex justify-end gap-2 mt-5">
              <button
                onClick={() => setIsStatusModalOpen(false)}
                className="px-3 py-1.5 text-xs rounded-full border"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  if (!jwt || !selectedOrderId) return;

                  dispatch(
                    updateOrdersStatus({
                      jwt,
                      orderId: selectedOrderId,
                      orderStatus: selectedStatus,
                    })
                  );

                  setIsStatusModalOpen(false);
                }}
                className="px-4 py-1.5 text-xs rounded-full bg-[#B9935A] text-white font-semibold"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;
