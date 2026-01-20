import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiCustomer } from "../../../Config/apiCustomer";

/* ================= TYPES ================= */

interface DealProduct {
    _id: string;
    title: string;
    image: string;
}

interface CustomerDeal {
    _id: string;
    name: string;
    discountValue: number;
    products: DealProduct[];
    startDate: string;
    endDate: string;
    active: boolean;
}

interface CustomerDealState {
    deals: CustomerDeal[];
    loading: boolean;
    error: string;
}

/* ================= INITIAL STATE ================= */

const initialState: CustomerDealState = {
    deals: [],
    loading: false,
    error: "",
};

/* ================= GET ACTIVE DEALS ================= */
/**
 * ⚠️ Backend me /deals/active route nahi hai
 * 👉 Isliye /admin/deals se data laa ke
 * 👉 frontend pe active + date filter kar rahe hain
 */
export const getActiveDeals = createAsyncThunk(
    "customerDeal/getActiveDeals",
    async (_, { rejectWithValue }) => {
        try {
            const res = await apiCustomer.get("/admin/deals");

            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const activeDeals = res.data.filter((deal: any) => {
                const start = new Date(deal.startDate);
                const end = new Date(deal.endDate);

                start.setHours(0, 0, 0, 0);
                end.setHours(23, 59, 59, 999);

                return start <= today && end >= today;
            });

            return activeDeals;
        } catch (err: any) {
            return rejectWithValue("Failed to fetch deals");
        }
    }
);


/* ================= SLICE ================= */

const customerDealSlice = createSlice({
    name: "customerDeal",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            /* ===== GET ACTIVE DEALS ===== */
            .addCase(getActiveDeals.pending, (state) => {
                state.loading = true;
                state.error = "";
            })

            .addCase(getActiveDeals.fulfilled, (state, action) => {
                state.loading = false;
                state.deals = action.payload;
            })

            .addCase(getActiveDeals.rejected, (state, action: any) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default customerDealSlice.reducer;
