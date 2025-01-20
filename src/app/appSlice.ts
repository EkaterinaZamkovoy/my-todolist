import { createSlice } from '@reduxjs/toolkit';

export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

const initialState = {
  status: 'idle' as RequestStatus,
  error: null as string | null,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: (create) => ({
    setAppStatus: create.reducer<{ status: RequestStatus }>((state, action) => {
      state.status = action.payload.status;
    }),
    setAppError: create.reducer<{ error: string | null }>((state, action) => {
      state.error = action.payload.error;
    }),
  }),
});

export const { setAppStatus, setAppError } = appSlice.actions;

export const appReducer = appSlice.reducer;
