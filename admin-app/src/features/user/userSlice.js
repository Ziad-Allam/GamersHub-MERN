import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { base_url } from "../../components/common/config"

const initialState = {
    isLoading: true,
    userList: null,
}

export const getUsers = createAsyncThunk('/auth/getUsers',
    async () => {
        const response = await axios.get(`${base_url}user/get/users`, {
            withCredentials: true,
        });
        return response.data
    }
)

export const getAdmins = createAsyncThunk('/auth/getAdmins',
    async () => {
        const response = await axios.get(`${base_url}user/get/admins`, {
            withCredentials: true,
        });
        return response.data
    }
)

export const userSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.isLoading = false
                state.userList = action.payload.data
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.isLoading = false
                state.userList = null
            })
            .addCase(getAdmins.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAdmins.fulfilled, (state, action) => {
                state.isLoading = false
                state.userList = action.payload.data
            })
            .addCase(getAdmins.rejected, (state, action) => {
                state.isLoading = false
                state.userList = null
            })
    }
})

export default userSlice.reducer
