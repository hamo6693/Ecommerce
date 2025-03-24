import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



const initialState = {
    cartItems:[],
    
    isLoading:false
}

export const addToCart = createAsyncThunk("/add-to-cart",async({userId,productId,quantity})=>
     {
    const response = await axios.post("http://localhost:3000/add-to-cart",
     {
        userId,
        productId,
        quantity
    })
    return response.data
})

export const getMyCart = createAsyncThunk("/get-my-cart",async(userId)=> {
    const response = await axios.get(`http://localhost:3000/get-my-cart/${userId}`);
    return response.data
})

export const updateMyCart = createAsyncThunk("/update-my-cart",async({ userId, productId, quantity })=> {
    const response = await axios.put("http://localhost:3000/update-my-cart",{
        userId,
        productId,
        quantity,
    });
    return response.data
})

export const deleteMyCart = createAsyncThunk(
    "delete-my-cart",
    async ({ userId, productId }) => {
      const response = await axios.delete(
        `http://localhost:3000/delete-my-cart/${userId}/${productId}`
      );
  
      return response.data;
    }
  );

const shoppingCartSlice = createSlice({
    name:"shoppingCart",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(addToCart.pending,(state) => {
            state.isLoading = true
        })
        .addCase(addToCart.fulfilled,(state,action) => {
            state.isLoading = false,
            state.cartItems = action.payload.data
        })
        .addCase(addToCart.rejected,(state) => {
            state.isLoading = false,
            state.cartItems = [] 
        })


        .addCase(getMyCart.pending,(state) => {
            state.isLoading = true
        })
        .addCase(getMyCart.fulfilled,(state,action) => {
            state.isLoading = false,
            state.cartItems = action.payload.data
        })
        .addCase(getMyCart.rejected,(state) => {
            state.isLoading = false,
            state.cartItems = [] 
        })

        .addCase(updateMyCart.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(updateMyCart.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cartItems = action.payload.data;
          })
          .addCase(updateMyCart.rejected, (state) => {
            state.isLoading = false;
            state.cartItems = [];
          })





          .addCase(deleteMyCart.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(deleteMyCart.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cartItems = action.payload.data;
          })
          .addCase(deleteMyCart.rejected, (state) => {
            state.isLoading = false;
            state.cartItems = [];
          })
    }
})

export default shoppingCartSlice.reducer