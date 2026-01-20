import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../Store";
import { resetUserState } from "../Customer/UserSlice";
import { logoutSeller } from "../Seller/SellerAuthenticationSlice";
import { apiCustomer } from "../../../Config/apiCustomer";

/* ================= CONSTANT ================= */

const API_URL = "/auth";

/* ================= STATE ================= */

interface AuthState {
  jwt: string | null;
  role: string | null;
  loading: boolean;
  error: string | null;
  otpSent: boolean;
}

const initialState: AuthState = {
  jwt: null,
  role: null,
  loading: false,
  error: null,
  otpSent: false,
};

/* ================= OTP ================= */

export const sendLoginSignupOtp = createAsyncThunk<
  any,
  { email: string },
  { rejectValue: { message: string; status: number } }
>(
  "auth/sendLoginSignupOtp",
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await apiCustomer.post(
        `${API_URL}/send/login-signup-otp`,
        { email }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue({
        message: error.response?.data?.message || "OTP failed",
        status: error.response?.status || 500,
      });
    }
  }
);

/* ================= SIGNUP ================= */

export const signup = createAsyncThunk<
  any,
  {
    email: string;
    fullName: string;
    otp: string;
    navigate: Function;
  },
  { rejectValue: { message: string; status: number } }
>(
  "auth/signup",
  async ({ email, fullName, otp, navigate }, { rejectWithValue }) => {
    try {
      const response = await apiCustomer.post(`${API_URL}/signup`, {
        email,
        fullName,
        otp,
      });

      localStorage.setItem("jwt", response.data.jwt);
      navigate("/");

      return response.data;
    } catch (error: any) {
      return rejectWithValue({
        message: error.response?.data?.message || "Signup failed",
        status: error.response?.status || 500,
      });
    }
  }
);

/* ================= SIGNIN ================= */

export const signin = createAsyncThunk<
  any,
  {
    email: string;
    otp: string;
    navigate: Function;
  },
  { rejectValue: { message: string; status: number } }
>(
  "auth/signin",
  async ({ email, otp, navigate }, { rejectWithValue }) => {
    try {
      const response = await apiCustomer.post(`${API_URL}/signin`, {
        email,
        otp,
      });

      localStorage.setItem("jwt", response.data.jwt);
      if(response.data.role=="ROLE_ADMIN"){
        navigate("/admin");
      }else navigate("/");
      

      return response.data;
    } catch (error: any) {
      return rejectWithValue({
        message: error.response?.data?.message || "Signin failed",
        status: error.response?.status || 500,
      });
    }
  }
);

/* ================= SLICE ================= */

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.jwt = null;
      state.role = null;
      state.otpSent = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* OTP */
      .addCase(sendLoginSignupOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendLoginSignupOtp.fulfilled, (state) => {
        state.loading = false;
        state.otpSent = true;
        state.error = null;
      })
      .addCase(sendLoginSignupOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "OTP failed";
      })

      /* SIGNUP */
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.jwt = action.payload.jwt;
        state.role = action.payload.role;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Signup failed";
      })

      /* SIGNIN */
      .addCase(signin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.loading = false;
        state.jwt = action.payload.jwt;
        state.role = action.payload.role;
      })
      .addCase(signin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Signin failed";
      });
  },
});

/* ================= SELECTORS ================= */

export const selectAuth = (state: RootState) => state.auth;
export const selectAuthLoading = (state: RootState) => state.auth.loading;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectOtpSent = (state: RootState) => state.auth.otpSent;

/* ================= LOGOUT ================= */

export const { logout } = authSlice.actions;

export const performLogout = () => async (dispatch: any) => {
  dispatch(logout());
  dispatch(resetUserState());
  dispatch(logoutSeller()); // ✅ IMPORTANT FIX
  localStorage.removeItem("jwt");
};

export default authSlice.reducer;
