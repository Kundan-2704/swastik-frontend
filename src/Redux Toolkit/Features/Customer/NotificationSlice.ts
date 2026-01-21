// import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
// import axios from "axios";
// import type { Notification } from "../../../types/Notification";

// /* ================= TYPES ================= */

// interface State {
//     list: Notification[];
//     unread: number;
//     loading: boolean;
//     error: string | null;
// }

// const initialState: State = {
//     list: [],
//     unread: 0,
//     loading: false,
//     error: null,
// };

// /* ================= THUNK ================= */

// // 🔥 Fetch all notifications (seller)
// export const fetchNotifications = createAsyncThunk<
//     Notification[],
//     void,
//     { rejectValue: string }
// >("sellerNotifications/fetch", async (_, { rejectWithValue }) => {
//     try {
//         const res = await axios.get("/api/notifications", {
//             withCredentials: true,
//         });
//         return res.data;
//     } catch (err: any) {
//         return rejectWithValue(err.response?.data?.message || "Failed to load notifications");
//     }
// });

// /* ================= SLICE ================= */

// const sellerNotificationSlice = createSlice({
//     name: "sellerNotifications",
//     initialState,
//     reducers: {
//         setNotifications(state, action: PayloadAction<Notification[]>) {
//             state.list = action.payload;
//             state.unread = action.payload.filter(n => !n.isRead).length;
//         },

//         addNotification(state, action: PayloadAction<Notification>) {
//             state.list.unshift(action.payload);
//             state.unread += 1;
//         },

//         markRead(state, action: PayloadAction<string>) {
//             const n = state.list.find(n => n._id === action.payload);
//             if (n && !n.isRead) {
//                 n.isRead = true;
//                 state.unread -= 1;
//             }
//         },

//         markAllRead(state) {
//             state.list.forEach(n => (n.isRead = true));
//             state.unread = 0;
//         },
//     },

//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchNotifications.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(
//                 fetchNotifications.fulfilled,
//                 (state, action: PayloadAction<Notification[]>) => {
//                     state.loading = false;
//                     state.list = action.payload;
//                     state.unread = action.payload.filter(n => !n.isRead).length;
//                 }
//             )
//             .addCase(fetchNotifications.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload || "Error";
//             });
//     },
// });

// /* ================= EXPORTS ================= */

// export const {
//     setNotifications,
//     addNotification,
//     markRead,
//     markAllRead,
// } = sellerNotificationSlice.actions;

// export default sellerNotificationSlice.reducer;


// TEMPORARY dummy notification slice (disabled)

export const fetchNotifications = () => {
  return { type: "notification/disabled" };
};
