import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { base_url } from "../../components/common/config"

const initialState = {
    isLoading: false,
    categoryList: [],
}

export const allCategories = createAsyncThunk('/category/category-list',
    async () => {
        const response = await axios.get(`${base_url}category/get`);
        return response.data
    }
)

export const authSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(allCategories.pending, (state) => {
                state.isLoading = true
            })
            .addCase(allCategories.fulfilled, (state, action) => {
                state.isLoading = false
                state.categoryList = action.payload.data.categoryList
            })
            .addCase(allCategories.rejected, (state) => {
                state.isLoading = false
                state.categoryList = null
            })
    }
})

export default authSlice.reducer
