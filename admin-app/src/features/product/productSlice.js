import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { base_url } from "../../components/common/config"

const initialState = {
    isLoading: false,
    productList: [],
}

export const addProduct = createAsyncThunk('/products/addproduct',
    async (formData) => {
        const response = await axios.post(`${base_url}admin/product/add`, formData, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.data
    }
)
export const getAllProducts = createAsyncThunk('/products/getAllProducts',
    async () => {
        const response = await axios.get(`${base_url}admin/product/get`);
        return response.data
    }
)
export const editProduct = createAsyncThunk('/products/editProduct',
    async ({id,formData}) => {
        const response = await axios.put(`${base_url}admin/product/edit/${id}`, formData, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.data
    }
)
export const deleteProduct = createAsyncThunk('/products/deleteProduct',
    async (id) => {
        const response = await axios.delete(`${base_url}admin/product/delete/${id}`);
        return response.data
    }
)

export const productSlice = createSlice({
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
                state.productList = action.payload.data.productList
            })
            .addCase(getAllProducts.rejected, (state) => {
                state.isLoading = false
                state.productList = []
            })
            .addCase(addProduct.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.isLoading = false
                state.categoryList = action.payload.data.category
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.isLoading = false
                state.user = null
            })
    }
})

export default productSlice.reducer
