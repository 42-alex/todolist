import { createSlice } from '@reduxjs/toolkit';
import { TodosArr } from '../types';

export const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    todos: [] as TodosArr,
  },
  reducers: {
    setTodos: (state, action: {payload: TodosArr}) => {
      state.todos = action.payload;
    }
  }
})

export default todoSlice.reducer;