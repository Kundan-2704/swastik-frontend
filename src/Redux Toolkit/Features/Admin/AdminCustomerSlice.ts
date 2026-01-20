import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiCustomer } from "../../../Config/apiCustomer";

const API_URL = "/admin/customers";

// ===================== THUNKS =====================

// 🔹 FETCH ALL CUSTOMERS (ADMIN)
export const fetchCustomers = createAsyncThunk<any, string>(
    "adminCustomers/fetchCustomers",
    async (jwt, { rejectWithValue }) => {
        try {
            const response = await apiCustomer.get(API_URL, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch customers"
            );
        }
    }
);

// 🔹 BLOCK / UNBLOCK CUSTOMER
export const updateCustomerStatus = createAsyncThunk<any, any>(
    "adminCustomers/updateCustomerStatus",
    async ({ jwt, customerId, status }, { rejectWithValue }) => {
        try {
            if (!customerId || !status) {
                throw new Error("customerId or status missing");
            }

            const response = await apiCustomer.patch(
                `/admin/customers/${customerId}/status/${status}`,
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
                error.response?.data?.message ||
                error.message ||
                "Failed to update customer status"
            );
        }
    }
);


// ===================== INITIAL STATE =====================

const initialState = {
    customers: [] as any[],
    loading: false,
    error: "",
};

// ===================== SLICE =====================

const adminCustomerSlice = createSlice({
    name: "adminCustomers",
    initialState,
    reducers: {
        clearCustomerError: (state) => {
            state.error = "";
        },
    },
    extraReducers: (builder) => {
        builder

            // ===== FETCH CUSTOMERS =====
            .addCase(fetchCustomers.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(fetchCustomers.fulfilled, (state, action) => {
                state.loading = false;
                state.customers = action.payload;
            })
            .addCase(fetchCustomers.rejected, (state, action: any) => {
                state.loading = false;
                state.error = action.payload;
            })

            // ===== UPDATE CUSTOMER STATUS =====
            .addCase(updateCustomerStatus.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateCustomerStatus.fulfilled, (state, action) => {
                state.loading = false;

                const updatedCustomer = action.payload;

                state.customers = state.customers.map((customer: any) =>
                    customer._id === updatedCustomer._id
                        ? updatedCustomer
                        : customer
                );
            })
            .addCase(updateCustomerStatus.rejected, (state, action: any) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

// ===================== EXPORT =====================

export const { clearCustomerError } =
    adminCustomerSlice.actions;

export default adminCustomerSlice.reducer;
