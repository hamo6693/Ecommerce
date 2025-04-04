import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  approvalURL: null,
  isLoading: false,
  orderId: null,
  orderList: [],
  orderDetails: null,
};

export const createNewOrder = createAsyncThunk(
  "/create-orders",
  async (orderData) => {
    const response = await axios.post(
      "http://localhost:3000/create-orders",
      orderData
    );

    return response.data;
  }
);

export const capturePayment = createAsyncThunk(
  "/capture-payment",
  async ({ paymentId, payerId, orderId }) => {
    const response = await axios.post("http://localhost:3000/capture-payment", {
      paymentId,
      payerId,
      orderId,
    });

    return response?.data;
  }
);

export const getAllOredersByUser = createAsyncThunk(
  "/list-orders",
  async (userId) => {
    const response = await axios.get(
      `http://localhost:3000/list-orders/${userId}`
    );

    return response?.data;
  }
);

export const OredersDetails = createAsyncThunk("/order-details", async (id) => {
  const response = await axios.get(`http://localhost:3000/order-details/${id}`);

  return response?.data;
});

const shoppingOrderSlice = createSlice({
  name: "shoppingOrderSlice",
  initialState,
  reducers: {
    restOrderDetails:(state) => {
      state.orderDetails = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.approvalURL = action.payload.approvalURL;
        state.orderId = action.payload.orderId;

        sessionStorage.setItem(
          "currentOrderId",
          JSON.stringify(action.payload.orderId)
        );
      })
      .addCase(createNewOrder.rejected, (state) => {
        state.isLoading = false;
        state.approvalURL = null;
        state.orderId = null;
      })

      .addCase(getAllOredersByUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOredersByUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
        
      })
      .addCase(getAllOredersByUser.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })

      .addCase(OredersDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(OredersDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(OredersDetails.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = [];
      });
  },
});

export const {restOrderDetails} = shoppingOrderSlice.actions;
export default shoppingOrderSlice.reducer;
