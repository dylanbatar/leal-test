import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { typeStatus } from '../../global/globales';
import { IOrdersHistoryUser } from '../../Interfaces/StoreInterface';
import {
  IOrderHistoryUser,
  IProductOrder,
} from '../../Interfaces/OrderUserInterface';

const initialState: IOrdersHistoryUser = {
  productsOrders: {
    data: [],
    status: typeStatus.none,
    err: {
      msg: '',
    },
  },
  ordersHistoryUser: {
    data: [],
    status: typeStatus.none,
    err: {
      msg: '',
    },
  },
  pointsOrder: 0,
  respOrderBuy: {
    status: typeStatus.none,
    value: null,
    msg: '',
  },
};

export const ordersUsersSlice = createSlice({
  name: 'orders',
  initialState: initialState,
  reducers: {
    loaderProductsOrder: ({ productsOrders }) => {
      productsOrders.status = typeStatus.loading;
    },
    getProductsOrder: (
      { productsOrders },
      action: PayloadAction<IProductOrder[]>
    ) => {
      productsOrders.data = action.payload;
      productsOrders.status = typeStatus.success;
    },
    errProductsOrder: (
      { productsOrders },
      action: PayloadAction<{ msg: string }>
    ) => {
      productsOrders.data = [];
      productsOrders.status = typeStatus.failure;
      productsOrders.err.msg = action.payload.msg;
    },
    loaderOrderUser: ({ ordersHistoryUser }) => {
      ordersHistoryUser.status = typeStatus.loading;
    },
    getPurchaseOrders: (
      { ordersHistoryUser },
      action: PayloadAction<IOrderHistoryUser[]>
    ) => {
      ordersHistoryUser.data = action.payload;
      ordersHistoryUser.status = typeStatus.success;
    },
    errOrderUser: (
      { ordersHistoryUser },
      action: PayloadAction<{ msg: string }>
    ) => {
      ordersHistoryUser.data = [];
      ordersHistoryUser.status = typeStatus.failure;
      ordersHistoryUser.err.msg = action.payload.msg;
    },
    pointsOrder: (state, action) => {
      state.pointsOrder = action.payload;
    },
    loaderRespOrderBuy: ({ respOrderBuy }) => {
      respOrderBuy.status = typeStatus.loading;
    },
    getRespOrderBuy: (
      { respOrderBuy },
      action: PayloadAction<{ value: number | null; msg: string }>
    ) => {
      respOrderBuy.value = action.payload.value;
      respOrderBuy.status = typeStatus.success;
      respOrderBuy.msg = action.payload.msg;
    },
    errRespOrderBuy: (
      { respOrderBuy },
      action: PayloadAction<{ msg: string }>
    ) => {
      respOrderBuy.value = 500;
      respOrderBuy.status = typeStatus.failure;
      respOrderBuy.msg = action.payload.msg;
    },
    deleteMsgRespOrderBuy: ({ respOrderBuy }) => {
      respOrderBuy.value = null;
      respOrderBuy.status = typeStatus.none;
      respOrderBuy.msg = '';
    },
  },
});

export const {
  loaderProductsOrder,
  getProductsOrder,
  errProductsOrder,
  loaderOrderUser,
  getPurchaseOrders,
  errOrderUser,
  pointsOrder,
  loaderRespOrderBuy,
  getRespOrderBuy,
  errRespOrderBuy,
  deleteMsgRespOrderBuy,
} = ordersUsersSlice.actions;

export default ordersUsersSlice.reducer;
