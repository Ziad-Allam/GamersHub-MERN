import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { base_url } from "../../components/common/config"

const initialState = {
    isLoading: false,
    brandList: [],
}

export const getAllBrands = createAsyncThunk('/brand/getAllBrands',
    async () => {
        const response = await axios.get(`${base_url}admin/brands/get`);
        return response.data
    }
)

export const createBrand = createAsyncThunk('/brand/createBrand',
    async (formData) => {
        const response = await axios.post(`${base_url}admin/brands/add`, formData, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.data
    }
)

export const editBrand = createAsyncThunk('/products/editBrand',
    async ({id,formData}) => {
        const response = await axios.put(`${base_url}admin/brands/edit/${id}`, formData, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.data
    }
)
export const deleteBrand = createAsyncThunk('/products/deleteBrand',
    async (id) => {
        const response = await axios.delete(`${base_url}admin/brands/delete/${id}`);
        console.log(response);
        return response.data 
        
    }
)


export const authSlice = createSlice({
    name: "brand",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllBrands.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllBrands.fulfilled, (state, action) => {
                state.isLoading = false
                state.brandList = action.payload.data.brandList
            })
            .addCase(getAllBrands.rejected, (state, action) => {
                state.isLoading = false
                state.brandList = null
            })
            .addCase(createBrand.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createBrand.fulfilled, (state, action) => {
                state.isLoading = false
                state.brandList = action.payload.data.brandList
            })
            .addCase(createBrand.rejected, (state, action) => {
                state.isLoading = false
                state.brandList = null
            })
    }
})

export default authSlice.reducer
