import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
  productDetails:null
};

export const filterAllProducts = createAsyncThunk(
    "/filter-all-product",
    async ({filterParams, sortParams}) => {
        const query = new URLSearchParams({
            ...filterParams,
            sortBy: sortParams,
          });

      const result = await axios.get(`http://localhost:3000/filter-all-product?${query}`);
      console.log(result);
      
      return result?.data;
    }
  );


  export const getProductDetails = createAsyncThunk(
    "/get-product-details",
    async (id) => {
      const result = await axios.get(`http://localhost:3000/get-product-details/${id}`);
      console.log(result);
      
      return result?.data;
    }
  );


  const shoppingProductSlice = createSlice({
    name: "shoppingProducts",
    initialState,
    reducers: {
      setProductDetails: (state) => {
        state.productDetails = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(filterAllProducts.pending, (state, action) => {
          state.isLoading = true;
        })
        .addCase(filterAllProducts.fulfilled, (state, action) => {
          state.isLoading = false;
          state.productList = action.payload.data;
          console.log(action);
          
        })
        .addCase(filterAllProducts.rejected, (state, action) => {
          state.isLoading = false;
          state.productList = [];
        })


        .addCase(getProductDetails.pending, (state, action) => {
          state.isLoading = true;
        })
        .addCase(getProductDetails.fulfilled, (state, action) => {
          state.isLoading = false;
          state.productDetails = action.payload.data;
          console.log(action);
          
        })
        .addCase(getProductDetails.rejected, (state, action) => {
          state.isLoading = false;
          state.productDetails = null;
        })

    }})

export const { setProductDetails } = shoppingProductSlice.actions;

export default shoppingProductSlice.reducer;