import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiCustomer } from "../../../Config/apiCustomer";

const API_URL = "/api/orders";

/* ===================== THUNKS ===================== */

// FETCH USER ORDER HISTORY
export const fetchUserOrderHistory = createAsyncThunk<any, string>(
  "orders/fetchUserOrderHistory",
  async (jwt, { rejectWithValue }) => {
    try {
      const response = await apiCustomer.get(`${API_URL}/user`, {
        headers: { Authorization: `Bearer ${jwt}` }
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch order history"
      );
    }
  }
);

// CREATE ORDER (FIXED)
export const createOrder = createAsyncThunk<any, any>(
  "orders/createOrder",
  async ({ addressId, jwt, paymentGateway }, { rejectWithValue }) => {
    try {
      const response = await apiCustomer.post(
        API_URL,
        {
          addressId,
          paymentGateway,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create order"
      );
    }
  }
);



// FETCH ORDER BY ID
export const fetchOrderById = createAsyncThunk<any, any>(
  "orders/fetchOrderById",
  async ({ jwt, orderId }, { rejectWithValue }) => {
    try {
      const response = await apiCustomer.get(`${API_URL}/${orderId}`, {
        headers: { Authorization: `Bearer ${jwt}` }
      });
      console.log("Fetched Order:", response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch order"
      );
    }
  }
);

// FETCH ORDER ITEM BY ID
export const fetchOrderItemById = createAsyncThunk<any, any>(
  "orders/fetchOrderItemById",
  async ({ jwt, orderItemId }, { rejectWithValue }) => {
    try {
      const response = await apiCustomer.get(`${API_URL}/item/${orderItemId}`, {
        headers: { Authorization: `Bearer ${jwt}` }
      });
      console.log("Fetched Order Item:", response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch order item"
      );
    }
  }
);

// CANCEL ORDER
export const cancelOrder = createAsyncThunk<any, any>(
  "orders/cancelOrder",
  async ({ jwt, orderId }, { rejectWithValue }) => {
    try {
      const response = await apiCustomer.patch(
        `${API_URL}/${orderId}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to cancel order"
      );
    }
  }
);


export interface ShippingAddress {
  name: string;
  phone: string;
  address: string;
  locality: string;
  city: string;
  state: string;
  pincode: string;
}

export interface Order {
  _id: string;
  shippingAddress: ShippingAddress;
  status: string;
  totalPrice: number;
}

export interface OrderItem {
  _id: string;
  quantity: number;
  price: number;
  order: Order;
}


/* ===================== INITIAL STATE ===================== */

// const initialState = {
//   orders: [],             // user order history
//   currentOrder: null,     // single order (by id)
//   orderItem: null,        // single order item

//   loading: false,
//   error: ""
// };

const initialState: {
  orders: Order[];
  currentOrder: Order | null;
  orderItem: OrderItem | null;
  loading: boolean;
  error: string;
} = {
  orders: [],
  currentOrder: null,
  orderItem: null,
  loading: false,
  error: ""
};


/* ===================== SLICE ===================== */

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
    clearOrderItem: (state) => {
      state.orderItem = null;
    },
    clearOrderError: (state) => {
      state.error = "";
    }
  },
  extraReducers: (builder) => {
    builder

      // USER ORDER HISTORY
      .addCase(fetchUserOrderHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserOrderHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchUserOrderHistory.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CREATE ORDER
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
      })
      .addCase(createOrder.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FETCH ORDER BY ID
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
      })
      .addCase(fetchOrderById.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FETCH ORDER ITEM
      .addCase(fetchOrderItemById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrderItemById.fulfilled, (state, action) => {
        state.loading = false;
        state.orderItem = action.payload;
      })
      .addCase(fetchOrderItemById.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })
      // CANCEL ORDER
      .addCase(cancelOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload; // 🔥 status CANCELLED
      })
      .addCase(cancelOrder.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });

  }
});

/* ===================== EXPORTS ===================== */

export const {
  clearCurrentOrder,
  clearOrderItem,
  clearOrderError
} = orderSlice.actions;

export default orderSlice.reducer;
