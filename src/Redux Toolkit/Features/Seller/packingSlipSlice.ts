import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiSeller } from "../../../Config/apiSeller";

/* ================= TYPES ================= */

interface PackingSlipState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: PackingSlipState = {
  loading: false,
  success:false,
  error: null,
};

/* ================= THUNK ================= */

export const downloadPackingSlip = createAsyncThunk<
  void,
  string,
  { rejectValue: string }
>(
  "seller/downloadPackingSlip",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await apiSeller.get(
        `/api/seller/orders/${orderId}/packing-slip`,
        { responseType: "blob" } // 🔥 IMPORTANT
      );

      // 🔽 Auto download PDF
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `packing-slip-${orderId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();

      return;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Packing slip download failed"
      );
    }
  }
);

/* ================= SLICE ================= */

const packingSlipSlice = createSlice({
  name: "packingSlip",
  initialState,
  reducers: {
    resetPackingSlipState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(downloadPackingSlip.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(downloadPackingSlip.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(downloadPackingSlip.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { resetPackingSlipState } = packingSlipSlice.actions;
export default packingSlipSlice.reducer;
