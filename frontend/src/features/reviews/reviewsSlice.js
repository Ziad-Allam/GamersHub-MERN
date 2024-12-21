import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { base_url } from "../../components/common/config";
import axios from "axios";

const initialState = {
    isLoading: false,
    reviews: [],
}

export const getReviews = createAsyncThunk('/reviews/getReviews',
    async (id) => {
        const response = await axios.get(`${base_url}review/get/${id}`);
        return response.data
    }
)

export const addReview = createAsyncThunk('/reviews/addReview',
    async (reviewData) => {
        const response = await axios.post(`${base_url}review/add`, reviewData );
        return response.data
    }
)

const reviewsSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getReviews.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getReviews.fulfilled, (state, action) => {
                state.isLoading = false;
                state.reviews = action.payload.data;
            })
            .addCase(getReviews.rejected, (state) => {
                state.isLoading = false;
                state.reviews = [];
            })
            .addCase(addReview.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addReview.fulfilled, (state, action) => {
                state.isLoading = false;
                state.reviews = action.payload.data;
            })
            .addCase(addReview.rejected, (state) => {
                state.isLoading = false;
                state.reviews = [];
            })
    }

})

export default reviewsSlice.reducer