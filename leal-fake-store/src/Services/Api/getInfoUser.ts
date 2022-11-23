import { Dispatch } from '@reduxjs/toolkit';
import { BaseUrlGet, userId } from '../../global/globales';
import {
  loaderUserInfo,
  getUserInfo,
  errUserInfo,
} from '../../Store/Slices/authUserSlice';

export const getInfoUser = () => async (dispatch: Dispatch) => {
  dispatch(loaderUserInfo());
  try {
    const resp = await fetch(BaseUrlGet + `/users/${userId}`);
    const result = await resp.json();
    dispatch(getUserInfo(result.data));
  } catch (error) {
    console.log(error);
    dispatch(errUserInfo({ msg: 'Hubo un error en getInfoUser' }));
  }
};
