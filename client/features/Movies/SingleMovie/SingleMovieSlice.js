import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// o: no need for try catches in your thunks
export const fetchSingleMovie = createAsyncThunk(
  "singleMovie/fetchSingleMovie",
  async (movieId) => {
    try {
      const response = await axios.get(`/api/movies/single/${movieId}`);
      return response.data;
    } catch (error) {
      console.log("Error fetching movie: ", error);
      throw error;
    }
  }
);

const SingleMovieSlice = createSlice({
  name: "singleMovie",
  initialState: {
    movie: null,
    loading: true,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSingleMovie.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchSingleMovie.fulfilled, (state, action) => {
      state.loading = false;
      state.movie = action.payload;
    });
    builder.addCase(fetchSingleMovie.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const selectSingleMovie = (state) => state.singleMovie;

export default SingleMovieSlice.reducer;
