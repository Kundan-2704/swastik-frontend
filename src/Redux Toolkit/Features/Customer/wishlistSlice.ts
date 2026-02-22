import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiCustomer } from "../../../Config/apiCustomer";
/* ✅ Check Wishlist */
export const checkWishlist = createAsyncThunk(
  "wishlist/check",
  async (productId: string) => {
    const { data } = await apiCustomer.get(`/api/wishlist/check/${productId}`);
    return { productId, wished: data.wished };
  }
);

/* ✅ Toggle Wishlist */
export const toggleWishlist = createAsyncThunk(
  "wishlist/toggle",
  async (productId: string) => {
    const { data } = await apiCustomer.post("/api/wishlist/toggle", {
      productId,
    });

    return { productId, wished: data.wished };
  }
);

/* ✅ Fetch Full Wishlist */
export const fetchWishlist = createAsyncThunk(
  "wishlist/fetch",
  async () => {
    const { data } = await apiCustomer.get("/api/wishlist");
    return data.wishlist;
  }
);

interface WishlistState {
  items: Record<string, boolean>;
  loading: boolean;
}

const initialState: WishlistState = {
  items: {},
  products:[],
  loading: false,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      /* ✅ Check */
      .addCase(checkWishlist.fulfilled, (state, action) => {
        state.items[action.payload.productId] = action.payload.wished;
      })

      /* ✅ Toggle */
      .addCase(toggleWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(toggleWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items[action.payload.productId] = action.payload.wished;
      })
      .addCase(toggleWishlist.rejected, (state) => {
        state.loading = false;
      })

      /* ✅ Fetch Wishlist */
     .addCase(fetchWishlist.fulfilled, (state, action) => {
  state.products = action.payload.map((item: any) => item.product);

  state.items = {};

  action.payload.forEach((item: any) => {
    state.items[item.product._id] = true;
  });
});
  },
});

export default wishlistSlice.reducer;