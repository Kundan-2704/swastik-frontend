import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { apiAdmin } from "../../../Config/apiAdmin";

/* ================= TYPES ================= */

export interface AdminPayoutItem {
  _id: string;
  seller: {
    _id: string;
    shopName: string;
    email: string;
  };
  amount: number;
  status: "pending" | "processing" | "paid" | "failed" | "rejected";
  method: "bank" | "upi";
  createdAt: string;
}

interface AdminPayoutState {
  payouts: AdminPayoutItem[];
  loading: boolean;
  error: string | null;
}

const initialState: AdminPayoutState = {
  payouts: [],
  loading: false,
  error: null,
};

/* ================= THUNKS ================= */

/**
 * GET all payout requests (admin)
 */
export const fetchAdminPayouts = createAsyncThunk(
  "adminPayout/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiAdmin.get("/api/admin/payouts");
      return res.data.payouts || res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to load payouts"
      );
    }
  }
);

/**
 * UPDATE payout status (approve / reject / paid)
 */
export const updateAdminPayoutStatus = createAsyncThunk(
  "adminPayout/updateStatus",
  async (
payload: { payoutId: string; status: "paid" | "rejected" }
,
    { rejectWithValue }
  ) => {
    try {
      const res = await apiAdmin.put(
        `/api/admin/payouts/${payload.payoutId}`,
        { status: payload.status }
      );
      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Status update failed"
      );
    }
  }
);

/* ================= SLICE ================= */

const adminPayoutSlice = createSlice({
  name: "adminPayout",
  initialState,
  reducers: {
    clearAdminPayoutError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      /* ===== FETCH ===== */
      .addCase(fetchAdminPayouts.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchAdminPayouts.fulfilled,
        (state, action: PayloadAction<AdminPayoutItem[]>) => {
          state.loading = false;
          state.payouts = action.payload;
        }
      )
      .addCase(fetchAdminPayouts.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== UPDATE STATUS ===== */
      .addCase(updateAdminPayoutStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        updateAdminPayoutStatus.fulfilled,
        (state, action: PayloadAction<AdminPayoutItem>) => {
          state.loading = false;

          const index = state.payouts.findIndex(
            (p) => p._id === action.payload._id
          );
          if (index !== -1) {
            state.payouts[index] = action.payload;
          }
        }
      )
      .addCase(updateAdminPayoutStatus.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAdminPayoutError } = adminPayoutSlice.actions;
export default adminPayoutSlice.reducer;
