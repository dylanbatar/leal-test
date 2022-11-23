import { Dispatch } from '@reduxjs/toolkit';
import { BaseUrlPost } from '../../global/globales';
import {
  loaderRespOrderBuy,
  getRespOrderBuy,
  errRespOrderBuy,
} from '../../Store/Slices/ordersUserSlice';

export const postOrdersUser = (data: any) => async (dispatch: Dispatch) => {
  dispatch(loaderRespOrderBuy());

  try {
    const resp = await fetch(BaseUrlPost + '/orders', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (resp.status === 200) {
      dispatch(
        getRespOrderBuy({
          value: resp.status,
          msg: 'Gracias por su compra !! :)',
        })
      );
    } else {
      const { data: msgError } = await resp.json();
      dispatch(getRespOrderBuy({ value: resp.status, msg: msgError }));
    }
  } catch (error) {
    console.log(error);
    dispatch(errRespOrderBuy({ msg: 'Hubo un error en postOrdersUser' }));
  }
};
