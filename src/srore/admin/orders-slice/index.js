import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState  = {
    orderList: [],
    orderDetails: null,
}



 export const getAllOrdersForAdmin  = createAsyncThunk(
    "/list-orders-users",
    async () => {
      const response = await axios.get(
        "http://localhost:3000/list-orders-users"
      );
  
      return response?.data;
    }
  );

  
  export const getOrderDetailsForAdmin  = createAsyncThunk("/list-orders-details", async (id) => {
    const response = await axios.get(`http://localhost:3000/list-orders-details/${id}`);
  
    return response?.data;
  });


  export const updateOrderStatus = createAsyncThunk("/update-order-status",
     async ({id,orderStatus}) => 
        {
    const response = await axios.put(`http://localhost:3000/update-order-status/${id}`,
        {
            orderStatus
        });
  
    return response.data;
  });

  


const adminOrderSlice = createSlice({
    name:"adminOrderSlice",
    initialState,
    reducers:{
        restOrderDetails:(state)=>{
            state.orderDetails = null
        }
    },
    extraReducers:(builder) => {
        builder
         .addCase(getAllOrdersForAdmin.pending, (state) => {
                state.isLoading = true;
              })
              .addCase(getAllOrdersForAdmin.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orderList = action.payload.data;
                
              })
              .addCase(getAllOrdersForAdmin.rejected, (state) => {
                state.isLoading = false;
                state.orderList = [];
              })

              .addCase(getOrderDetailsForAdmin .pending, (state) => {
                state.isLoading = true;
              })
              .addCase(getOrderDetailsForAdmin .fulfilled, (state, action) => {
                state.isLoading = false;
                state.orderDetails = action.payload.data;
                
              })
              .addCase(getOrderDetailsForAdmin .rejected, (state) => {
                state.isLoading = false;
                state.orderDetails = [];
              })


    }

})



export const {restOrderDetails} = adminOrderSlice.actions

export default adminOrderSlice.reducer