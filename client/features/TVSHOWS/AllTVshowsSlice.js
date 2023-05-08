import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllTVshows = createAsyncThunk(
  "TVshows/fetchAllTVshows",
  async () => {
    try {
      const response = await axios.get("/api/tvshows");
      return response.data;
    } catch (error) {
      console.log("Error fetching TVshows: ", error);
      throw error;
    }
  }
);

export const fetchTVshowById = createAsyncThunk(
  "TVshows/fetchTVshowById",
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

export const fetchTVshowsByGenre = createAsyncThunk(
  "TVshows/fetchTVshowsByGenre",
  async (genreId) => {
    try {
      const response = await axios.get(`/api/tvshows/genre/${genreId}`);
      return response.data;
    } catch (error) {
      console.log("Error fetching TVshows: ", error);
      throw error;
    }
  }
);

export const fetchTVshowsBySearch = createAsyncThunk(
  "TVshows/fetchTVshowsBySearch",
  async (searchTerm) => {
    try {
      const response = await axios.get(`/api/tvshows/search/${searchTerm}`);
      return response.data;
    } catch (error) {
      console.log("Error fetching TVshows: ", error);
      throw error;
    }
  }
);

const AllTVshowsSlice = createSlice({
  name: "TVshows",
  initialState: {
    tvshows: [],
    status: "null",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllTVshows.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchAllTVshows.fulfilled, (state, action) => {
      state.status = "success";
      state.tvshows = action.payload;
    });
    builder.addCase(fetchTVshowById.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchTVshowById.fulfilled, (state, action) => {
      state.status = "success";
      state.tvshows = action.payload;
    });
    builder.addCase(fetchTVshowsByGenre.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchTVshowsByGenre.fulfilled, (state, action) => {
      state.status = "success";
      state.tvshows = action.payload;
    });
    builder.addCase(fetchTVshowsBySearch.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchTVshowsBySearch.fulfilled, (state, action) => {
      state.status = "success";
      state.tvshows = action.payload;
    });
    builder.addCase(fetchAllTVshows.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export default AllTVshowsSlice.reducer;
