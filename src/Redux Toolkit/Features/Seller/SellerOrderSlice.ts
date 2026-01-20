// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { api } from "../../../Config/api";



// const initialState = {
//     orders: [],
//     loading: false,
//     error: ""
// }



// export const fetchSellrOrders = createAsyncThunk<any, any>(
//     "sellerOrders/fetchSellrOrders",
//     async (jwt, { rejectWithValue }) => {
//         try {
//             const response = await api.get(
//                 `/api/seller/orders`, {
//                 headers: {
//                     Authorization: `Bearer ${jwt}`
//                 }
//             }

//             );
//             return response.data;
//         } catch (error: any) {
//             return rejectWithValue({
//                 message: error.response?.data?.message || "OTP failed",
//                 status: error.response?.status || 500
//             });
//         }
//     }
// );


// export const updateOrdersStatus = createAsyncThunk<any, any>(
//     "sellerOrders/updateOrdersStatus",
//     async ({ jwt, orderId, orderStatus }, { rejectWithValue }) => {
//         try {
//             const response = await api.patch(
//                 `/api/seller/orders/${orderId}/status/${orderStatus}`, {}, {
//                 headers: {
//                     Authorization: `Bearer ${jwt}`
//                 }
//             }

//             );
//             return response.data;
//         } catch (error: any) {
//             return rejectWithValue({
//                 message: error.response?.data?.message || "OTP failed",
//                 status: error.response?.status || 500
//             });
//         }
//     }
// );



import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiSeller } from "../../../Config/apiSeller";

// ===================== INITIAL STATE =====================

const initialState = {
    orders: [] as any[],
    loading: false,
    error: "" as string
};

// ===================== THUNKS =====================

// FETCH SELLER ORDERS
export const fetchSellrOrders = createAsyncThunk<any, any>(
    "sellerOrders/fetchSellrOrders",
    async (jwt, { rejectWithValue }) => {
        try {
            const response = await apiSeller.get(`/api/sellers/orders`, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            console.log("Fetched Seller Orders:", response.data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue({
                message:
                    error.response?.data?.message || "Failed to fetch seller orders",
                status: error.response?.status || 500
            });
        }
    }
);

// UPDATE ORDER STATUS
export const updateOrdersStatus = createAsyncThunk<any, any>(
    "sellerOrders/updateOrdersStatus",
    async ({ jwt, orderId, orderStatus }, { rejectWithValue }) => {
        try {
            const response = await apiSeller.patch(
                `/api/sellers/orders/${orderId}/status/${orderStatus}`, // ✅ EXACT MATCH
                {},
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );
            console.log("Updated Order Status:", response.data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue({
                message:
                    error.response?.data?.message || "Failed to update order status",
                status: error.response?.status || 500,
            });
        }
    }
);


// ===================== SLICE =====================

const sellerOrdersSlice = createSlice({
    name: "sellerOrders",
    initialState,
    reducers: {
        clearSellerOrdersError: (state) => {
            state.error = "";
        }
    },
    extraReducers: (builder) => {
        builder

            // ===== FETCH SELLER ORDERS =====
            .addCase(fetchSellrOrders.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(fetchSellrOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(fetchSellrOrders.rejected, (state, action: any) => {
                state.loading = false;
                state.error = action.payload?.message;
            })

            // ===== UPDATE ORDER STATUS =====
            .addCase(updateOrdersStatus.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateOrdersStatus.fulfilled, (state, action) => {
                state.loading = false;

                const updatedOrder = action.payload;

                state.orders = state.orders.map((order: any) =>
                    order._id === updatedOrder._id ? updatedOrder : order
                );
            })

            .addCase(updateOrdersStatus.rejected, (state, action: any) => {
                state.loading = false;
                state.error = action.payload?.message;
            });
    }
});

// ===================== EXPORTS =====================

export const { clearSellerOrdersError } = sellerOrdersSlice.actions;

export default sellerOrdersSlice.reducer;
