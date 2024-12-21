import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { base_url } from "../../components/common/config"

const initialState = {
    isAuthenticated: false,
    isLoading: true,
    user: null,
}

export const loginAdmin = createAsyncThunk('/auth/login-admin',
    async (formData) => {
        const response = await axios.post(`${base_url}user/login-admin`, formData, {
            withCredentials: true
        })
        return response.data
    }
)

export const logoutAdmin = createAsyncThunk('/auth/logout-admin',
    async () => {
        const response = await axios.post(`${base_url}user/logout-admin`,{}, {
            withCredentials: true
        })
        return response.data
    }
)

export const checkAuth = createAsyncThunk('/auth/checkauth-admin',
    async () => {
        const response = await axios.get(`${base_url}user/check-auth-admin`, {
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
            .addCase(loginAdmin.pending, (state) => {
                state.isLoading = true
            })
            .addCase(loginAdmin.fulfilled, (state, action) => {
                state.isLoading = false
                state.user = action.payload.data.user
                state.isAuthenticated = true
            })
            .addCase(loginAdmin.rejected, (state, action) => {
                state.isLoading = false
                state.user = null
                state.isAuthenticated = false
            })
            .addCase(checkAuth.pending, (state) => {
                state.isLoading = true
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.isLoading = false
                state.user = action.payload.success ? action.payload.admin : null
                state.isAuthenticated = true
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.isLoading = false
                state.user = null
                state.isAuthenticated = false
            })
            .addCase(logoutAdmin.fulfilled, (state, action) => {
                state.isLoading = false
                state.user = null
                state.isAuthenticated = false
            })
    }
})

export default authSlice.reducer
