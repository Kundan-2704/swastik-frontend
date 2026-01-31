import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiAdmin } from "../../../Config/apiAdmin";

type InvoiceState = {
  loading: boolean;
  error: string | null;
  success: boolean;
};

const initialState: InvoiceState = {
  loading: false,
  error: null,
  success: false,
};

// 🔽 ADMIN DOWNLOAD INVOICE THUNK
export const adminDownloadInvoice = createAsyncThunk(
  "adminInvoice/download",
  async (orderId: string, { rejectWithValue }) => {
    try {
      const res = await apiAdmin.get(
        `/admin/orders/${orderId}/invoice/download`,
        {
          responseType: "blob",
        }
      );

      // ✅ auto download
      const blob = new Blob([res.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `invoice-${orderId}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();

      return true;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Invoice download failed"
      );
    }
  }
);

const adminInvoiceSlice = createSlice({
  name: "adminInvoice",
  initialState,
  reducers: {
    resetInvoiceState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminDownloadInvoice.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(adminDownloadInvoice.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(adminDownloadInvoice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export const { resetInvoiceState } = adminInvoiceSlice.actions;
export default adminInvoiceSlice.reducer;
