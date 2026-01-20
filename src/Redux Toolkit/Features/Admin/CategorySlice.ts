import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

/* ================= TYPES ================= */

export interface Category {
    id: string;
    name: string;
    level: number;
    parent: string;
    active: boolean;
}

interface CategoryState {
    categories: Category[];
    loading: boolean;
    error: string | null;
}

/* ================= INITIAL STATE ================= */

const initialState: CategoryState = {
    categories: [],
    loading: false,
    error: null,
};

/* ================= API URL ================= */

const API_URL = "http://localhost:5000/api/categories";


/* ================= THUNKS ================= */

// GET ALL CATEGORIES
export const fetchCategories = createAsyncThunk(
    "adminCategory/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(API_URL);
            return res.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch categories"
            );
        }
    }
);

// DELETE CATEGORY (Soft delete recommended)
export const deleteCategory = createAsyncThunk(
    "adminCategory/delete",
    async (id: string, { rejectWithValue }) => {
        try {
            await axios.delete(`${API_URL}/${id}`);

            return id;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Delete failed"
            );
        }
    }
);

/* ================= SLICE ================= */

const CategorySlice = createSlice({
    name: "adminCategory",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            /* ===== FETCH ===== */
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            /* ===== DELETE ===== */
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.categories = state.categories.filter(
                    (cat) => cat.id !== action.payload
                );
            });
    },
});

export default CategorySlice.reducer;
