import { configureStore } from '@reduxjs/toolkit';
import appReducer from './app-reducer';
import messagesReducer from './messages-reducer';

const store = configureStore({
  reducer: {
    app: appReducer,
    messages: messagesReducer,
  }
})

export type RootStateType = ReturnType<typeof store.getState>;

export default store;


