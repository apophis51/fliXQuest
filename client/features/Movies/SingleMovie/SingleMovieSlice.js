import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


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

export const fetchMovieTrailer = createAsyncThunk(
  "singleMovie/fetchMovieTrailer",
  async (movieId) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=1cf50e6248dc270629e802686245c2c8`
      );
      const trailer = response.data.results.find(
        (video) => video.type === "Trailer"
      );
      return trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;
    } catch (error) {
      console.log("Error fetching movie trailer: ", error);
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
    trailerUrl: null,
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
    builder.addCase(fetchMovieTrailer.fulfilled, (state, action) => {
      state.trailerUrl = action.payload;
    });
  },
});
export const selectSingleMovie = (state) => state.singleMovie;
export default SingleMovieSlice.reducer;
