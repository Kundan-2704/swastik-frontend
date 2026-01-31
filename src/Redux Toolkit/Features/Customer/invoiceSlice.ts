import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiCustomer } from "../../../Config/apiCustomer";

export const downloadInvoice = createAsyncThunk(
  "invoice/download",
  async (orderId: string, { rejectWithValue }) => {
    try {
      const res = await apiCustomer.get(`/api/orders/${orderId}/invoice`, {
  responseType: "blob",
});


      const blob = new Blob([res.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `invoice-${orderId}.pdf`;
      a.click();

      return true;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Download failed");
    }
  }
);


const invoiceSlice = createSlice({
  name: "invoice",
  initialState: {
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(downloadInvoice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(downloadInvoice.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(downloadInvoice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default invoiceSlice.reducer;
