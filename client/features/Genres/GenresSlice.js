/*import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = "9c8694c91438b1355e7aa029df2991a4";
const API_BASE_URL = "https://api.themoviedb.org/3";

export const fetchGenres = createAsyncThunk("genres/fetchGenres", async () => {
  const response = await axios.get(
    `${API_BASE_URL}/genre/movie/list?api_key=${API_KEY}`
  );
  return response.data.genres;
});

export const fetchMoviesByGenre = createAsyncThunk(
  "genres/fetchMoviesByGenre",
  async (genreId) => {
    const response = await axios.get(
      `${API_BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`
    );
    return response.data.results;
  }
);

const GenresSlice = createSlice({
  name: "genres",
  initialState: {
    genres: [],
    movies: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch genres
      .addCase(fetchGenres.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGenres.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.genres = action.payload;
      })
      .addCase(fetchGenres.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Fetch movies by genre
      .addCase(fetchMoviesByGenre.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMoviesByGenre.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movies = action.payload;
      })
      .addCase(fetchMoviesByGenre.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default GenresSlice.reducer;
*/
