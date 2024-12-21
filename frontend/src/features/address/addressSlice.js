import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { base_url } from "../../components/common/config"

const initialState = {
    isLoading: false,
    addressList: [],
}

export const addNewAddress = createAsyncThunk('/address/addNewAddress',
    async (formData) => {
        const response = await axios.post(`${base_url}address/add`, formData);
        return response.data
    }
)

export const featchAllAddresses = createAsyncThunk('/address/featchAllAddress',
    async (userId) => {
        const response = await axios.get(`${base_url}address/get/${userId}`);
        return response.data
    }
)

export const editAddress = createAsyncThunk('/address/editAddress',
    async ({userId, addressId, formData}) => {
        const response = await axios.put(`${base_url}address/edit/${userId}/${addressId}`, formData);
        return response.data
    }
)

export const deleteAddress = createAsyncThunk('/address/deleteAddress',
    async ({userId, addressId}) => {
        const response = await axios.delete(`${base_url}address/delete/${userId}/${addressId}`);
        return response.data
    }
)

export const addressSlice = createSlice({
    name: "address",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(addNewAddress.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addNewAddress.fulfilled, (state, action) => {
                state.isLoading = false
                state.addressList = action.payload.data
            })
            .addCase(addNewAddress.rejected, (state, action) => {
                state.isLoading = false
                state.addressList = []
            })
            .addCase(featchAllAddresses.pending, (state) => {
                state.isLoading = true
            })
            .addCase(featchAllAddresses.fulfilled, (state, action) => {
                state.isLoading = false
                state.addressList = action.payload.data
            })
            .addCase(featchAllAddresses.rejected, (state, action) => {
                state.isLoading = false
                state.addressList = []
            })
    }
})

export default addressSlice.reducer
