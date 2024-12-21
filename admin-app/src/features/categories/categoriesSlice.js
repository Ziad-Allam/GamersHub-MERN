import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { base_url } from "../../components/common/config"

const initialState = {
    isLoading: false,
    categoryList: [],
}

export const getAllCategories = createAsyncThunk('/category/category-list',
    async () => {
        const response = await axios.get(`${base_url}admin/category/get`);
        return response.data
    }
)

export const createCategory = createAsyncThunk('/brand/createCategory',
    async (formData) => {
        const response = await axios.post(`${base_url}admin/category/add`, formData, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.data
    }
)

export const editCategory = createAsyncThunk('/products/editCategory',
    async ({ id, formData }) => {
        const response = await axios.put(`${base_url}admin/category/update/${id}`, formData, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.data
    }
)

export const deleteCategory = createAsyncThunk('/products/deleteCategory',
    async (id) => {
        const response = await axios.delete(`${base_url}admin/category/delete/${id}`);
        return response.data
    }
)

export const authSlice = createSlice({
    name: "category",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllCategories.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllCategories.fulfilled, (state, action) => {
                state.isLoading = false
                state.categoryList = action.payload.data.categoryList
            })
            .addCase(getAllCategories.rejected, (state, action) => {
                state.isLoading = false
                state.categoryList = null
            })
            .addCase(createCategory.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.isLoading = false
                state.categoryList = action.payload.data.brandList
            })
            .addCase(createCategory.rejected, (state, action) => {
                state.isLoading = false
                state.categoryList = null
            })
    }
})

export default authSlice.reducer
