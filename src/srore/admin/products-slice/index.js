import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
};

export const addProduct = createAsyncThunk(
  "/create-product",
  async (formData) => {
    const result = await axios.post(
      "http://localhost:3000/create-product",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return result.data;
  }
);

export const getAllProducts = createAsyncThunk(
  "/find-all-product",
  async () => {
    const result = await axios.get("http://localhost:3000/find-all-product");
    return result?.data;
  }
);

export const editProducts = createAsyncThunk(
  "/update-product",
  async ({ id, formData }) => {
    const result = await axios.put(
      `http://localhost:3000/update-product/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return result?.data;
  }
);

export const deleteProducts = createAsyncThunk("/delete", async (id) => {
  const result = await axios.delete(`http://localhost:3000/delete/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return result?.data;
});





const AdminProductsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
        console.log(action.payload);
        
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
      });
  },
});

export default AdminProductsSlice.reducer;
