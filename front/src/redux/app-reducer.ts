import { createSlice } from '@reduxjs/toolkit';

type appStateType = {
  isFetching: boolean
}

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    isFetching: false
  } as appStateType,
  reducers: {
    setIsFetching: (state, action: { payload: boolean }) => {
      state.isFetching = action.payload;
    }
  }
});

export const { setIsFetching } = appSlice.actions;

export default appSlice.reducer;
