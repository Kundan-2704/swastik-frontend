// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { apiCustomer } from "../../../Config/apiCustomer";

// const API_URL = "/api/cart";

// // ===================== TYPES =====================

// interface CartItem {
//     _id: string;
//     quantity: number;
//     product: any;
// }

// interface Cart {
//     _id: string;
//     cartItems: CartItem[];
//     totalMrpPrice: number;
//     totalSellingPrice: number;
//     discount: number;
// }

// interface CartState {
//     cart: Cart | null;
//     loading: boolean;
//     error: string;
// }

// // ===================== INITIAL STATE =====================

// const initialState: CartState = {
//     cart: null,
//     loading: false,
//     error: "",
// };

// // ===================== THUNKS =====================

// // FETCH CART
// export const fetchCart = createAsyncThunk<any, string>(
//     "cart/fetchCart",
//     async (jwt, { rejectWithValue }) => {
//         try {
//             const response = await apiCustomer.get(API_URL, {
//                 headers: {
//                     Authorization: `Bearer ${jwt}`,
//                 },
//             });
//             return response.data;
//         } catch (error: any) {
//             return rejectWithValue(
//                 error.response?.data?.message || "Failed to fetch cart"
//             );
//         }
//     }
// );

// // ADD ITEM TO CART
// export const addItemToCart = createAsyncThunk<
//     any,
//     { jwt: string; request: any }
// >("cart/addItemToCart", async ({ jwt, request }, { rejectWithValue }) => {
//     try {
//         const response = await apiCustomer.put(`${API_URL}/add`, request, {
//             headers: {
//                 Authorization: `Bearer ${jwt}`,
//             },
//         });
//         return response.data;
//     } catch (error: any) {
//         return rejectWithValue(
//             error.response?.data?.message || "Failed to add item"
//         );
//     }
// });

// // UPDATE CART ITEM
// export const updateCartItem = createAsyncThunk<
//     any,
//     { jwt: string; cartitemId: string; quantity: number }
// >("cart/updateCartItem", async ({ jwt, cartitemId, quantity }, { rejectWithValue }) => {
//     try {
//         const response = await apiCustomer.put(
//             `${API_URL}/item/${cartitemId}`,
//             { quantity },
//             {
//                 headers: {
//                     Authorization: `Bearer ${jwt}`,
//                 },
//             }
//         );
//         return response.data;
//     } catch (error: any) {
//         return rejectWithValue(
//             error.response?.data?.message || "Failed to update cart item"
//         );
//     }
// });

// // DELETE CART ITEM
// export const deleteCartItem = createAsyncThunk<
//     any,
//     { jwt: string; cartitemId: string }
// >("cart/deleteCartItem", async ({ jwt, cartitemId }, { rejectWithValue }) => {
//     try {
//         const response = await apiCustomer.delete(
//             `${API_URL}/item/${cartitemId}`,
//             {
//                 headers: {
//                     Authorization: `Bearer ${jwt}`,
//                 },
//             }
//         );
//         return response.data;
//     } catch (error: any) {
//         return rejectWithValue(
//             error.response?.data?.message || "Failed to delete cart item"
//         );
//     }
// });

// // ===================== SLICE =====================

// const cartSlice = createSlice({
//     name: "cart",
//     initialState,
//     reducers: {
//         clearCartError: (state) => {
//             state.error = "";
//         },
//         resetCart: (state) => {
//             state.cart = null;
//         },
//     },
//     extraReducers: (builder) => {
//         builder

//             // ===== FETCH CART =====
//             .addCase(fetchCart.pending, (state) => {
//                 state.loading = true;
//                 state.error = "";
//             })
//             .addCase(fetchCart.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.cart = action.payload;
//             })
//             .addCase(fetchCart.rejected, (state, action: any) => {
//                 state.loading = false;
//                 state.error = action.payload;
//             })

//             // ===== ADD ITEM =====
//             .addCase(addItemToCart.pending, (state) => {
//                 state.loading = true;
//             })
//             .addCase(addItemToCart.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.cart = action.payload;
//             })
//             .addCase(addItemToCart.rejected, (state, action: any) => {
//                 state.loading = false;
//                 state.error = action.payload;
//             })

//             // ===== UPDATE ITEM =====
//             .addCase(updateCartItem.pending, (state) => {
//                 state.loading = true;
//             })
//             .addCase(updateCartItem.fulfilled, (state, action) => {
//                 state.loading = false;

//                 if (state.cart) {
//                     const index = state.cart.cartItems.findIndex(
//                         (item) => item._id === action.payload._id
//                     );

//                     if (index !== -1) {
//                         state.cart.cartItems[index] = action.payload;
//                     }
//                 }
//             })
//             .addCase(updateCartItem.rejected, (state, action: any) => {
//                 state.loading = false;
//                 state.error = action.payload;
//             })

//             // ===== DELETE ITEM =====
//             .addCase(deleteCartItem.pending, (state) => {
//                 state.loading = true;
//             })
//             .addCase(deleteCartItem.fulfilled, (state, action) => {
//                 state.loading = false;

//                 if (state.cart) {
//                     state.cart.cartItems = state.cart.cartItems.filter(
//                         (item) => item._id !== action.meta.arg.cartitemId
//                     );
//                 }
//             })
//             .addCase(deleteCartItem.rejected, (state, action: any) => {
//                 state.loading = false;
//                 state.error = action.payload;
//             });
//     },
// });

// // ===================== EXPORTS =====================

// export const { clearCartError, resetCart } = cartSlice.actions;
// export default cartSlice.reducer;







import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiCustomer } from "../../../Config/apiCustomer";

const API_URL = "/api/cart";

/* ===================== TYPES ===================== */

interface CartItem {
  _id: string;
  quantity: number;
  product: any;
}

interface Cart {
  _id: string;
  cartItems: CartItem[];
  totalMrpPrice: number;
  totalSellingPrice: number;
  discount: number;

  couponDiscount : number;
  couponCode: string | null;
  finalAmount: number;
}

interface CartState {
  cart: Cart | null;
  loading: boolean;
  error: string;

  // 👇 coupon related
  couponError?: string;
}

/* ===================== INITIAL STATE ===================== */

const initialState: CartState = {
  cart: null,
  loading: false,
  error: "",
};

/* ===================== THUNKS ===================== */

// ================= FETCH CART =================
export const fetchCart = createAsyncThunk<any, string>(
  "cart/fetchCart",
  async (jwt, { rejectWithValue }) => {
    try {
      const response = await apiCustomer.get(API_URL, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch cart"
      );
    }
  }
);

// ================= ADD ITEM =================
export const addItemToCart = createAsyncThunk<
  any,
  { jwt: string; request: any }
>("cart/addItemToCart", async ({ jwt, request }, { rejectWithValue }) => {
  try {
    const response = await apiCustomer.put(`${API_URL}/add`, request, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to add item"
    );
  }
});

// ================= UPDATE ITEM =================
export const updateCartItem = createAsyncThunk<
  any,
  { jwt: string; cartitemId: string; quantity: number }
>(
  "cart/updateCartItem",
  async ({ jwt, cartitemId, quantity }, { rejectWithValue }) => {
    try {
      const response = await apiCustomer.put(
        `${API_URL}/item/${cartitemId}`,
        { quantity },
        { headers: { Authorization: `Bearer ${jwt}` } }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update cart item"
      );
    }
  }
);

// ================= DELETE ITEM =================
export const deleteCartItem = createAsyncThunk<
  any,
  { jwt: string; cartitemId: string }
>(
  "cart/deleteCartItem",
  async ({ jwt, cartitemId }, { rejectWithValue }) => {
    try {
      const response = await apiCustomer.delete(
        `${API_URL}/item/${cartitemId}`,
        { headers: { Authorization: `Bearer ${jwt}` } }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete cart item"
      );
    }
  }
);

// ================= APPLY COUPON =================
// export const applyCoupon = createAsyncThunk<
//   { code: string; discount: number },
//   { code: string; cartTotal: number },
//   { rejectValue: string }
// >(
//   "cart/applyCoupon",
//   async ({ code, cartTotal }, { rejectWithValue }) => {
//     try {
//       const response = await apiCustomer.post("/api/coupons/apply", {
//         code,
//         cartTotal,
//       });
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data?.message);
//     }
//   }
// );

export const applyCoupon = createAsyncThunk<
  any,
  { code: string; jwt: string },
  { rejectValue: string }
>(
  "cart/applyCoupon",
  async ({ code, jwt }, { rejectWithValue }) => {
    try {
      const response = await apiCustomer.post(
        "/api/coupons/apply",
        { code },
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );

      return response.data;

    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Coupon apply failed"
      );
    }
  }
);


export const removeCouponFromCart = createAsyncThunk<
  any,
  string,
  { rejectValue: string }
>(
  "cart/removeCoupon",
  async (jwt, { rejectWithValue }) => {
    try {
      const response = await apiCustomer.put(
        "/api/coupons/remove",
        {},
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );

      return response.data;

    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Remove coupon failed"
      );
    }
  }
);

/* ===================== SLICE ===================== */

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCartError: (state) => {
      state.error = "";
    },
    resetCart: (state) => {
      state.cart = null;
      state.couponError = undefined;
    },
  },
  extraReducers: (builder) => {
    builder

      /* ===== FETCH CART ===== */
      .addCase(fetchCart.pending, (state) => {
        
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
          console.log("CART API RESPONSE", action.payload);
        state.loading = false;
         state.cart = {
    ...action.payload,
    couponDiscount: action.payload.couponDiscount || 0,
    couponCode: action.payload.couponCode || null,
  };
      })
      .addCase(fetchCart.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== ADD ITEM ===== */
      .addCase(addItemToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(addItemToCart.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== UPDATE ITEM ===== */
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.loading = false;
        if (state.cart) {
          const index = state.cart.cartItems.findIndex(
            (item) => item._id === action.payload._id
          );
          if (index !== -1) {
            state.cart.cartItems[index] = action.payload;
          }
        }
      })

      /* ===== DELETE ITEM ===== */
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.loading = false;
        if (state.cart) {
          state.cart.cartItems = state.cart.cartItems.filter(
            (item) => item._id !== action.meta.arg.cartitemId
          );
        }
      })

      /* ===== APPLY COUPON ===== */
      .addCase(applyCoupon.fulfilled, (state, action) => {
        state.couponError = undefined;
        state.cart = action.payload; 
      })
      .addCase(applyCoupon.rejected, (state, action) => {
        state.couponError = action.payload;
      })

      .addCase(removeCouponFromCart.fulfilled, (state, action) => {
   state.cart = action.payload;   
   state.couponError = undefined;
})
  },
});

/* ===================== EXPORTS ===================== */

export const {
  clearCartError,
  resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;
