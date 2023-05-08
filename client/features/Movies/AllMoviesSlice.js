import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllMovies = createAsyncThunk(
  "movies/fetchAllMovies",
  async () => {
    try {
      const response = await axios.get("/api/movies");
      return response.data;
    } catch (error) {
      console.log("Error fetching movies: ", error);
      throw error;
    }
  }
);

export const fetchMovieById = createAsyncThunk(
  "movies/fetchMovieById",
  async (movieId) => {
    try {
      const response = await axios.get(`/api/movies/${movieId}`);
      return response.data;
    } catch (error) {
      console.log("Error fetching movie: ", error);
      throw error;
    }
  }
);

export const fetchMoviesByGenre = createAsyncThunk(
  "movies/fetchMoviesByGenre",
  async (genreId) => {
    try {
      const response = await axios.get(`/api/movies/genre/${genreId}`);
      return response.data;
    } catch (error) {
      console.log("Error fetching movies: ", error);
      throw error;
    }
  }
);

export const fetchMoviesBySearch = createAsyncThunk(
  "movies/fetchMoviesBySearch",
  async (searchTerm) => {
    try {
      const response = await axios.get(`/api/movies/${searchTerm}`);
      return response.data;
    } catch (error) {
      console.log("Error fetching movies: ", error);
      throw error;
    }
  }
);

const AllMoviesSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    status: "null",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllMovies.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAllMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movies = action.payload;
      })
      .addCase(fetchAllMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchMovieById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchMovieById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movies = action.payload;
      })
      .addCase(fetchMovieById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchMoviesByGenre.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchMoviesByGenre.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movies = action.payload;
      })
      .addCase(fetchMoviesByGenre.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchMoviesBySearch.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchMoviesBySearch.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movies = action.payload;
      })
      .addCase(fetchMoviesBySearch.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default AllMoviesSlice.reducer;

