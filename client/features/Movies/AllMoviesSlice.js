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
      movieId.replace(/ /g, '+')
      const response = await axios.get(`/api/movies/${movieId}`);

      console.log("here",response.data.results.length)
      if(response.data.results.length == undefined || response.data.results.length == 0){
        console.log("bad")
        return "bad"
      }
      console.log("responding")
      return response.data;


  }
);

export const runGpt = createAsyncThunk(
  "gpt/fetchMovieById",
  async (movieQuery) => {
      const response = await axios.get(`/api/gpt/${movieQuery}`);
      return response.data
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
      const response = await axios.get(`/api/gpt/${searchTerm}`);
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
    gptAnswer: "",
    movieReturn: 0,
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
        state.gptAnswer = "";
        state.error = null;
      })
      .addCase(fetchMovieById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.gptAnswer = "";
        state.movies = action.payload;

      console.log(action.payload)
        if (action.payload == "bad") {
          state.movieReturn = 3;
        }
        else{
          state.movieReturn = true;
        }
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
      })
      .addCase(runGpt.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.movieReturn = 5;
      })
      .addCase(runGpt.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movies = action.payload;
        state.movieReturn = 4;
        state.gptAnswer = action.payload;
      })
      .addCase(runGpt.rejected, (state, action) => {
        state.status = "failed";
        state.movieReturn = 5;
        state.error = action.error.message;
      });
  },
});

export default AllMoviesSlice.reducer;

