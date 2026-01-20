import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiCustomer } from "../../../Config/apiCustomer";

const API_URL = "/home";

// ===================== THUNKS =====================

// FETCH HOME CATEGORY (ADMIN)
export const fetchHomeCategory = createAsyncThunk<any, any>(
  "adminHomeCategory/fetchHomeCategory",
  async (jwt, { rejectWithValue }) => {
    try {
      const response = await apiCustomer.get(`${API_URL}/home-category`, {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      });
      console.log("fetch home category", response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch home category"
      );
    }
  }
);

// UPDATE HOME CATEGORY (ADMIN)
export const updateHomeCategory = createAsyncThunk<any, any>(
  "adminHomeCategory/updateHomeCategory",
  async ({ jwt, id, data }, { rejectWithValue }) => {
    try {
      const response = await apiCustomer.patch(
        `${API_URL}/home-category/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${jwt}`
          }
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update home category"
      );
    }
  }
);

// ===================== INITIAL STATE =====================

const initialState = {
  categories: [] as any[],
  loading: false,
  error: ""
};

// ===================== SLICE =====================

const adminHomeCategorySlice = createSlice({
  name: "adminHomeCategory",
  initialState,
  reducers: {
    clearHomeCategoryError: (state) => {
      state.error = "";
    }
  },
  extraReducers: (builder) => {
    builder

      // ===== FETCH HOME CATEGORY =====
      .addCase(fetchHomeCategory.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchHomeCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchHomeCategory.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===== UPDATE HOME CATEGORY =====
      .addCase(updateHomeCategory.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(updateHomeCategory.fulfilled, (state, action) => {
        state.loading = false;

        const updatedCategory = action.payload;
        state.categories = state.categories.map((cat: any) =>
          cat.id === updatedCategory.id ? updatedCategory : cat
        );
      })
      .addCase(updateHomeCategory.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

// ===================== EXPORT =====================

export const { clearHomeCategoryError } =
  adminHomeCategorySlice.actions;

export default adminHomeCategorySlice.reducer;
