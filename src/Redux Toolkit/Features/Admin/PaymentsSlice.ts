import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiAdmin } from "../../../Config/apiAdmin";

/* ================================
   TYPES
================================ */

export interface SellerBreakup {
  seller: {
    _id: string;
    name: string;
    email?: string;
  };
  amount: number;
  commission: number;
  sellerEarning: number;
}

export interface AdminPayment {
  _id: string;
  order: {
    _id: string;
    orderId: string;
  };
  customer: {
    _id: string;
    name: string;
    email?: string;
  };
  totalAmount: number;
  paymentMode: "ONLINE" | "COD";
  gateway: string;
  status: "SUCCESS" | "PENDING" | "FAILED";
  sellers: SellerBreakup[];
  createdAt: string;
}

/* ================================
   STATE
================================ */

interface PaymentState {
  payments: AdminPayment[];
  selectedPayment: AdminPayment | null;
  loading: boolean;
  error: string | null;
}

const initialState: PaymentState = {
  payments: [],
  selectedPayment: null,
  loading: false,
  error: null,
};

/* ================================
   THUNKS
================================ */

// 🔹 get all admin payments
export const fetchAdminPayments = createAsyncThunk<
  AdminPayment[],
  void,
  { rejectValue: string }
>("admin/payments/fetch", async (_, { rejectWithValue }) => {
  try {
    const res = await apiAdmin.get("/api/admin/payments");
    return res.data;
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || "Failed to fetch payments"
    );
  }
});

// 🔹 get single payment detail
export const fetchAdminPaymentById = createAsyncThunk<
  AdminPayment,
  string,
  { rejectValue: string }
>("admin/payments/getOne", async (id, { rejectWithValue }) => {
  try {
    const res = await apiAdmin.get(`/api/admin/payments/${id}`);
    return res.data;
  } catch (err: any) {
    return rejectWithValue("Failed to fetch payment");
  }
});

/* ================================
   SLICE
================================ */

const paymentSlice = createSlice({
  name: "adminPayments",
  initialState,
  reducers: {
    clearPaymentError(state) {
      state.error = null;
    },
    clearSelectedPayment(state) {
      state.selectedPayment = null;
    },
  },
  extraReducers: (builder) => {
    builder

      /* ===== LIST ===== */
      .addCase(fetchAdminPayments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.payments = action.payload;
      })
      .addCase(fetchAdminPayments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })

      /* ===== DETAIL ===== */
      .addCase(fetchAdminPaymentById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selectedPayment = null;
      })
      .addCase(fetchAdminPaymentById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedPayment = action.payload;
      })
      .addCase(fetchAdminPaymentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load payment detail";
      });
  },
});

export const { clearPaymentError, clearSelectedPayment } =
  paymentSlice.actions;

export default paymentSlice.reducer;
