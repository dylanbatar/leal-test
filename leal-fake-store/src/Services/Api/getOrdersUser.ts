import OrdersUsersData from '../Data/OrdersUsers.json';
import {
  loaderProductsOrder,
  getProductsOrder,
  errProductsOrder,
} from '../../Store/Slices/ordersUserSlice';
import { Dispatch } from '@reduxjs/toolkit';

export const getOrdersUser = async (dispatch: Dispatch) => {
  dispatch(loaderProductsOrder());
  try {
    const result = OrdersUsersData;
    dispatch(getProductsOrder(result));
  } catch (error) {
    console.log(error);
    dispatch(errProductsOrder({ msg: 'Hubo un error en getOrdersUser' }));
  }
};
