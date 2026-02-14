





import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiCustomer } from "../../../Config/apiCustomer";

const API_URL = "/api/coupon";

// ===================== INITIAL STATE =====================



const initialState = {
  coupon: null as any,

  loading: false,
  success: false,
  error: "" as string
};

// ===================== THUNKS =====================

// APPLY COUPON
export const applyCoupon = createAsyncThunk<any, any>(
  "coupon/applyCoupon",
  async ({ apply, code, orderValue, jwt }, { rejectWithValue }) => {
    try {
      const response = await apiCustomer.post(
        `${API_URL}/apply`,
        null,
        {
          params: { apply, code, orderValue },
          headers: { Authorization: `Bearer ${jwt}` }
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue({
        message:
          error.response?.data?.message || "Failed to apply coupon",
        status: error.response?.status || 500
      });
    }
  }
);

// ===================== SLICE =====================

const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    clearCoupon: (state) => {
      state.coupon = null;
      state.discountAmount = 0;
      state.finalAmount = 0;
      state.success = false;
    },
    clearCouponError: (state) => {
      state.error = "";
    }
  },
  extraReducers: (builder) => {
    builder

      // APPLY COUPON
      .addCase(applyCoupon.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.success = false;
      })
      .addCase(applyCoupon.fulfilled, (state, action) => {
  state.loading = false;
  state.success = true;
  state.coupon = action.payload;
})
      .addCase(applyCoupon.rejected, (state, action: any) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload?.message;
      });
  }
});

// ===================== EXPORTS =====================

export const { clearCoupon, clearCouponError } = couponSlice.actions;

export default couponSlice.reducer;
