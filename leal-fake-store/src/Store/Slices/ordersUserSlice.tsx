import { createSlice } from "@reduxjs/toolkit";

import { initialStateInterface } from "../../Interfaces/StoreInterface";

const typeStatus = {
  none: "NONE",
  loading: "LOADING",
  failure: "FAILURE",
  success: "SUCCESS",
};

const initialState: initialStateInterface = {
  orderUser: {
    data: [],
    status: typeStatus.none,
    err: {
      msg: "",
    },
  },
  pointsOrder: 0,
};

export const ordersUsersSlice = createSlice({
  name: "orders",
  initialState: initialState,
  reducers: {
    getPurchaseOrders: (state, action) => {
      state.orderUser.data = action.payload.data;
      state.orderUser.status = typeStatus.success;
    },
    pointsOrder: (state, action) => {
      state.pointsOrder = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getPurchaseOrders, pointsOrder } = ordersUsersSlice.actions;

export default ordersUsersSlice.reducer;
