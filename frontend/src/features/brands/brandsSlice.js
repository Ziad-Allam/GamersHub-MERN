import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { base_url } from "../../components/common/config"

const initialState = {
    isLoading: false,
    brandList: [],
}

export const allBrands = createAsyncThunk('/brand/brand-list',
    async () => {
        const response = await axios.get(`${base_url}brands/get`);
        return response.data
    }
)

export const brandsSlice = createSlice({
    name: "brands",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(allBrands.pending, (state) => {
                state.isLoading = true
            })
            .addCase(allBrands.fulfilled, (state, action) => {
                state.isLoading = false
                state.brandList = action.payload.data.brandList
            })
            .addCase(allBrands.rejected, (state, action) => {
                state.isLoading = false
                state.brandList = null
            })
    }
})

export default brandsSlice.reducer
