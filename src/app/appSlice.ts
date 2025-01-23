import { createSlice } from '@reduxjs/toolkit';

export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

const initialState = {
  status: 'idle' as RequestStatus,
  error: null as string | null,
  isLoggedIn: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: create => ({
    setAppStatus: create.reducer<{ status: RequestStatus }>((state, action) => {
      state.status = action.payload.status;
    }),
    setAppError: create.reducer<{ error: string | null }>((state, action) => {
      state.error = action.payload.error;
    }),
    setIsLoggedIn: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
      // логику в подредьюсерах пишем мутабельным образом,
      // т.к. иммутабельность достигается благодаря immer.js
      state.isLoggedIn = action.payload.isLoggedIn;
    }),
  }),
  selectors: {
    selectIsLoggedIn: state => state.isLoggedIn,
  },
});

export const { setAppStatus, setAppError, setIsLoggedIn } = appSlice.actions;

export const { selectIsLoggedIn } = appSlice.selectors;

export const appReducer = appSlice.reducer;
