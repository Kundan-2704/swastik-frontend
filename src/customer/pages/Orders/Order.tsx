import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
import { fetchUserOrderHistory } from "../../../Redux Toolkit/Features/Customer/OrderSlice";
import OrderItemCard from "./OrderItemCard";

const Order = () => {

  const dispatch = useAppDispatch();
  const order = useAppSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchUserOrderHistory(localStorage.getItem("jwt") || ""));
  }, [dispatch]);

  return (
    <div className="text-sm">
      <div className="pb-4">
        <h1 className="font-semibold text-lg text-[#4A1F2A]">All Orders</h1>
        <p className="text-[#7A6A58] text-xs">From anytime</p>
      </div>

      <div className="space-y-3">
        {order.orders && order.orders.length > 0 ? (
          order.orders.map((ord) =>
            ord.orderItems.map((item) => (<OrderItemCard key={item._id} orderItem={item} order={ord} />)
            )
          )
        ) : (
          <p className="text-[#7A6A58] text-sm">No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default Order;
