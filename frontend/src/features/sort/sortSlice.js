import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    sort: "sort",
}

const sortSlice = createSlice({
    name: 'sort',
    initialState,
    reducers: {
        setSort(state, action) {
            state.sort = action.payload; // Update the sort state
        },
    },
})

export const { setSort } = sortSlice.actions;
export default sortSlice.reducer