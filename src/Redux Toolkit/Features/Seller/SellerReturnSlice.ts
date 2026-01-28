import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiSeller } from "../../../Config/apiSeller";

/* ================= TYPES ================= */

export interface ReturnItem {
  _id: string;
  orderId: string;
  productId: string;
  reason: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | "PICKED_UP" | "RECEIVED";
  createdAt: string;
}

interface ReturnState {
  returns: ReturnItem[];
  selectedReturn: ReturnItem | null;
  loading: boolean;
  error: string | null;
}

/* ================= INITIAL STATE ================= */

const initialState: ReturnState = {
  returns: [],
  selectedReturn: null,
  loading: false,
  error: null,
};

/* ================= THUNKS ================= */
/* Fetch all seller returns */
export const fetchSellerReturns = createAsyncThunk<
  ReturnItem[],
  void,
  { rejectValue: string }
>("sellerReturns/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const { data } = await apiSeller.get("/api/returns");
    return data.data;
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || "Failed to load returns"
    );
  }
});

/* Fetch single return */
export const fetchSellerReturnById = createAsyncThunk<
  ReturnItem,
  string,
  { rejectValue: string }
>("sellerReturns/fetchById", async (id, { rejectWithValue }) => {
  try {
    const { data } = await apiSeller.get(`/api/returns/${id}`);
    return data.data;
  } catch (err: any) {
    return rejectWithValue("Failed to load return details");
  }
});

/* Approve */
export const approveReturn = createAsyncThunk<
  ReturnItem,
  string,
  { rejectValue: string }
>("sellerReturns/approve", async (id, { rejectWithValue }) => {
  try {
    const { data } = await apiSeller.put(`/api/returns/${id}/approve`);
    return data.data;
  } catch (err: any) {
    return rejectWithValue("Failed to approve return");
  }
});

/* Reject */
export const rejectReturn = createAsyncThunk<
  ReturnItem,
  { id: string; note: string },
  { rejectValue: string }
>("sellerReturns/reject", async ({ id, note }, { rejectWithValue }) => {
  try {
    const { data } = await apiSeller.put(`/api/returns/${id}/reject`, { note });
    return data.data;
  } catch (err: any) {
    return rejectWithValue("Failed to reject return");
  }
});

/* ================= SLICE ================= */

const sellerReturnSlice = createSlice({
  name: "sellerReturns",
  initialState,
  reducers: {
    clearSelectedReturn(state) {
      state.selectedReturn = null;
    },
  },
  extraReducers: (builder) => {
    builder

      /* FETCH ALL */
      .addCase(fetchSellerReturns.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellerReturns.fulfilled, (state, action) => {
        state.loading = false;
        state.returns = action.payload;
      })
      .addCase(fetchSellerReturns.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error";
      })

      /* FETCH ONE */
      .addCase(fetchSellerReturnById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSellerReturnById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedReturn = action.payload;
      })
      .addCase(fetchSellerReturnById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error";
      })

      /* APPROVE */
      .addCase(approveReturn.fulfilled, (state, action) => {
        state.returns = state.returns.map((r) =>
          r._id === action.payload._id ? action.payload : r
        );
      })

      /* REJECT */
      .addCase(rejectReturn.fulfilled, (state, action) => {
        state.returns = state.returns.map((r) =>
          r._id === action.payload._id ? action.payload : r
        );
      });
  },
});

export const { clearSelectedReturn } = sellerReturnSlice.actions;

export default sellerReturnSlice.reducer;
