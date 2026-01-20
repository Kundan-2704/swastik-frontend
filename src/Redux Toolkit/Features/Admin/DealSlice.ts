import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiCustomer } from "../../../Config/apiCustomer";

interface Deal {
  _id: string;
  title: string;
  position: string;
  discount: string;
  startDate: string;
  endDate: string;
  active: boolean;
}

interface DealState {
  deals: Deal[];
  loading: boolean;
  error: string;
}

const initialState: DealState = {
  deals: [],
  loading: false,
  error: ""
};

/* ================= CREATE DEAL ================= */
export const createDeal = createAsyncThunk<Deal, any>(
  "deal/createDeal",
  async (deal, { rejectWithValue }) => {
    try {
      const res = await apiCustomer.post(`/admin/deals`, deal, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`
        }
      });
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

/* ================= GET ALL DEALS ================= */
export const getAllDeals = createAsyncThunk<Deal[]>(
  "deal/getAllDeals",
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiCustomer.get(`/admin/deals`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`
        }
      });
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

/* ================= DELETE DEAL ================= */
export const deleteDeals = createAsyncThunk<string, string>(
  "deal/deleteDeals",
  async (id, { rejectWithValue }) => {
    try {
      await apiCustomer.delete(`/admin/deals/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`
        }
      });
      return id;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

/* ================= UPDATE DEAL ================= */
export const updateDeals = createAsyncThunk<Deal, { id: string; deal: any }>(
  "deal/updateDeals",
  async ({ id, deal }, { rejectWithValue }) => {
    try {
      const res = await apiCustomer.patch(`/admin/deals/${id}`, deal, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`
        }
      });
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

/* ================= SLICE ================= */
const DealSlice = createSlice({
  name: "adminDeal",
  initialState,
  reducers: {
    clearDealError: (state) => {
      state.error = "";
    }
  },
  extraReducers: (builder) => {
    builder

      .addCase(getAllDeals.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllDeals.fulfilled, (state, action) => {
        state.loading = false;
        state.deals = action.payload;
      })
      .addCase(getAllDeals.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createDeal.fulfilled, (state, action) => {
        state.deals.unshift(action.payload);
      })

      .addCase(deleteDeals.fulfilled, (state, action) => {
        state.deals = state.deals.filter(
          (deal) => deal._id !== action.payload
        );
      })

      .addCase(updateDeals.fulfilled, (state, action) => {
        state.deals = state.deals.map((deal) =>
          deal._id === action.payload._id ? action.payload : deal
        );
      });
  }
});

export const { clearDealError } = DealSlice.actions;
export default DealSlice.reducer;
