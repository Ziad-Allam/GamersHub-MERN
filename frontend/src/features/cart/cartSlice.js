import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { base_url } from "../../components/common/config"

const initialState = {
    isLoading: false,
    cartProducts: [],
}

export const addToCart = createAsyncThunk('/cart/addToCart',
    async ({ userId, productId, quantity }) => {
        const response = await axios.post(`${base_url}cart/add`, {
            userId, productId, quantity
        });
        return response.data
    }
)
export const fetchCartProducts = createAsyncThunk('/cart/get',
    async (userId) => {
        const response = await axios.get(`${base_url}cart/get/${userId}`);
        return response.data
    }
)
export const updateCartQuantity = createAsyncThunk('/cart/updateCartQuantity',
    async ({userId, productId, quantity}) => {
        const response = await axios.put(`${base_url}cart/edit/updateItemQty`, {
            userId, productId, quantity
        });
        return response.data
    }
)
export const deleteCartProduct = createAsyncThunk('/cart/deleteCartProduct',
    async ({userId, productId}) => {
        const response = await axios.delete(`${base_url}cart/delete/${userId}/${productId}`);
        return response.data
    }
)

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(addToCart.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.isLoading = false
                state.cartProducts = action.payload.data
            })
            .addCase(addToCart.rejected, (state) => {
                state.isLoading = false
                state.cartProducts = []
            })
            .addCase(fetchCartProducts.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchCartProducts.fulfilled, (state, action) => {
                state.isLoading = false
                state.cartProducts = action.payload.data
            })
            .addCase(fetchCartProducts.rejected, (state) => {
                state.isLoading = false
                state.cartProducts = []
            })
            .addCase(updateCartQuantity.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateCartQuantity.fulfilled, (state, action) => {
                state.isLoading = false
                state.cartProducts = action.payload.data
            })
            .addCase(updateCartQuantity.rejected, (state) => {
                state.isLoading = false
                state.cartProducts = []
            })
            .addCase(deleteCartProduct.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteCartProduct.fulfilled, (state, action) => {
                state.isLoading = false
                state.cartProducts = action.payload.data
            })
            .addCase(deleteCartProduct.rejected, (state) => {
                state.isLoading = false
                state.cartProducts = []
            })
    }
})

export default cartSlice.reducer
