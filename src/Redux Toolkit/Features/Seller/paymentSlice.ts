import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiSeller } from "../../../Config/apiSeller";

/* ================= TYPES ================= */

interface NextPayout {
  amount: number;
  date: string;
}

interface PaymentSummary {
  totalEarnings: number;
  available: number;
  onHold: number;
  nextPayout: NextPayout | null;
}

interface PaymentState {
  loading: boolean;
  summary: PaymentSummary;
  error: string | null;
}

/* ================= INITIAL STATE ================= */

const initialState: PaymentState = {
  loading: false,
  summary: {
    totalEarnings: 0,
    available: 0,
    onHold: 0,
    nextPayout: null,
  },
  error: null,
};

/* ================= THUNK ================= */

export const fetchSellerPaymentSummary = createAsyncThunk(
  "sellerPayments/fetchSummary",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await apiSeller.get("/api/payment/summary");
      return data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to load payment data"
      );
    }
  }
);

/* ================= SLICE ================= */

const paymentSlice = createSlice({
  name: "sellerPayments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSellerPaymentSummary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellerPaymentSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.summary = action.payload;
      })
      .addCase(fetchSellerPaymentSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default paymentSlice.reducer;
