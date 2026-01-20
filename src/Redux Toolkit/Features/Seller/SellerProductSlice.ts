import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiSeller } from "../../../Config/apiSeller";

const API_URL = "/api/seller/products";

/* ================= INITIAL STATE ================= */

const initialState = {
  products: [] as any[],
  singleProduct: null as any, // EDIT PAGE
  loading: false,
  error: "" as string,
};

interface FetchSellerProductParams {
  jwt: string;
  page?: number;
  limit?: number;
}

/* ================= THUNKS ================= */



export const fetchSellerProduct = createAsyncThunk<
  any,
  { jwt: string }
>(
  "sellerProduct/fetchSellerProduct",
  async ({ jwt }, { rejectWithValue }) => {
    try {
      const response = await apiSeller.get(
        "/api/seller/products",
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      return response.data; // 👈 ARRAY of 27
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
        "Failed to fetch seller products"
      );
    }
  }
);



/* 🔹 FETCH SINGLE PRODUCT (EDIT PAGE) */
export const fetchSellerProductById = createAsyncThunk<any, string>(
  "sellerProduct/fetchSellerProductById",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await apiSeller.get(
        `${API_URL}/${productId}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
        "Failed to fetch product"
      );
    }
  }
);

/* 🔹 CREATE PRODUCT */
export const createProduct = createAsyncThunk<any, any>(
  "sellerProduct/createProduct",
  async ({ jwt, request }, { rejectWithValue }) => {
    try {
      const response = await apiSeller.post(API_URL, request, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
        "Failed to create product"
      );
    }
  }
);

/* 🔹 UPDATE FULL PRODUCT (JSON + FormData SUPPORT) */
export const updateProduct = createAsyncThunk<any, any>(
  "sellerProduct/updateProduct",
  async ({ jwt, productId, request }, { rejectWithValue }) => {
    try {
      const isFormData = request instanceof FormData;

      const response = await apiSeller.patch(
        `${API_URL}/${productId}`,
        request,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
            ...(isFormData ? {} : { "Content-Type": "application/json" }),
          },
        }
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
        "Failed to update product"
      );
    }
  }
);


/* 🔥 UPDATE PRODUCT STOCK */
// export const updateProductStock = createAsyncThunk<any, any>(
//   "sellerProduct/updateProductStock",
//   async ({ jwt, productId, quantity }, { rejectWithValue }) => {
//     try {
//       const response = await apiSeller.patch(
//         `${API_URL}/${productId}`,
//         { quantity },
//         {
//           headers: { Authorization: `Bearer ${jwt}` },
//         }
//       );
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(
//         error.response?.data?.error ||
//         "Failed to update stock"
//       );
//     }
//   }
// );


export const updateProductStock = createAsyncThunk<any, any>(
  "sellerProduct/updateProductStock",
  async ({ jwt, productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await apiSeller.patch(
        `${API_URL}/${productId}/stock`,
        { quantity },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update stock"
      );
    }
  }
);


/* 🔥 BULK STOCK UPDATE */
export const bulkUpdateProductStock = createAsyncThunk<any, any>(
  "sellerProduct/bulkUpdateProductStock",
  async ({ jwt, productIds, quantity }, { rejectWithValue }) => {
    try {
      const response = await apiSeller.patch(
        "/api/seller/products/bulk/stock",
        {
          productIds,
          quantity: Number(quantity),
        },
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error ||
        "Bulk update failed"
      );
    }
  }
);

/* ❌ DELETE PRODUCT */
export const deleteProduct = createAsyncThunk<
  string,
  { jwt: string; productId: string },
  { rejectValue: string }
>(
  "sellerProduct/deleteProduct",
  async ({ jwt, productId }, { rejectWithValue }) => {
    try {
      await apiSeller.delete(`${API_URL}/${productId}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      return productId; // 👈 deleted id
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
        "Failed to delete product"
      );
    }
  }
);

/* ================= SLICE ================= */

const sellerProductSlice = createSlice({
  name: "sellerProduct",
  initialState,
  reducers: {
    clearSellerProductError: (state) => {
      state.error = "";
    },
    clearSingleProduct: (state) => {
      state.singleProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder

      /* ===== FETCH LIST ===== */
      .addCase(fetchSellerProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSellerProduct.fulfilled, (state, action) => {
        state.loading = false;

        // 🔥 HANDLE BOTH CASES (array OR paginated)
        state.products = Array.isArray(action.payload)
          ? action.payload
          : action.payload.content || [];
      })

      .addCase(fetchSellerProduct.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== FETCH SINGLE ===== */
      .addCase(fetchSellerProductById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSellerProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.singleProduct = action.payload;
      })
      .addCase(fetchSellerProductById.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== CREATE ===== */
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.unshift(action.payload);
      })

      /* ===== UPDATE FULL ===== */
      .addCase(updateProduct.fulfilled, (state, action) => {
        const updated = action.payload;
        state.products = state.products.map((p: any) =>
          p._id === updated._id ? updated : p
        );
        state.singleProduct = updated;
      })

      /* ===== UPDATE STOCK ===== */
      .addCase(updateProductStock.fulfilled, (state, action) => {
        const updated = action.payload;
        state.products = state.products.map((p: any) =>
          p._id === updated._id ? updated : p
        );
      })

      /* ===== BULK UPDATE ===== */
      .addCase(bulkUpdateProductStock.fulfilled, (state, action) => {
        const updatedProducts = action.payload;
        state.products = state.products.map((p: any) => {
          const updated = updatedProducts.find(
            (up: any) => up._id === p._id
          );
          return updated ? updated : p;
        });
      })

      /* ===== DELETE ===== */
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (p: any) => p._id !== action.payload
        );
      });
  },
});

/* ================= EXPORT ================= */

export const {
  clearSellerProductError,
  clearSingleProduct,
} = sellerProductSlice.actions;

export default sellerProductSlice.reducer;
