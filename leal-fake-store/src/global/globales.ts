import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../Store/store';
export const userId = 1;

export const BaseUrlGet = 'http://localhost:3001/api';
export const BaseUrlPost = 'http://localhost:3000/api';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export enum typeStatus {
  none = 'NONE',
  loading = 'LOADING',
  failure = 'FAILURE',
  success = 'SUCCESS',
}
