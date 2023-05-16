import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const runGpt = createAsyncThunk(
  "gpt/fetchMovieById",
  async (movieQuery) => {
      const response = await axios.get(`/api/gpt/movielocations/${movieQuery}`);
      return response.data
  }
);


const MapSlice = createSlice({
  name: "movies",
  initialState: {
    filmLocations: [],
    gptAnswer: "",
    movieReturn: 0,

  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(runGpt.fulfilled, (state, action) => {
        state.filmLocations.push(action.payload);
        console.log(action.payload)
      })
  },
});

export default MapSlice.reducer;

