import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiCustomer } from "../../../Config/apiCustomer";

/* ===================== API PATHS ===================== */

const FETCH_UPDATE_API = "/home/home-category"; // GET, PATCH
const CREATE_API = "/home/categories";          // POST

/* ===================== TYPES ===================== */

export interface HomeCategory {
  _id: string;
  categoryId: string;
  name: string;
  image: string;
  section: string;
  createdAt?: string;
  updatedAt?: string;
}

/* ===================== STATE ===================== */

interface HomeCategoryState {
  categories: HomeCategory[];
  loading: boolean;
  success: boolean;
  error: string;
}

const initialState: HomeCategoryState = {
  categories: [],
  loading: false,
  success: false,
  error: "",
};

/* ===================== THUNKS ===================== */

/* 🔹 FETCH */
export const fetchHomeCategories = createAsyncThunk<
  HomeCategory[],
  void,
  { rejectValue: string }
>("homeCategory/fetchHomeCategories", async (_, { rejectWithValue }) => {
  try {
    const response = await apiCustomer.get(FETCH_UPDATE_API);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch home categories"
    );
  }
});

/* 🔹 CREATE */
// export const createHomeCategory = createAsyncThunk<
//   HomeCategory,
//   Partial<HomeCategory>,
//   { rejectValue: string }
// >("homeCategory/createHomeCategory", async (data, { rejectWithValue }) => {
//   try {
//     const response = await apiCustomer.post(CREATE_API, data);
//     return response.data;
//   } catch (error: any) {
//     return rejectWithValue(
//       error.response?.data?.message || "Failed to create home category"
//     );
//   }
// });


export const createHomeCategory = createAsyncThunk<
  HomeCategory[],
  Partial<HomeCategory>[],
  { rejectValue: string }
>("homeCategory/createHomeCategory", async (data, { rejectWithValue }) => {
  try {
    const response = await apiCustomer.post(CREATE_API, data);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to create home category"
    );
  }
});


/* 🔹 UPDATE (PATCH – backend ke according) */
export const updateHomeCategory = createAsyncThunk<
  HomeCategory,
  { id: string; data: Partial<HomeCategory> },
  { rejectValue: string }
>("homeCategory/updateHomeCategory", async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await apiCustomer.patch(
      `${FETCH_UPDATE_API}/${id}`,
      data
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to update home category"
    );
  }
});

/* ===================== SLICE ===================== */

const homeCategorySlice = createSlice({
  name: "homeCategory",
  initialState,
  reducers: {
    clearHomeCategoryError: (state) => {
      state.error = "";
    },
    resetHomeCategorySuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder

      /* ===== FETCH ===== */
      .addCase(fetchHomeCategories.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchHomeCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchHomeCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "";
      })

      /* ===== CREATE ===== */
      .addCase(createHomeCategory.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = "";
      })
      .addCase(createHomeCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.categories.push(action.payload);
      })
      .addCase(createHomeCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "";
      })

      /* ===== UPDATE ===== */
      .addCase(updateHomeCategory.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(updateHomeCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        const index = state.categories.findIndex(
          (item) => item._id === action.payload._id
        );

        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })
      .addCase(updateHomeCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "";
      });
  },
});

/* ===================== EXPORTS ===================== */

export const {
  clearHomeCategoryError,
  resetHomeCategorySuccess,
} = homeCategorySlice.actions;

export default homeCategorySlice.reducer;
