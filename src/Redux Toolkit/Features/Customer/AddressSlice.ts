import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiCustomer } from "../../../Config/apiCustomer";


export const createAddress = createAsyncThunk(
  "address/create",
  async ({ address, jwt }: any) => {
    const { data } = await apiCustomer.post(
      "/api/addresses",
      address,
      {
        headers: { Authorization: `Bearer ${jwt}` },
      }
    );
    return data;
  }
);

export const fetchUserAddresses = createAsyncThunk(
  "address/fetch",
  async (jwt: string) => {
    const { data } = await apiCustomer.get("/api/addresses", {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    return data;
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState: { addresses: [] as any[] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserAddresses.fulfilled, (state, action) => {
      state.addresses = action.payload;
    });
  },
});

export default addressSlice.reducer;
