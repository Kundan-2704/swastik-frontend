import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiAdmin } from "../../../Config/apiAdmin";

interface InvoiceState {
  generating: boolean;
  sent: boolean;
  error: string | null;
}

const initialState: InvoiceState = {
  generating: false,
  sent: false,
  error: null,
};

/* ================= THUNK ================= */
export const generateInvoice = createAsyncThunk(
  "adminInvoice/generate",
  async (orderId: string, { rejectWithValue }) => {
    try {
      const res = await apiAdmin.post(
        `/api/admin/orders/${orderId}/invoice`
      );
      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Invoice generation failed"
      );
    }
  }
);

/* ================= SLICE ================= */
const adminInvoiceSlice = createSlice({
  name: "adminInvoice",
  initialState,
  reducers: {
    resetInvoiceState: (state) => {
      state.generating = false;
      state.sent = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateInvoice.pending, (state) => {
        state.generating = true;
        state.sent = false;
        state.error = null;
      })
      .addCase(generateInvoice.fulfilled, (state) => {
        state.generating = false;
        state.sent = true;
      })
      .addCase(generateInvoice.rejected, (state, action) => {
        state.generating = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetInvoiceState } = adminInvoiceSlice.actions;
export default adminInvoiceSlice.reducer;
