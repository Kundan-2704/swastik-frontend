// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { apiCustomer } from "../../../Config/apiCustomer";


// // ===== FETCH REVIEWS =====
// export const fetchReviews = createAsyncThunk(
//   "reviews/fetchReviews",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await apiCustomer.get("/api/reviews/dashboard");
//       return response.data.data;
//     } catch (error: any) {
//       return rejectWithValue(
//         error.response?.data?.message || "Something went wrong"
//       );
//     }
//   }
// );


// // ===== CREATE REVIEW =====
// export const createReview = createAsyncThunk(
//   "reviews/createReview",
//   async (reviewData: any, { rejectWithValue }) => {
//     try {
//       const response = await apiCustomer.post("/api/reviews", reviewData);
//       return response.data.review;
//     } catch (error: any) {
//       return rejectWithValue(
//         error.response?.data?.message || "Failed to submit review"
//       );
//     }
//   }
// );


// // ===== STATE =====
// interface ReviewState {
//   latestReviews: any[];
//   loading: boolean;
//   error: string | null;
// }

// const initialState: ReviewState = {
//   latestReviews: [],
//   loading: false,
//   error: null,
// };


// // ===== SLICE =====
// const reviewSlice = createSlice({
//   name: "reviews",
//   initialState,
//   reducers: {},

//   extraReducers: (builder) => {
//     builder

//       // FETCH
//       .addCase(fetchReviews.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchReviews.fulfilled, (state, action) => {
//         state.loading = false;
//         state.latestReviews = action.payload.latestReviews;
//       })
//       .addCase(fetchReviews.rejected, (state, action: any) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // CREATE
//       .addCase(createReview.fulfilled, (state, action) => {
//         state.latestReviews.unshift(action.payload); // instant UI update
//       });
//   },
// });

// export default reviewSlice.reducer;




import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiCustomer } from "../../../Config/apiCustomer";


/* =========================================================
   THUNKS
========================================================= */

// ✅ FETCH PRODUCT REVIEWS
export const fetchProductReviews = createAsyncThunk(
  "reviews/fetchProductReviews",
  async (productId: string, { rejectWithValue }) => {
    try {
      const response = await apiCustomer.get(
        `/api/reviews/product/${productId}`
      );

      return response.data.reviews;

    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch reviews"
      );
    }
  }
);


// ✅ CREATE REVIEW
export const createReview = createAsyncThunk(
  "reviews/createReview",
  async (reviewData: any, { rejectWithValue }) => {
    try {
      const response = await apiCustomer.post(
        "/api/reviews",
        reviewData
      );

      return response.data.review;

    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to submit review"
      );
    }
  }
);


/* =========================================================
   STATE
========================================================= */

interface ReviewState {
  productReviews: any[];
  loading: boolean;
  error: string | null;
}

const initialState: ReviewState = {
  productReviews: [],
  loading: false,
  error: null,
};


/* =========================================================
   SLICE
========================================================= */

const reviewSlice = createSlice({
  name: "reviews",
  initialState,

  reducers: {
    clearReviews: (state) => {
      state.productReviews = [];
    },
  },

  extraReducers: (builder) => {
    builder

      /* ================= FETCH PRODUCT REVIEWS ================= */

      .addCase(fetchProductReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchProductReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.productReviews = action.payload;
      })

      .addCase(fetchProductReviews.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })


      /* ================= CREATE REVIEW ================= */

      .addCase(createReview.pending, (state) => {
        state.loading = true;
      })

      .addCase(createReview.fulfilled, (state, action) => {
        state.loading = false;

        // ✅ Instant UI Update
        state.productReviews.unshift(action.payload);
      })

      .addCase(createReview.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


export const { clearReviews } = reviewSlice.actions;

export default reviewSlice.reducer;