import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { base_url } from "../../components/common/config"

const initialState = {
    isLoading: false,
    wishlist: [],
}

export const wishlistToggle = createAsyncThunk('/wishlist/wishlistToggle',
    async ({ userId, productId }) => {
        const response = await axios.post(`${base_url}wishlist/add`, {
            userId, productId
        });
        return response.data
    }
)
export const getWishlist = createAsyncThunk('/wishlist/getWishlist',
    async (userId) => {
        const response = await axios.get(`${base_url}wishlist/get/${userId}`);
        return response.data
    }
)

export const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(wishlistToggle.pending, (state) => {
                state.isLoading = true
            })
            .addCase(wishlistToggle.fulfilled, (state, action) => {
                state.isLoading = false
                state.wishlist = action.payload.data
            })
            .addCase(wishlistToggle.rejected, (state) => {
                state.isLoading = false
                state.wishlist = []
            })
            .addCase(getWishlist.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getWishlist.fulfilled, (state, action) => {
                state.isLoading = false
                state.wishlist = action.payload.data
            })
            .addCase(getWishlist.rejected, (state) => {
                state.isLoading = false
                state.wishlist = []
            })
    }
})

export default wishlistSlice.reducer
