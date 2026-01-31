import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiAdmin } from "../../../Config/apiAdmin";

export const downloadMonthlyInvoices = createAsyncThunk(
  "adminInvoice/bulkDownload",
  async (
    { month, year }: { month: number; year: number },
    { rejectWithValue }
  ) => {
    try {
      const res = await apiAdmin.get(
        `/admin/orders/invoices/bulk?month=${month}&year=${year}`,
        { responseType: "blob" }
      );

      const blob = new Blob([res.data], { type: "application/zip" });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `GST-${month}-${year}-invoices.zip`;
      a.click();

      return true;
    } catch (err) {
      return rejectWithValue("Bulk download failed");
    }
  }
);

const slice = createSlice({
  name: "adminInvoiceBulk",
  initialState: {
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(downloadMonthlyInvoices.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(downloadMonthlyInvoices.fulfilled, (s) => {
        s.loading = false;
      })
      .addCase(downloadMonthlyInvoices.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload as string;
      });
  },
});

export default slice.reducer;
