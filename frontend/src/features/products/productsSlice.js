import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { base_url } from "../../components/common/config"

const initialState = {
    isLoading: false,
    productList: [],
    productDetails: null
}

export const getAllProducts = createAsyncThunk('/products/getAllProducts',
    async ({ filterParams,sortParams }) => {
        const query = new URLSearchParams({
            ...filterParams,
            sortBy:sortParams
        })
        const response = await axios.get(`${base_url}products/get?${query}`);
        return response.data
    }
)

export const fetchProductDetails = createAsyncThunk('/products/fetchProductDetails',
    async (id) => {
        const response = await axios.get(`${base_url}products/get/productDetails/${id}`);
        return response.data
    }
)

export const fetchProductsByCategory = createAsyncThunk('/products/fetchProductsByCategory',
    async ({ id, sortBy }) => {
        const response = await axios.get(`${base_url}products/get/productsByCategory/${id}?sortBy=${sortBy}`);
        return response.data
    }
)

export const fetchProductsByBrand = createAsyncThunk('/products/fetchProductsByBrand',
    async ({ id, sortBy }) => {
        const response = await axios.get(`${base_url}products/get/productsByBrand/${id}?sortBy=${sortBy}`);
        return response.data
    }
)

export const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllProducts.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.isLoading = false
                // state.productList = action.payload.data.filteredProducts
                state.productList = action.payload.data
            })
            .addCase(getAllProducts.rejected, (state) => {
                state.isLoading = false
                state.productList = []
            })
            .addCase(fetchProductDetails.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchProductDetails.fulfilled, (state, action) => {
                state.isLoading = false
                // state.productDetails = action.payload.data.productDetails
                state.productDetails = action.payload.data
            })
            .addCase(fetchProductDetails.rejected, (state) => {
                state.isLoading = false
                state.productDetails = null
            })
            .addCase(fetchProductsByCategory.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
                state.isLoading = false
                // state.productList = action.payload.data.productsCategory
                state.productList = action.payload.data
            })
            .addCase(fetchProductsByCategory.rejected, (state) => {
                state.isLoading = false
                state.productDetails = null
            })
            .addCase(fetchProductsByBrand.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchProductsByBrand.fulfilled, (state, action) => {
                state.isLoading = false
                // state.productList = action.payload.data.brandProducts
                state.productList = action.payload.data
            })
            .addCase(fetchProductsByBrand.rejected, (state) => {
                state.isLoading = false
                state.productDetails = null
            })
    }
})

export default productsSlice.reducer
