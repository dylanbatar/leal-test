import { configureStore } from '@reduxjs/toolkit';
import { IAuthUser, IOrdersHistoryUser } from '../Interfaces/StoreInterface';

import { ordersUsersSlice } from './Slices/ordersUserSlice';
import { authUsersSlice } from './Slices/authUserSlice';

export interface storeInterface {
  auth: IAuthUser;
  orders: IOrdersHistoryUser;
}
export const store = configureStore<storeInterface>({
  reducer: { auth: authUsersSlice.reducer, orders: ordersUsersSlice.reducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
