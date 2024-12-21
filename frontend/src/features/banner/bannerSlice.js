import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { base_url } from "../../components/common/config"

const initialState = {
    isLoading: false,
    bannarImage: [],
}

export const getBannerImages = createAsyncThunk('/banner/getBannerImages',
    async () => {
        const response = await axios.get(`${base_url}bannar/get`);
        return response.data
    }
)

// export const editBrand = createAsyncThunk('/products/editBrand',
//     async ({id,formData}) => {
//         const response = await axios.put(`${base_url}brand/edit/${id}`, formData, {
//             headers: {
//                 'Content-Type': 'application/json',
//             }
//         });
//         return response.data
//     }
// )

// export const deleteBrand = createAsyncThunk('/products/deleteBrand',
//     async (id) => {
//         const response = await axios.delete(`${base_url}brand/delete/${id}`);
//         console.log(response);
//         return response.data 
        
//     }
// )


export const authSlice = createSlice({
    name: "banner",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBannerImages.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getBannerImages.fulfilled, (state, action) => {
                state.isLoading = false
                state.bannarImage = action.payload.data
            })
            .addCase(getBannerImages.rejected, (state, action) => {
                state.isLoading = false
                state.bannarImage = null
            })
    }
})

export default authSlice.reducer
