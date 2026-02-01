import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiAdmin } from "../../../Config/apiAdmin";

interface AdminReplacementState {
  loading: boolean;
  error: string | null;
  order: any | null;
}

const initialState: AdminReplacementState = {
  loading: false,
  error: null,
  order: null,
};

export const deliverReplacement = createAsyncThunk(
  "admin/replacement/deliver",
  async (orderId: string, { rejectWithValue }) => {
    try {
      const { data } = await apiAdmin.patch(
        `/api/replacements/deliver/${orderId}`
      );
      return data.order;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Error");
    }
  }
);

export const completeReplacement = createAsyncThunk(
  "admin/replacement/complete",
  async (orderId: string, { rejectWithValue }) => {
    try {
      const { data } = await apiAdmin.patch(
        `/api/replacements/complete/${orderId}`
      );
      return data.order;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Error");
    }
  }
);

const adminReplacementSlice = createSlice({
  name: "adminReplacement",
  initialState,
  reducers: {
    clearAdminReplacement: (state) => {
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deliverReplacement.fulfilled, (state, action) => {
        state.order = action.payload;
      })
      .addCase(completeReplacement.fulfilled, (state, action) => {
        state.order = action.payload;
      });
  },
});

export const { clearAdminReplacement } = adminReplacementSlice.actions;
export default adminReplacementSlice.reducer;
