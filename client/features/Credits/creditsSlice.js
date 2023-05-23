import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllCredits = createAsyncThunk(
  "credits/fetchAllCredits",
  async (id) => {
    try {
      const response = await axios.get(`/api/credits/${id}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log("Error fetching credits: ", error);
      throw error;
    }
  }
);


export const fetchCreditsBySearch = createAsyncThunk(
  "credits/fetchCreditsBySearch",
  async (searchTerm) => {
    try {
      const response = await axios.get(`/api/credits/search/${searchTerm}`);
      return response.data;
    } catch (error) {
      console.log("Error fetching credits: ", error);
      throw error;
    }
  }
);


const AllCreditsSlice = createSlice({
  name: "Credits",
  initialState: {
    credits: [],
    status: "null",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllCredits.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchAllCredits.fulfilled, (state, action) => {
      state.status = "success";
      state.credits = action.payload;
    });
    builder.addCase(fetchCreditsBySearch.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchCreditsBySearch.fulfilled, (state, action) => {
      state.status = "success";
      state.credits = action.payload;
    });
    builder.addCase(fetchAllCredits.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export default AllCreditsSlice.reducer;
