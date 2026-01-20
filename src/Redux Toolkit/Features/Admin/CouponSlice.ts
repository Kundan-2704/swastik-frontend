import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiCustomer } from "../../../Config/apiCustomer";

/* ===================== API ===================== */

const API_URL = "/api/coupons";

/* ===================== TYPES ===================== */

export interface Coupon {
  _id: string;
  code: string;
  discountType: "PERCENT" | "FLAT";
  discountValue: number;
  minOrderValue?: number;
  maxDiscount?: number;
  expiryDate: string;
  isActive: boolean;
}

/* ===================== STATE ===================== */

interface AdminCouponState {
  coupons: Coupon[];
  loading: boolean;
  error: string;
}

const initialState: AdminCouponState = {
  coupons: [],
  loading: false,
  error: "",
};

/* ===================== THUNKS ===================== */

// ✅ CREATE COUPON (ADMIN)
export const createCoupon = createAsyncThunk<
  Coupon,
  { jwt: string; coupon: Omit<Coupon, "_id"> },
  { rejectValue: string }
>(
  "adminCoupon/createCoupon",
  async ({ jwt, coupon }, { rejectWithValue }) => {
    try {
      const res = await apiCustomer.post(
        `${API_URL}/admin/create`,
        coupon,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      return res.data?.data || res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to create coupon"
      );
    }
  }
);

// ✅ FETCH ALL COUPONS (ADMIN)
export const fetchAllCoupons = createAsyncThunk<
  Coupon[],
  string,
  { rejectValue: string }
>(
  "adminCoupon/fetchAllCoupons",
  async (jwt, { rejectWithValue }) => {
    try {
      const res = await apiCustomer.get(`${API_URL}/admin/all`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      return res.data?.data || res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch coupons"
      );
    }
  }
);


export const applyCoupon = createAsyncThunk<
  { code: string; discount: number },
  { code: string; cartTotal: number },
  { rejectValue: string }
>(
  "cart/applyCoupon",
  async ({ code, cartTotal }, { rejectWithValue }) => {
    try {
      const res = await apiCustomer.post(
        "/api/coupons/apply",
        { code, cartTotal }
      );
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);


// ✅ DELETE COUPON (ADMIN)
export const deleteCoupon = createAsyncThunk<
  string,
  { jwt: string; id: string },
  { rejectValue: string }
>(
  "adminCoupon/deleteCoupon",
  async ({ jwt, id }, { rejectWithValue }) => {
    try {
      await apiCustomer.delete(`${API_URL}/admin/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      return id;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete coupon"
      );
    }
  }
);

/* ===================== SLICE ===================== */

const adminCouponSlice = createSlice({
  name: "adminCoupon",
  initialState,
  reducers: {
    clearCouponError: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder

      /* ===== CREATE ===== */
      .addCase(createCoupon.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(createCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.coupons.unshift(action.payload);
      })
      .addCase(createCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Create coupon failed";
      })

      /* ===== FETCH ===== */
      .addCase(fetchAllCoupons.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchAllCoupons.fulfilled, (state, action) => {
        state.loading = false;
        state.coupons = action.payload;
      })
      .addCase(fetchAllCoupons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Fetch coupons failed";
      })
      

      /* ===== DELETE ===== */
      .addCase(deleteCoupon.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.coupons = state.coupons.filter(
          (coupon) => coupon._id !== action.payload
        );
      })
      .addCase(deleteCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Delete coupon failed";
      });
  },
});

/* ===================== EXPORT ===================== */

export const { clearCouponError } = adminCouponSlice.actions;
export default adminCouponSlice.reducer;
