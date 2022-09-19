import { configureStore } from '@reduxjs/toolkit';
import messagesReducer from './messages-reducer';

const store = configureStore({
  reducer: {
    messages: messagesReducer,
  }
})

export type RootStateType = ReturnType<typeof store.getState>;

export default store;


