import {
  loaderOrderUser,
  getPurchaseOrders,
  errOrderUser,
} from '../../Store/Slices/ordersUserSlice';
import { BaseUrlGet } from '../../global/globales';
import { Dispatch } from '@reduxjs/toolkit';

export const getHistoryOrdersUser =
  (userId: string) => async (dispatch: Dispatch) => {
    dispatch(loaderOrderUser());
    try {
      const resp = await fetch(`${BaseUrlGet}/movements/user/${userId}`);
      const { data } = await resp.json();

      if (resp.status === 200) {
        dispatch(getPurchaseOrders(data));
        return;
      }

      dispatch(
        errOrderUser({ msg: 'Ocurrio un error en getHistoryOrdersUser ' })
      );
    } catch (error) {
      dispatch(
        errOrderUser({ msg: 'Ocurrio un error en getHistoryOrdersUser ' })
      );
      console.log(error);
    }
  };
