import { configureStore } from '@reduxjs/toolkit';
import messagesReducer from './messages-reducer';

const store = configureStore({
  reducer: {
    messages: messagesReducer,
  }
})

export type RootStateType = ReturnType<typeof store.getState>;
export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never;
export type AppDispatch = typeof store.dispatch;
export type StoreType = typeof store;

export default store;
