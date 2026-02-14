import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiSeller } from "../../../Config/apiSeller";

// ===================== INITIAL STATE =====================

const initialState = {
  transactions: [] as any[],
  loading: false,
  error: ""
};

// ===================== THUNK =====================

export const fetchTransactionsBySeller = createAsyncThunk<any, any>(
  "/transaction/fetchTransactionsBySeller",
  async (jwt, { rejectWithValue }) => {
    try {
      const response = await apiSeller.get(`/api/transactions/seller`, {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      });
      return response.data;
    } catch (error: any) {
      console.log("error", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch transactions"
      );
    }
  }
);

// ===================== SLICE =====================

const sellerTransactionSlice = createSlice({
  name: "sellerTransaction",
  initialState,
  reducers: {
    clearTransactionError: (state) => {
      state.error = "";
    }
  },
  extraReducers: (builder) => {
    builder

      // ===== FETCH TRANSACTIONS =====
      .addCase(fetchTransactionsBySeller.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchTransactionsBySeller.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTransactionsBySeller.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

// ===================== EXPORT =====================

export const { clearTransactionError } =
  sellerTransactionSlice.actions;

export default sellerTransactionSlice.reducer;
