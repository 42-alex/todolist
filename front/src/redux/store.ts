import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todo-reducer';
import messagesReducer from './messages-reducer';

const store = configureStore({
  reducer: {
    todos: todoReducer,
    messages: messagesReducer,
  }
})

export type RootStateType = ReturnType<typeof store.getState>;

export default store;


