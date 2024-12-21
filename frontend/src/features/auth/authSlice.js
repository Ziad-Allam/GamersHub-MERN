import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { base_url } from "../../components/common/config"

const initialState = {
    isAuthenticated: false,
    isLoading: true,
    user: null,
}

export const registerUser = createAsyncThunk('/auth/register',
    async (formData) => {
        const response = await axios.post(`${base_url}user/register`, formData, {
            withCredentials: true
        })
        return response.data
    }
)

export const loginUser = createAsyncThunk('/auth/login',
    async (formData) => {
        const response = await axios.post(`${base_url}user/login`, formData, {
            withCredentials: true
        })
        return response.data
    }
)

export const logout = createAsyncThunk('/auth/logout-user',
    async () => {
        const response = await axios.post(`${base_url}user/logout`,{}, {
            withCredentials: true
        })
        return response.data
    }
)

export const checkAuth = createAsyncThunk('/auth/checkauth',
    async () => {
        const response = await axios.get(`${base_url}user/check-auth`, {
            withCredentials: true,
            headers: {
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                Expires: '0'
            }
        });
        return response.data
    }
)

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.user = null
                state.isAuthenticated = false
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false
                state.user = null
                state.isAuthenticated = false
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.user = action.payload.data.user
                state.isAuthenticated = true
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false
                state.user = null
                state.isAuthenticated = false
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoading = false
                state.user = null
                state.isAuthenticated = false
            })
            .addCase(checkAuth.pending, (state) => {
                state.isLoading = true
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.isLoading = false
                state.user = action.payload.success ? action.payload.user : null
                state.isAuthenticated = true
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.isLoading = false
                state.user = null
                state.isAuthenticated = false
            })
    }
})

export default authSlice.reducer
