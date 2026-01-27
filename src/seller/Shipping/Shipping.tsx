import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Redux Toolkit/Store";
import { fetchSellrOrders } from "../../Redux Toolkit/Features/Seller/SellerOrderSlice";
import { bookCourier, resetShippingState } from "../../Redux Toolkit/Features/Seller/SellerShippingSlice";


const Shipping = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const jwt = localStorage.getItem("jwt");

  const orders = useAppSelector(
    (state) => state.sellerOrders?.orders || []
  );

  const { loading, success, error, lastBookedOrderId } = useAppSelector(
  (state) => state.sellerShipping
);


  useEffect(() => {
    if (jwt) {
      dispatch(fetchSellrOrders(jwt));
    }
  }, [dispatch, jwt]);

  // ✅ only orders which are confirmed & courier not booked
  const readyToShipOrders = orders.filter(
    (o: any) =>
      o.orderStatus === "CONFIRMED" &&
      !o.courier?.awb
  );

useEffect(() => {
  if (success) {
    alert("Courier booked successfully");
    dispatch(resetShippingState());
  }

  if (error) {
    alert(error);
    dispatch(resetShippingState());
  }
}, [success, error, dispatch]);


  return (
    <div className="space-y-4">
      {/* HEADER */}
      <div>
        <h2 className="text-xl font-semibold text-[#4A1F2A]">
          Shipping / Book Courier
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          Orders ready to be shipped. Book courier from here.
        </p>
      </div>

      {/* LIST */}
      <div className="rounded-2xl bg-white border border-[#F0E4CC] overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#FFF7EA] text-xs text-gray-600 uppercase font-semibold">
            <tr>
              <th className="px-4 py-3">Order ID</th>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {readyToShipOrders.map((order: any) => {
              const item = order.orderItems?.[0];
              const product = item?.product;

              return (
                <tr key={order._id} className="border-t">
                  <td className="px-4 py-4 font-medium text-[#4A1F2A]">
                    {order._id}
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex gap-3">
                      <img
                        src={product?.images?.[0] || "/placeholder.png"}
                        className="w-12 h-16 rounded-lg object-cover border"
                      />
                      <div>
                        <p className="font-semibold">
                          {product?.title || "Product"}
                        </p>
                        <p className="text-xs text-gray-500">
                          Qty: {item?.quantity}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-4 font-medium">
                    ₹{order.totalSellingPrice}
                  </td>

                  <td className="px-4 py-4">
                    <span className="px-3 py-1 text-xs rounded-full bg-amber-50 border border-amber-500 text-amber-600">
                      Ready to Ship
                    </span>
                  </td>

                  <td className="px-4 py-4 text-right">
                   <button
  disabled={loading}
  onClick={() => dispatch(bookCourier(order._id))}
  className="px-4 py-1.5 text-xs rounded-full bg-[#B9935A] text-white font-semibold disabled:opacity-60"
>
  {loading && lastBookedOrderId === order._id
    ? "Booking..."
    : "Book Courier"}
</button>

                  </td>
                </tr>
              );
            })}

            {readyToShipOrders.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-8 text-center text-xs text-gray-400"
                >
                  No orders ready to ship.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Shipping;
