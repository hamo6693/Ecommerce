import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    isLoading: false,
    featureImageList: [],
  };


  export const addFeatureImages = createAsyncThunk(
    "/add-feature",
    async (image) => {
      const response = await axios.post(
        `http://localhost:3000/add-feature`,{image}
      );
  
      return response.data;
    }
  );

  export const getFeatureImages = createAsyncThunk(
    "/get-feature",
    async () => {
      const response = await axios.get(
        `http://localhost:3000/get-feature`
      );
  
      return response.data;
    }
  );

  const commonSlice = createSlice({
    name: "commonSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getFeatureImages.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getFeatureImages.fulfilled, (state, action) => {
          state.isLoading = false;
          state.featureImageList = action.payload.data;
        })
        .addCase(getFeatureImages.rejected, (state) => {
          state.isLoading = false;
          state.featureImageList = [];
        });
    },
  });
  
  export default commonSlice.reducer;