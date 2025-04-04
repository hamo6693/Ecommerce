import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";




const initialState = {
    isLoading:false,
    searchResult:[]
}


export const getSearchResult = createAsyncThunk(
    "/search/:keyword",
    async(keyword)=> {
        const response = await axios.get(`http://localhost:3000/search/${keyword}`)
        return response.data
    }
)
const searchSlice = createSlice({
    name:"searchSlice",
    initialState,
    reducers:{
        restSearchResult:(state)=>{
            state.searchResult = []
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getSearchResult.pending,(state) => {
            state.isLoading = true
        })
        .addCase(getSearchResult.fulfilled,(state,action) => {
            state.isLoading = false,
            state.searchResult = action.payload.data

        })
        .addCase(getSearchResult.rejected,(state) => {
            state.isLoading = false
            state.searchResult = []
        })

    }

})
//جعل محتوى البحث فارغ
export const {restSearchResult} = searchSlice.actions

export default searchSlice.reducer