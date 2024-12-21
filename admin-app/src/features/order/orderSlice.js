import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { base_url } from "../../components/common/config"

const initialState = {
    isLoading: false,
    orderList: [],
    orderDetails: null
}


export const getAllUsersOrders = createAsyncThunk('/order/getAllUsersOrders',
    async () => {
        const response = await axios.get(`${base_url}admin/order/get`);
        return response.data
    }
)

export const getOrderDetails = createAsyncThunk('/order/getOrderDetails',
    async (id) => {
        const response = await axios.get(`${base_url}admin/order/get/ordrDetails/${id}`);
        return response.data
    }
)

export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllUsersOrders.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllUsersOrders.fulfilled, (state, action) => {
                state.isLoading = false
                state.orderList = action.payload.data
            })
            .addCase(getAllUsersOrders.rejected, (state) => {
                state.isLoading = false
                state.orderList = []
            })
            .addCase(getOrderDetails.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getOrderDetails.fulfilled, (state, action) => {
                state.isLoading = false
                state.orderDetails = action.payload.data
            })
            .addCase(getOrderDetails.rejected, (state) => {
                state.isLoading = false
                state.orderDetails = null
            })
    }
})

export default orderSlice.reducer
