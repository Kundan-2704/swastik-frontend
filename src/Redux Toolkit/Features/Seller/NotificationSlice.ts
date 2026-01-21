// import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
// import axios from "axios";
// import type { Notification } from "../../../types/Notification";

// /* ================= TYPES ================= */

// interface NotificationState {
//   list: Notification[];
//   unread: number;
//   loading: boolean;
//   error: string | null;
// }

// const initialState: NotificationState = {
//   list: [],
//   unread: 0,
//   loading: false,
//   error: null,
// };

// /* ================= THUNK ================= */

// // 🔔 Fetch seller notifications
// export const fetchSellerNotifications = createAsyncThunk<
//   Notification[],
//   void,
//   { rejectValue: string }
// >("sellerNotifications/fetch", async (_, { rejectWithValue }) => {
//   try {
//     const res = await axios.get("/api/notifications", {
//       withCredentials: true,
//     });
//     return res.data;
//   } catch (err: any) {
//     return rejectWithValue(
//       err.response?.data?.message || "Failed to fetch notifications"
//     );
//   }
// });

// /* ================= SLICE ================= */

// const sellerNotificationSlice = createSlice({
//   name: "sellerNotifications",
//   initialState,
//   reducers: {
//     addNotification(state, action: PayloadAction<Notification>) {
//       state.list.unshift(action.payload);
//       state.unread += 1;
//     },

//     markRead(state, action: PayloadAction<string>) {
//       const n = state.list.find(n => n._id === action.payload);
//       if (n && !n.isRead) {
//         n.isRead = true;
//         state.unread -= 1;
//       }
//     },

//     markAllRead(state) {
//       state.list.forEach(n => (n.isRead = true));
//       state.unread = 0;
//     },

//     clearNotifications(state) {
//       state.list = [];
//       state.unread = 0;
//     },
//   },

//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchSellerNotifications.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(
//         fetchSellerNotifications.fulfilled,
//         (state, action: PayloadAction<Notification[]>) => {
//           state.loading = false;
//           state.list = action.payload;
//           state.unread = action.payload.filter(n => !n.isRead).length;
//         }
//       )
//       .addCase(fetchSellerNotifications.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || "Error";
//       });
//   },
// });

// /* ================= EXPORTS ================= */

// export const {
//   addNotification,
//   markRead,
//   markAllRead,
//   clearNotifications,
// } = sellerNotificationSlice.actions;

// export default sellerNotificationSlice.reducer;




export const fetchSellerNotifications = () => {
  return { type: "notification/disabled" };
};