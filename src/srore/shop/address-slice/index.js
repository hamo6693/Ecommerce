import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    isLoading : false,
    addressList : [],

}


export const addAddress = createAsyncThunk(
    "/add-address",
    async(formData) => {
        const response = await axios.post("http://localhost:3000/add-address",formData)
        return response?.data
    }
)

export const getAddress = createAsyncThunk(
    "/get-address",
    async(userId) => {
        const response = await axios.get(`http://localhost:3000/get-address/${userId}`)
        return response.data
    }
)

export const updateAddress = createAsyncThunk(
    "/update-address",
    async({userId,addressId,formData})=>{
        const response = await axios.put(`http://localhost:3000/update-address/${userId}/${addressId}`,formData)
        return response?.data
    }
)

export const deleteAddress = createAsyncThunk(
    "/delete-address",
    async({userId,addressId})=>{
        const response = await axios.delete(`http://localhost:3000/delete-address/${userId}/${addressId}`)
        return response?.data
    }
);

const addressSlice = createSlice ({
    name:"address",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(addAddress.pending, (state) => {
            state.isLoading = true;
          })
        .addCase(addAddress.fulfilled,(state,action) => {
            state.isLoading = false;
        })
        .addCase(addAddress.rejected,(state,action) => {
            state.isLoading = false;
        })


        .addCase(getAddress.pending,(state) => {
            state.isLoading = true
        })
        .addCase(getAddress.fulfilled,(state,action) => {
            state.isLoading = false;
            state.addressList = action.payload.data
        })
        .addCase(getAddress.rejected,(state,action) => {
            state.isLoading = false;
            state.addressList = []
        })
        
    }
})




export default addressSlice.reducer