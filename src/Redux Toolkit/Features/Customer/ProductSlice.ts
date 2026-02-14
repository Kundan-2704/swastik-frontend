import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiCustomer } from "../../../Config/apiCustomer";

const API_URL = "/products";

/* ================= TYPES ================= */

interface ProductsState {
  product: any | null;
  products: any[];
  similarProducts: any[];
  totalPages: number;
  totalElement: number;
  loading: boolean;
  error: string;
}

/* ================= INITIAL STATE ================= */

const initialState: ProductsState = {
  product: null,
  products: [],
  similarProducts: [],
  totalPages: 0,
  totalElement: 0,
  loading: false,
  error: "",
};

/* ================= THUNKS ================= */

/* 🔹 FETCH PRODUCT BY ID */
export const fetchProductById = createAsyncThunk<
  any,
  string,
  { rejectValue: any }
>("products/fetchProductById", async (productId, { rejectWithValue }) => {
  try {
    const response = await apiCustomer.get(`${API_URL}/${productId}`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue({
      message:
        error.response?.data?.message || "Failed to fetch product",
    });
  }
});

/* 🔹 GET ALL PRODUCTS (LIST + SEARCH + CATEGORY) */
export const getAllProducts = createAsyncThunk<
  any,
  {
    categoryId?: string;
    search?: string;
    pageNumber?: number;
    sort?: string;
    color?: string;
    size?: string;
    minPrice?: number;
    maxPrice?: number;
    minDiscount?: number;
  },
  { rejectValue: any }
>("products/getAllProducts", async (params, { rejectWithValue }) => {
  try {
    const queryParams: any = {};

    if (params.categoryId) queryParams.categoryId = params.categoryId;
    if (params.search) queryParams.search = params.search;
    if (params.sort) queryParams.sort = params.sort;
    if (params.color) queryParams.color = params.color;
    if (params.size) queryParams.size = params.size;
    if (params.minPrice) queryParams.minPrice = params.minPrice;
    if (params.maxPrice) queryParams.maxPrice = params.maxPrice;
    if (params.minDiscount)
      queryParams.minDiscount = params.minDiscount;

    queryParams.pageNumber = params.pageNumber ?? 1;

    const response = await apiCustomer.get(API_URL, {
      params: queryParams,
    });

    return response.data;
  } catch (error: any) {
    return rejectWithValue({
      message:
        error.response?.data?.message ||
        "Failed to fetch products",
    });
  }
});

/* 🔹 GET SIMILAR PRODUCTS (✅ NEW – MINIMAL ADDITION) */
export const getSimilarProducts = createAsyncThunk<
  any,
  { categoryId: string },
  { rejectValue: any }
>("products/getSimilarProducts", async ({ categoryId }, { rejectWithValue }) => {
  try {
    const response = await apiCustomer.get(API_URL, {
      params: {
        categoryId,
        pageNumber: 1,
      },
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue({
      message:
        error.response?.data?.message ||
        "Failed to fetch similar products",
    });
  }
});

/* ================= SLICE ================= */

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearProduct: (state) => {
      state.product = null;
    },
    clearError: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder

      /* ===== FETCH PRODUCT BY ID ===== */
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product =
          action.payload?.data ||
          action.payload?.product ||
          action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action: any) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Something went wrong";
      })

      /* ===== GET ALL PRODUCTS ===== */
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = false;

        state.products = action.payload?.content || [];
        state.totalPages = action.payload?.totalPages || 0;
        state.totalElement = action.payload?.totalElement || 0;
      })
      .addCase(getAllProducts.rejected, (state, action: any) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Something went wrong";
      })

      /* ===== GET SIMILAR PRODUCTS ===== */
      .addCase(getSimilarProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSimilarProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.similarProducts = action.payload?.content || [];
      })
      .addCase(getSimilarProducts.rejected, (state) => {
        state.loading = false;
      });
  },
});

/* ================= EXPORTS ================= */

export const { clearProduct, clearError } =
  productsSlice.actions;

export default productsSlice.reducer;
