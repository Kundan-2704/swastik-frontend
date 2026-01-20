





import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiSeller } from "../../../Config/apiSeller";

const API_URL = "/sellers";

/* ===================== INITIAL STATE ===================== */

const initialState = {
  /* ADMIN */
  sellers: [] as any[],
  selectedSeller: null as any,
  report: null as any,

  /* LOGGED-IN SELLER */
  profile: null as any,
  account: null as any, // 👈 account == profile

  loading: false,
  error: null as string | null,

  profileUpdated: false,
  accountUpdated: false,
};

/* ===================== THUNKS ===================== */

/* 1️⃣ FETCH SELLER PROFILE */
export const fetchSellerProfile = createAsyncThunk(
  "seller/fetchSellerProfile",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await apiSeller.get("/sellers/profile");
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch seller profile"
      );
    }
  }
);

/* 2️⃣ FETCH SELLER ACCOUNT */



export const fetchSellerAccount = createAsyncThunk<
  any,
  void,
  { rejectValue: string }
>("seller/fetchSellerAccount", async (_, { rejectWithValue }) => {
  try {
    console.log("🚀 fetchSellerAccount → API CALL START");

    const token = localStorage.getItem("seller_jwt"); // ✅ FINAL FIX
    console.log("🔑 SELLER TOKEN FROM STORAGE →", token);

    const { data } = await apiSeller.get("/sellers/profile");

    console.log("✅ fetchSellerAccount → API SUCCESS");
    console.log("📦 SELLER DATA FROM API →", data);

    return data;
  } catch (error: any) {
    console.error("❌ fetchSellerAccount → API ERROR");
    console.error(
      "📛 ERROR MESSAGE →",
      error.response?.data?.message || error.message
    );

    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch seller account"
    );
  }
});



/* 3️⃣ UPDATE SELLER ACCOUNT */
export const updateSellerAccount = createAsyncThunk<
  any,
  any,
  { rejectValue: string }
>("seller/updateSellerAccount", async (payload, { rejectWithValue }) => {
  try {
    const { data } = await apiSeller.patch(`${API_URL}/`, payload);
    return data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to update seller account"
    );
  }
});

/* ===================== ADMIN THUNKS ===================== */

/* 4️⃣ FETCH ALL SELLERS */
export const fetchSellers = createAsyncThunk<any, string | undefined>(
  "seller/fetchSellers",
  async (status, { rejectWithValue }) => {
    try {
      const { data } = await apiSeller.get(API_URL, {
        params: status ? { status } : {},
      });
      console.log("Fetched sellers:", data);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch sellers"
      );
    }
  }
);

/* 5️⃣ FETCH SELLER BY ID */
export const fetchSellerById = createAsyncThunk<any, string>(
  "seller/fetchSellerById",
  async (sellerId, { rejectWithValue }) => {
    try {
      const { data } = await apiSeller.get(`${API_URL}/${sellerId}`);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch seller"
      );
    }
  }
);

/* 6️⃣ FETCH SELLER REPORT */
export const fetchSellerReport = createAsyncThunk(
  "seller/fetchSellerReport",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await apiSeller.get("/api/sellers/report");
      return data;
    } catch (error: any) {
      return rejectWithValue("Failed to fetch seller report");
    }
  }
);

/* 7️⃣ UPDATE SELLER ACCOUNT STATUS + KYC */
export const updateSellerAccountStatus = createAsyncThunk<
  any,
  { sellerId: string; status: string }
>(
  "seller/updateSellerAccountStatus",
  async ({ sellerId, status }, { rejectWithValue }) => {
    try {
      const { data } = await apiSeller.patch(
        `/sellers/${sellerId}/status`,
        {
          accountStatus: status,
        }
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update seller status"
      );
    }
  }
);



/* ===================== SLICE ===================== */

const sellerManagementSlice = createSlice({
  name: "sellerManagement",
  initialState,
  reducers: {
    clearSellerError: (state) => {
      state.error = null;
    },
    resetProfileUpdated: (state) => {
      state.profileUpdated = false;
    },
    resetAccountUpdated: (state) => {
      state.accountUpdated = false;
    },
  },
  extraReducers: (builder) => {
    builder

      /* ===== PROFILE / ACCOUNT ===== */
      .addCase(fetchSellerProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSellerProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.account = action.payload;
      })
      .addCase(fetchSellerProfile.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchSellerAccount.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSellerAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.account = action.payload;
      })
      .addCase(fetchSellerAccount.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateSellerAccount.pending, (state) => {
        state.loading = true;
        state.accountUpdated = false;
      })
      .addCase(updateSellerAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.account = action.payload;
        state.profile = action.payload;
        state.accountUpdated = true;
      })
      .addCase(updateSellerAccount.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== ADMIN ===== */
      .addCase(fetchSellers.fulfilled, (state, action) => {
        state.sellers = action.payload;
      })

      .addCase(fetchSellerById.fulfilled, (state, action) => {
        state.selectedSeller = action.payload;
      })

      .addCase(fetchSellerReport.fulfilled, (state, action) => {
        state.report = action.payload;
      })

      /* ✅ FIXED _id MATCHING */
      .addCase(updateSellerAccountStatus.fulfilled, (state, action) => {
        state.profileUpdated = true;
        state.sellers = state.sellers.map((seller: any) =>
          seller._id === action.payload._id ? action.payload : seller
        );
      });
  },
});

/* ===================== EXPORT ===================== */

export const {
  clearSellerError,
  resetProfileUpdated,
  resetAccountUpdated,
} = sellerManagementSlice.actions;

export default sellerManagementSlice.reducer;
