


import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiCustomer } from "../../../Config/apiCustomer";

/* ================= API ================= */

const API_URL = "/api/users";

/* ================= TYPES ================= */

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

/* ================= THUNK ================= */




export const fetchUserProfile = createAsyncThunk<
  User,
  void,
  { rejectValue: { message: string; status: number } }
>(
  "/users/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiCustomer.get(`${API_URL}/profile`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue({
        message: error.response?.data?.message || "Failed to fetch profile",
        status: error.response?.status || 500,
      });
    }
  }
);


/* ================= STATE ================= */

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

/* ================= SLICE ================= */

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUserState: (state) => {
      state.user = null;
      state.loading=false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Something went wrong";
      });
  },
});

export const { resetUserState } = userSlice.actions;
export default userSlice.reducer;
