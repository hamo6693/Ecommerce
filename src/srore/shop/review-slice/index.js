import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "axios"

///review/:productId

const initialState = {
    isLoading : false,
    reviews : []
}

export const addReview = createAsyncThunk(
    "/review",
    async(formdata)=> {
        const response = await axios.post("http://localhost:3000/review",formdata)
        return response.data
    }
)

export const getReviews = createAsyncThunk(
    "/review",
    async(id)=> {
        const response = await axios.get(`http://localhost:3000/review/${id}`)
        return response.data
    }
)

const reviewSlice = createSlice({
    name:"reviewSlice",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder
        .addCase(getReviews.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getReviews.fulfilled, (state, action) => {
            state.isLoading = false;
            state.reviews = action.payload.data;
          })
          .addCase(getReviews.rejected, (state) => {
            state.isLoading = false;
            state.reviews = [];
          });
        
    }
})

export default reviewSlice.reducer