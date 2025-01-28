import {
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from '@reduxjs/toolkit';
import { tasksApi } from 'features/todolists/api/tasksApi';
import { todolistsApi } from 'features/todolists/api/todolistsApi';

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
  extraReducers: builder => {
    builder
      .addMatcher(
        // Функция типа предикат - это функция, которая принимает на вход одно или несколько значений и возвращает булево значение (true или false) в зависимости от того, удовлетворяют ли переданные значения определенному условию.
        isPending,
        (state, action) => {
          // change redux store
          if (
            todolistsApi.endpoints.getTodolists.matchPending(action) ||
            tasksApi.endpoints.getTasks.matchPending(action)
          ) {
            return;
          }
          state.status = 'loading';
        }
      )
      .addMatcher(isFulfilled, state => {
        state.status = 'succeeded';
      })
      .addMatcher(isRejected, state => {
        state.status = 'failed';
      });
  },
  selectors: {
    selectIsLoggedIn: state => state.isLoggedIn,
  },
});

export const { setAppStatus, setAppError, setIsLoggedIn } = appSlice.actions;

export const { selectIsLoggedIn } = appSlice.selectors;

export const appReducer = appSlice.reducer;
