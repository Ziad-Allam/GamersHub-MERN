import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { base_url } from "../../components/common/config"

const initialState = {
    isLoading: false,
    bannarImage: [],
}

export const getBannarImages = createAsyncThunk('/bannar/getBannarImages',
    async () => {
        const response = await axios.get(`${base_url}admin/bannar/get`);
        return response.data
    }
)

export const addBannarImage = createAsyncThunk('/bannar/addBannarImage',
    async (image) => {
        const response = await axios.post(`${base_url}admin/bannar/add`, image);
        return response.data
    }
)

export const deleteBanner = createAsyncThunk('/bannar/deleteBanner',
    async (id) => {
        const response = await axios.delete(`${base_url}admin/bannar/delete/${id}`);
        return response.data
    }
)

export const authSlice = createSlice({
    name: "bannar",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBannarImages.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getBannarImages.fulfilled, (state, action) => {
                state.isLoading = false
                state.bannarImage = action.payload.data
            })
            .addCase(getBannarImages.rejected, (state) => {
                state.isLoading = false
                state.bannarImage = null
            })
            .addCase(addBannarImage.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addBannarImage.fulfilled, (state, action) => {
                state.isLoading = false
                state.bannarImage = action.payload.data
            })
            .addCase(addBannarImage.rejected, (state) => {
                state.isLoading = false
                state.bannarImage = null
            })
    }
})

export default authSlice.reducer