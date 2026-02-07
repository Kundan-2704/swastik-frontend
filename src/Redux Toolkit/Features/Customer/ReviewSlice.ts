import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiCustomer } from "../../../Config/apiCustomer";

// ================== THUNK ==================

export const fetchReviews = createAsyncThunk(
  "reviews/fetchReviews",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiCustomer.get("/api/reviews/dashboard");
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);


// ================== STATE TYPE ==================

interface ReviewState {
  totalReviews: number;
  averageRating: number;
  productsReviewed: number;
  latestReviews: any[];
  loading: boolean;
  error: string | null;
}

const initialState: ReviewState = {
  totalReviews: 0,
  averageRating: 0,
  productsReviewed: 0,
  latestReviews: [],
  loading: false,
  error: null,
};

// ================== SLICE ==================

const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      // ---------- Pending ----------
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // ---------- Success ----------
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.loading = false;

        state.totalReviews = action.payload.totalReviews;
        state.averageRating = action.payload.averageRating;
        state.productsReviewed = action.payload.productsReviewed;
        state.latestReviews = action.payload.latestReviews;
      })

      // ---------- Error ----------
      .addCase(fetchReviews.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default reviewSlice.reducer;
