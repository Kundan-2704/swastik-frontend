
import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { apiSeller } from "../../../Config/apiSeller";

const API_URL = "/sellers";

/* ===================== TYPES ===================== */

interface SellerAuthState {
  otpSent: boolean;
  otpVerified: boolean;
  jwt: string | null;
    status: "pending" | "approved" | "rejected" | null; // 🔥 ADD
  loading: boolean;
  error: string;
}

interface SellerState {
  sellerAuth: SellerAuthState;
}

/* ===================== SAFE JWT HYDRATION ===================== */

const getStoredSellerJwt = (): string | null => {
  try {
    return localStorage.getItem("seller_jwt");
  } catch {
    return null;
  }
};

/* ===================== INITIAL STATE ===================== */

const initialState: SellerState = {
  sellerAuth: {
    otpSent: false,
    otpVerified: false,
    jwt: getStoredSellerJwt(),
     status: null, // 🔥 // ✅ reload safe
    loading: false,
    error: "",
  },
};

/* ===================== THUNKS ===================== */

/* ===== SEND LOGIN OTP ===== */
export const sendLoginOtp = createAsyncThunk<
  any,
  { email: string },
  { rejectValue: string }
>("sellers/sendLoginOtp", async ({ email }, { rejectWithValue }) => {
  try {
    const res = await apiSeller.post(`${API_URL}/send/login-otp`, { email });
    return res.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "OTP send failed");
  }
});

/* ===== VERIFY LOGIN OTP ===== */
export const verifyLoginOtp = createAsyncThunk<
  any,
  { email: string; otp: string },
  { rejectValue: string }
>("sellers/verifyLoginOtp", async (data, { rejectWithValue }) => {
  try {
    const res = await apiSeller.post(`${API_URL}/verify/login-otp`, data);
    localStorage.setItem("seller_jwt", res.data.jwt);
    return res.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "OTP verification failed"
    );
  }
});

/* ===== CREATE SELLER (SIGNUP) ===== */
export const createSeller = createAsyncThunk<
  any,
  any,
  { rejectValue: string }
>("sellers/createSeller", async (seller, { rejectWithValue }) => {
  try {
    const res = await apiSeller.post(`${API_URL}`, seller);
    if (res.data?.jwt) {
      localStorage.setItem("seller_jwt", res.data.jwt);
    }
    return res.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Seller signup failed"
    );
  }
});

/* ===================== SLICE ===================== */

const sellerSlice = createSlice({
  name: "seller",
  initialState,
  reducers: {
    clearSellerError: (state) => {
      state.sellerAuth.error = "";
    },

    resetOtpState: (state) => {
      state.sellerAuth.otpSent = false;
      state.sellerAuth.otpVerified = false;
    },

    /* 🔥 GOOGLE LOGIN + MANUAL JWT SET */
    setSellerJwt: (state, action: PayloadAction<string>) => {
      state.sellerAuth.jwt = action.payload;
        state.sellerAuth.status = action.payload.status || "pending"; // 🔥
      state.sellerAuth.otpVerified = true;
      state.sellerAuth.otpSent = true;
      state.sellerAuth.error = "";
      localStorage.setItem("seller_jwt", action.payload);
    },

    logoutSeller: (state) => {
      state.sellerAuth.jwt = null;
      state.sellerAuth.otpSent = false;
      state.sellerAuth.otpVerified = false;
      state.sellerAuth.error = "";
      localStorage.removeItem("seller_jwt");
    },
  },

  extraReducers: (builder) => {
    builder

      /* ===== SEND LOGIN OTP ===== */
      .addCase(sendLoginOtp.pending, (state) => {
        state.sellerAuth.loading = true;
        state.sellerAuth.error = "";
      })
      .addCase(sendLoginOtp.fulfilled, (state) => {
        state.sellerAuth.loading = false;
        state.sellerAuth.otpSent = true;
      })
      .addCase(sendLoginOtp.rejected, (state, action) => {
        state.sellerAuth.loading = false;
        state.sellerAuth.error = action.payload || "";
      })

      /* ===== VERIFY LOGIN OTP ===== */
      .addCase(verifyLoginOtp.pending, (state) => {
        state.sellerAuth.loading = true;
        state.sellerAuth.error = "";
      })
      .addCase(verifyLoginOtp.fulfilled, (state, action) => {
        state.sellerAuth.loading = false;
        state.sellerAuth.otpVerified = true;
        state.sellerAuth.jwt = action.payload?.jwt || null;
          state.sellerAuth.status = action.payload?.status || "pending"; // 🔥
      })
      .addCase(verifyLoginOtp.rejected, (state, action) => {
        state.sellerAuth.loading = false;
        state.sellerAuth.error = action.payload || "";
      })

      /* ===== CREATE SELLER ===== */
      .addCase(createSeller.pending, (state) => {
        state.sellerAuth.loading = true;
        state.sellerAuth.error = "";
      })
      .addCase(createSeller.fulfilled, (state, action) => {
        state.sellerAuth.loading = false;
        state.sellerAuth.jwt = action.payload?.jwt || null;
          state.sellerAuth.status = action.payload?.status || "pending"; // 🔥
      })
      .addCase(createSeller.rejected, (state, action) => {
        state.sellerAuth.loading = false;
        state.sellerAuth.error = action.payload || "";
      });
  },
});

/* ===================== EXPORTS ===================== */

export const {
  clearSellerError,
  resetOtpState,
  logoutSeller,
  setSellerJwt, // 🔥 IMPORTANT
} = sellerSlice.actions;

export default sellerSlice.reducer;
