import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { apiCustomer } from "../../../Config/apiCustomer";
import { apiSeller } from "../../../Config/apiSeller";
import { apiAdmin } from "../../../Config/apiAdmin";

/* ================= TYPES ================= */

export interface Notification {
  _id: string;
  title: string;
  message: string;
  type: string;
  role: "admin" | "seller" | "customer";
  isRead: boolean;
  createdAt: string;
  data?: any;
}

interface NotificationState {
  items: Notification[];
  loading: boolean;
  error: string | null;
  unreadCount: number;
}

const initialState: NotificationState = {
  items: [],
  loading: false,
  error: null,
  unreadCount: 0,
};

/* ================= HELPER ================= */

// role based axios selector
const getApi = () => {
  if (localStorage.getItem("admin_jwt")) return apiAdmin;
  if (localStorage.getItem("jwt")) return apiSeller; // seller / customer
  return apiCustomer;
};

/* ================= THUNKS ================= */

// FETCH NOTIFICATIONS
export const fetchNotifications = createAsyncThunk<
  Notification[],
  void,
  { rejectValue: string }
>("notification/fetch", async (_, { rejectWithValue }) => {
  try {
    const api = getApi();
    const res = await api.get("/notifications");
    return res.data;
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || "Failed to fetch notifications"
    );
  }
});

// MARK AS READ
export const markNotificationRead = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("notification/read", async (id, { rejectWithValue }) => {
  try {
    const api = getApi();
    await api.patch(`/notifications/${id}/read`);
    return id;
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || "Failed to mark notification read"
    );
  }
});

/* ================= SLICE ================= */

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    clearNotifications: (state) => {
      state.items = [];
      state.unreadCount = 0;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchNotifications.fulfilled,
        (state, action: PayloadAction<Notification[]>) => {
          state.loading = false;
          state.items = action.payload;
          state.unreadCount = action.payload.filter((n) => !n.isRead).length;
        }
      )
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error fetching notifications";
      })

      // MARK READ
      .addCase(markNotificationRead.fulfilled, (state, action) => {
        const id = action.payload;
        const n = state.items.find((i) => i._id === id);
        if (n) n.isRead = true;
        state.unreadCount = state.items.filter((n) => !n.isRead).length;
      });
  },
});

export const { clearNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;
