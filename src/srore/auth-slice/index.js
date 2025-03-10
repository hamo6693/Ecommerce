//
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";


    //معلومات المستخدم
    const initialState = {
        isAuthenticated: false,
        isLoading: true,
        user: null,
      };
      
      export const registerUser = createAsyncThunk(
        "/register",
      
        async (formData) => {
          const response = await axios.post(
            "http://localhost:3000/register",
            formData,
            {
              //
              withCredentials: true,
            }
          );
      
          return response.data;
        }
      );


      export const loginUser = createAsyncThunk(
        "/login",
      
        async (formData) => {
          const response = await axios.post(
            "http://localhost:3000/login",
            formData,
            {
              //
              withCredentials: true,
            }
          );
      
          return response.data;
        }
      );

      export const checkAuth = createAsyncThunk(
        "/check-auth",
      
        async () => {
          const response = await axios.get(
            "http://localhost:3000/check-auth",
           
            {
              //
              withCredentials: true,
              headers: {
                "Cache-Control":
                  "no-store, no-cache, must-revalidate, proxy-revalidate",
              },
            }
          );
      
          return response.data;
          
        }
      );




const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers: {
        setUser: () => {},
        
      },
      extraReducers:(builder) =>{ builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })


      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {

        
        state.isLoading = false;
        state.user =  action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })

      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        console.log(action);
        
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        console.log(action.payload.user.role);
        
        state.isAuthenticated = action.payload.success;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })


      
      }
})
export const { setUser } = authSlice.actions;
export default authSlice.reducer;