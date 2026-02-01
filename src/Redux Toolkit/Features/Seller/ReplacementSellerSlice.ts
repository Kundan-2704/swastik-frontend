import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiSeller } from "../../../Config/apiSeller";

interface SellerReplacementState {
  loading: boolean;
  error: string | null;
  order: any | null;
}

const initialState: SellerReplacementState = {
  loading: false,
  error: null,
  order: null,
};

export const approveReplacement = createAsyncThunk(
  "seller/replacement/approve",
  async (
    { orderId, sellerNote }: { orderId: string; sellerNote?: string },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await apiSeller.patch(
        `/api/replacements/approve/${orderId}`,
        { sellerNote }
      );
      return data.order;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Error");
    }
  }
);

export const rejectReplacement = createAsyncThunk(
  "seller/replacement/reject",
  async (
    { orderId, note }: { orderId: string; note: string },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await apiSeller.patch(
        `/api/replacements/reject/${orderId}`,
        { note }
      );
      return data.order;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Error");
    }
  }
);

export const pickupReplacement = createAsyncThunk(
  "seller/replacement/pickup",
  async (
    { orderId, awb, courier }: { orderId: string; awb: string; courier: string },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await apiSeller.patch(
        `/api/replacements/pickup/${orderId}`,
        { awb, courier }
      );
      return data.order;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Error");
    }
  }
);

export const shipReplacement = createAsyncThunk(
  "seller/replacement/ship",
  async (
    { orderId, awb, courier }: { orderId: string; awb: string; courier: string },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await apiSeller.patch(
        `/api/replacements/ship/${orderId}`,
        { awb, courier }
      );
      return data.order;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Error");
    }
  }
);

const sellerReplacementSlice = createSlice({
  name: "sellerReplacement",
  initialState,
  reducers: {
    clearSellerReplacement: (state) => {
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(approveReplacement.fulfilled, (state, action) => {
        state.order = action.payload;
      })
      .addCase(rejectReplacement.fulfilled, (state, action) => {
        state.order = action.payload;
      })
      .addCase(pickupReplacement.fulfilled, (state, action) => {
        state.order = action.payload;
      })
      .addCase(shipReplacement.fulfilled, (state, action) => {
        state.order = action.payload;
      });
  },
});

export const { clearSellerReplacement } = sellerReplacementSlice.actions;
export default sellerReplacementSlice.reducer;
