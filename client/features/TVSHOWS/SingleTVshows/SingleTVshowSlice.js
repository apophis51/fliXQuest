import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchSingleTVshow = createAsyncThunk(
    'TVshows/fetchSingleTVshow',
    async (TVshowId) => {
        try {
            const response = await axios.get(`/api/tvshows/${TVshowId}`);
            return response.data;
        } catch (error) {
            console.log("Error fetching TVshow: ", error);
            throw error;
        }
    }
);

const SingleTVshowSlice = createSlice({
    name: 'TVshows',
    initialState: {
        tvshow: {},
        loading: true,
        error: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchSingleTVshow.pending, (state) => {
            state.loading = true;
            state.error = false;
        });
        builder.addCase(fetchSingleTVshow.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
            state.tvshow = action.payload;
        });
        builder.addCase(fetchSingleTVshow.rejected, (state) => {
            state.loading = false;
            state.error = true;
        });
    }
});

export const selectSingleTVshow = (state) => state.singleTVshow.tvshow;

export default SingleTVshowSlice.reducer;