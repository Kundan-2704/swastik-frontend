import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiAdmin } from "../../../Config/apiAdmin";

/* ================= TYPES ================= */
interface AdminOrderState {
  orders: any[];        // Orders list page
  order: any | null;    // Single order details page
  loading: boolean;
  error: string;
}

/* ================= INITIAL STATE ================= */
const initialState: AdminOrderState = {
  orders: [],
  order: null,
  loading: false,
  error: "",
};

/* ================= THUNKS ================= */

/* 🔹 FETCH ALL ORDERS (ADMIN TABLE) */
export const fetchAllOrders = createAsyncThunk<any[]>(
  "adminOrders/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiAdmin.get("/admin/orders");
      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch orders"
      );
    }
  }
);

/* 🔹 FETCH ORDER BY ID (ORDER DETAILS PAGE) */
export const fetchOrderById = createAsyncThunk<any, string>(
  "adminOrders/fetchById",
  async (orderId, { rejectWithValue }) => {
    try {
      const res = await apiAdmin.get(`/admin/orders/${orderId}`);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch order details"
      );
    }
  }
);

export const updateOrderShipping = createAsyncThunk(
  "adminOrders/updateShipping",
  async (
    {
      jwt,
      orderId,
      data,
    }: {
      jwt: string;
      orderId: string;
      data: any;
    },
    { rejectWithValue }
  ) => {
    try {
     const res = await apiAdmin.put(
  `/admin/orders/${orderId}/shipping`, // ❗ /api hatao
  data,
  {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  }
);

      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


/* ================= SLICE ================= */
const adminOrderSlice = createSlice({
  name: "adminOrders",
  initialState,
  reducers: {
    clearAdminOrders(state) {
      state.orders = [];
      state.order = null;
      state.error = "";
    },
    clearAdminOrderDetails(state) {
      state.order = null;
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder

      /* ===== FETCH ALL ORDERS ===== */
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      /* ===== FETCH ORDER BY ID ===== */
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateOrderShipping.fulfilled, (state, action) => {
  if (state.order) {
    state.order.shipping = action.payload.shipping;
  }
})
      
  },
});

/* ================= EXPORTS ================= */
export const {
  clearAdminOrders,
  clearAdminOrderDetails,
} = adminOrderSlice.actions;

export default adminOrderSlice.reducer;
