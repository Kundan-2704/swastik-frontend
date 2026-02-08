import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiCustomer } from "../../../Config/apiCustomer";

interface ReplacementState {
  loading: boolean;
  success: boolean;
  error: string | null;
  order: any | null;
}

const initialState: ReplacementState = {
  loading: false,
  success: false,
  error: null,
  order: null,
};

export const requestReplacement = createAsyncThunk(
  "customer/replacement/request",
  async (
    { orderId, reason }: { orderId: string; reason: string },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await apiCustomer.post(
        "/api/replacements/request",
        { orderId, reason }
      );
      return data.order;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Error");
    }
  }
);

const customerReplacementSlice = createSlice({
  name: "customerReplacement",
  initialState,
  reducers: {
    clearCustomerReplacement: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestReplacement.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(requestReplacement.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.order = action.payload;
      })
      .addCase(requestReplacement.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload || "Replacment Request failed";
      });
  },
});

export const { clearCustomerReplacement } = customerReplacementSlice.actions;
export default customerReplacementSlice.reducer;
