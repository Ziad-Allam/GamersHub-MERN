import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { base_url } from "../../components/common/config"

const initialState = {
    isLoading: false,
    approvalURL: null,
    orderId: null,
    orderList: [],
    orderDetails: null
}

export const createOrder = createAsyncThunk('/order/createOrder',
    async (orderData) => {
        const response = await axios.post(`${base_url}order/add`, orderData);        
        return response.data
    }
)

export const capturePayment = createAsyncThunk('/order/capturePayment',
    async ({ paymentId, payerId, orderId }) => {
        const response = await axios.post(`${base_url}order/capture`,
            {
                paymentId, payerId, orderId
            }
        );
        return response.data
    }
)

export const getAllOrdersByUser = createAsyncThunk('/order/getAllOrdersByUser',
    async (userId) => {
        const response = await axios.get(`${base_url}order/get/${userId}`);
        return response.data
    }
)

export const getOrderDetails = createAsyncThunk('/order/getOrderDetails',
    async (id) => {
        const response = await axios.get(`${base_url}order/details/${id}`);
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
            .addCase(createOrder.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.isLoading = false
                state.approvalURL = action.payload.data.approvalURL
                state.orderId = action.payload.data.orderId
                sessionStorage.setItem('orderId', JSON.stringify(action.payload.data.orderId))
            })
            .addCase(createOrder.rejected, (state) => {
                state.isLoading = false 
                state.approvalURL = null
                state.orderId = null
            })
            .addCase(getAllOrdersByUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllOrdersByUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.orderList = action.payload.data
            })
            .addCase(getAllOrdersByUser.rejected, (state) => {
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
