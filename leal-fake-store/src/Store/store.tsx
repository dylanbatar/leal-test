import { configureStore } from "@reduxjs/toolkit";
import { initialStateInterface } from "../Interfaces/StoreInterface";

import { ordersUsersSlice } from "./Slices/ordersUserSlice";

interface storeInterface {
  orders: initialStateInterface;
}
export const store = configureStore<storeInterface>({
  reducer: { orders: ordersUsersSlice.reducer },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
