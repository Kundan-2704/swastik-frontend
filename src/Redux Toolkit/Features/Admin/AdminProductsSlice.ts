// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { apiAdmin } from "../../../Config/apiAdmin";

// interface Product {
//   _id: string;
//   title: string;
//   images: string[];
//   sellingPrice: number;
//   quantity: number;
//   priority: number;
//   category?: {
//     name: string;
//   };
// }

// interface State {
//   products: Product[];
//   loading: boolean;
// }

// const initialState: State = {
//   products: [],
//   loading: false,
// };

// /* ================= FETCH PRODUCTS ================= */

// export const fetchAdminProducts = createAsyncThunk(
//   "adminProducts/fetch",
//   async () => {
//     const res = await apiAdmin.get("/products");
//     return res.data.content;   // 🔥 matches your backend pagination
//   }
// );

// /* ================= PIN PRODUCT ================= */

// export const pinProduct = createAsyncThunk(
//   "adminProducts/pin",
//   async (productId: string) => {
//     const res = await apiAdmin.patch(`/admin/products/${productId}/pin`);
//     return res.data.product;
//   }
// );

// /* ================= UNPIN PRODUCT ================= */

// export const unpinProduct = createAsyncThunk(
//   "adminProducts/unpin",
//   async (productId: string) => {
//     const res = await apiAdmin.patch(`/admin/products/${productId}/unpin`);
//     return res.data.product;
//   }
// );

// const slice = createSlice({
//   name: "adminProducts",
//   initialState,
//   reducers: {},

//   extraReducers: (builder) => {
//     builder

//       .addCase(fetchAdminProducts.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchAdminProducts.fulfilled, (state, action) => {
//         state.loading = false;
//         state.products = action.payload;
//       })

//       .addCase(pinProduct.fulfilled, (state, action) => {
//         const updated = action.payload;

//         state.products = state.products.map((p) =>
//           p._id === updated._id ? updated : p
//         );
//       })

//       .addCase(unpinProduct.fulfilled, (state, action) => {
//         const updated = action.payload;

//         state.products = state.products.map((p) =>
//           p._id === updated._id ? updated : p
//         );
//       });
//   },
// });

// export default slice.reducer;




import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiAdmin } from "../../../Config/apiAdmin";

/* ================= TYPES ================= */

interface Product {
  _id: string;
  title: string;
  images: string[];
  sellingPrice: number;
  quantity: number;
  priority: number;
  category?: {
    name: string;
  };
}

interface State {
  products: Product[];
  loading: boolean;
}

const initialState: State = {
  products: [],
  loading: false,
};

/* ================= HELPERS 🔥 ================= */

const sortProducts = (products: Product[]) =>
  [...products].sort((a, b) => b.priority - a.priority);

/* ================= FETCH PRODUCTS ================= */

export const fetchAdminProducts = createAsyncThunk(
  "adminProducts/fetch",
  async () => {
    // const res = await apiAdmin.get("/products");
    const res = await apiAdmin.get("/admin/products");

    console.log("FETCH PRODUCTS →", res.data);

    return res.data.products;   // ✅ backend response
  }
);

/* ================= PIN PRODUCT ================= */

export const pinProduct = createAsyncThunk(
  "adminProducts/pin",
  async (productId: string) => {
    const res = await apiAdmin.patch(`/admin/products/${productId}/pin`);

    console.log("PIN RESPONSE →", res.data);

    return res.data.product;
  }
);

/* ================= UNPIN PRODUCT ================= */

export const unpinProduct = createAsyncThunk(
  "adminProducts/unpin",
  async (productId: string) => {
    const res = await apiAdmin.patch(`/admin/products/${productId}/unpin`);

    console.log("UNPIN RESPONSE →", res.data);

    return res.data.product;
  }
);

/* ================= SLICE ================= */

const slice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      /* ================= FETCH ================= */

      .addCase(fetchAdminProducts.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchAdminProducts.fulfilled, (state, action) => {
        state.loading = false;

        // 🔥 ALWAYS SORT
        state.products = sortProducts(action.payload);
      })

      /* ================= PIN ================= */

      .addCase(pinProduct.fulfilled, (state, action) => {
        const updated = action.payload;

        const updatedList = state.products.map((p) =>
          p._id === updated._id ? updated : p
        );

        // 🔥 CRITICAL FIX
        state.products = sortProducts(updatedList);
      })

      /* ================= UNPIN ================= */

      .addCase(unpinProduct.fulfilled, (state, action) => {
        const updated = action.payload;

        const updatedList = state.products.map((p) =>
          p._id === updated._id ? updated : p
        );

        // 🔥 CRITICAL FIX
        state.products = sortProducts(updatedList);
      });
  },
});

export default slice.reducer;