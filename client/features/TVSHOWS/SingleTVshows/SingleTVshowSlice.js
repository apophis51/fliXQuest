import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchSingleTVshow = createAsyncThunk(
  "TVshows/fetchSingleTVshow",
  async (TVshowId) => {
    try {
      const response = await axios.get(`/api/tvshows/single/${TVshowId}`);
      return response.data;
    } catch (error) {
      console.log("Error fetching TVshow: ", error);
      throw error;
    }
  }
);
export const fetchTVShowTrailer = createAsyncThunk(
  "singleTVshow/fetchTVShowTrailer",
  async (TVshowId) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/tv/${TVshowId}/videos?api_key=1cf50e6248dc270629e802686245c2c8`
      );
      const trailer = response.data.results.find(
        (video) => video.type === "Trailer"
      );
      return trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;
    } catch (error) {
      console.log("Error fetching tvshow trailer: ", error);
      throw error;
    }
  }
);
const SingleTVshowSlice = createSlice({
  name: "singleTVshow",
  initialState: {
    tvshow: null,
    loading: true,
    error: null,
    trailerUrl: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSingleTVshow.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchSingleTVshow.fulfilled, (state, action) => {
      state.loading = false;
      state.tvshow = action.payload;
    });
    builder.addCase(fetchSingleTVshow.rejected, (state) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(fetchTVShowTrailer.fulfilled, (state, action) => {
      state.trailerUrl = action.payload;
    });
  },
});
export const selectSingleTVshow = (state) => state.singleTVshow;
export default SingleTVshowSlice.reducer;
