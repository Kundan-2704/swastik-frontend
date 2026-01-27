import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiSeller } from "../../../Config/apiSeller";

interface ShippingState {
  loading: boolean;
  success: boolean;
  error: string | null;
  lastBookedOrderId: string | null;
}

const initialState: ShippingState = {
  loading: false,
  success: false,
  error: null,
  lastBookedOrderId: null,
};

/* ================= THUNK ================= */
export const bookCourier = createAsyncThunk(
  "sellerShipping/bookCourier",
  async (orderId: string, { rejectWithValue }) => {
    try {
      const res = await apiSeller.post(
  `/api/sellers/orders/${orderId}/courier/book`
);

      return { orderId, courier: res.data.courier };
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Courier booking failed"
      );
    }
  }
);

/* ================= SLICE ================= */
const sellerShippingSlice = createSlice({
  name: "sellerShipping",
  initialState,
  reducers: {
    resetShippingState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.lastBookedOrderId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(bookCourier.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(bookCourier.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.lastBookedOrderId = action.payload.orderId;
      })
      .addCase(bookCourier.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetShippingState } = sellerShippingSlice.actions;
export default sellerShippingSlice.reducer;
