// import { useEffect } from "react";
// import { socket } from "../socket";
// import { useAppDispatch } from "../Redux Toolkit/Store";
// import { addNotification as addCustomerNotification } from "../Redux Toolkit/Features/Customer/NotificationSlice";
// import { addNotification as addSellerNotification } from "../Redux Toolkit/Features/Seller/NotificationSlice";
// import { addNotification as addAdminNotification } from "../Redux Toolkit/Features/Admin/NotificationSlice";
// import type { Notification } from "../types/Notification";

// export const useNotificationSocket = () => {
//   const dispatch = useAppDispatch();

//   useEffect(() => {
//     socket.on("notification:new", (data: Notification) => {
//       if (data.role === "CUSTOMER")
//         dispatch(addCustomerNotification(data));

//       if (data.role === "SELLER")
//         dispatch(addSellerNotification(data));

//       if (data.role === "ADMIN")
//         dispatch(addAdminNotification(data));
//     });

//     return () => {
//       socket.off("notification:new");
//     };
//   }, [dispatch]);
// };
