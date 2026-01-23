import { createSlice, createAsyncThunk, type PayloadAction} from "@reduxjs/toolkit";
import { apiSeller } from "../../../Config/apiSeller";

/* ================= TYPES ================= */

export interface PayoutSummary {
  availableBalance: number;
  holdBalance: number;
  totalEarnings: number;
}

export interface PayoutHistoryItem {
  _id: string;
  amount: number;
  status: "pending" | "processing" | "paid" | "failed" | "rejected";
  createdAt: string;
}

interface SellerPayoutState {
  summary: PayoutSummary | null;
  history: PayoutHistoryItem[];
  loading: boolean;
  error: string | null;
}

const initialState: SellerPayoutState = {
  summary: null,
  history: [],
  loading: false,
  error: null,
};

/* ================= THUNKS ================= */

export const fetchSellerPayoutSummary = createAsyncThunk(
  "sellerPayout/summary",
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiSeller.get("/api/sellers/wallet");
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to load summary");
    }
  }
);

export const fetchSellerPayoutHistory = createAsyncThunk(
  "sellerPayout/history",
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiSeller.get("/api/sellers/payouts");
      return res.data.payouts;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to load history");
    }
  }
);

export const requestSellerPayout = createAsyncThunk(
  "sellerPayout/request",
  async (
    payload: { amount: number; method: "bank" | "upi"; upiId?: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await apiSeller.post("/api/sellers/payouts/request", payload);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Payout request failed");
    }
  }
);

/* ================= SLICE ================= */

const sellerPayoutSlice = createSlice({
  name: "sellerPayout",
  initialState,
  reducers: {
    clearPayoutError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      /* ===== SUMMARY ===== */
      .addCase(fetchSellerPayoutSummary.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSellerPayoutSummary.fulfilled, (state, action: PayloadAction<PayoutSummary>) => {
        state.loading = false;
        state.summary = action.payload;
      })
      .addCase(fetchSellerPayoutSummary.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== HISTORY ===== */
      .addCase(fetchSellerPayoutHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSellerPayoutHistory.fulfilled, (state, action: PayloadAction<PayoutHistoryItem[]>) => {
        state.loading = false;
        state.history = action.payload;
      })
      .addCase(fetchSellerPayoutHistory.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== REQUEST PAYOUT ===== */
      .addCase(requestSellerPayout.pending, (state) => {
        state.loading = true;
      })
      .addCase(requestSellerPayout.fulfilled, (state, action: PayloadAction<PayoutHistoryItem>) => {
        state.loading = false;
        state.history.unshift(action.payload);

        if (state.summary) {
          state.summary.availableBalance -= action.payload.amount;
          state.summary.pendingBalance += action.payload.amount;
        }
      })
      .addCase(requestSellerPayout.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearPayoutError } = sellerPayoutSlice.actions;
export default sellerPayoutSlice.reducer;
