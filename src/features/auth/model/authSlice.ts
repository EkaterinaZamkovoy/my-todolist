import { LoginArgs } from '../api/authApi.types';
import { setAppStatus } from 'app/appSlice';
import { AppDispatch, AppRootStateType } from 'app/store';
import { authApi } from '../api/authApi';
import { ResultCode } from 'common/enums/enums';
import { handleServerAppError } from 'common/utils/handleServerAppError';
import { handleServerNetworkError } from 'common/utils/handleServerNetworkError';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  isInitialized: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  // reducers состоит из подредьюсеров, каждый из которых эквивалентен одному
  // оператору case в switch, как мы делали раньше (обычный redux)
  reducers: create => ({
    // Объект payload. Типизация через PayloadAction
    setIsLoggedIn: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
      // логику в подредьюсерах пишем мутабельным образом,
      // т.к. иммутабельность достигается благодаря immer.js
      state.isLoggedIn = action.payload.isLoggedIn;
    }),
    setIsInitialized: create.reducer<{ isInitialized: boolean }>(
      (state, action) => {
        state.isInitialized = action.payload.isInitialized;
      }
    ),
  }),
  selectors: {
    selectIsLoggedIn: state => state.isLoggedIn,
    selectIsInitialized: state => state.isInitialized,
  },
});

// thunks
export const loginTC = (data: LoginArgs) => (dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status: 'loading' }));
  authApi
    .login(data)
    .then(res => {
      if (res.data.resultCode === ResultCode.Success) {
        localStorage.setItem('sn-token', res.data.data.token);
        dispatch(setAppStatus({ status: 'succeeded' }));
        dispatch(setIsLoggedIn({ isLoggedIn: true }));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch(error => {
      handleServerNetworkError(error, dispatch);
    });
};

export const logoutTC = () => (dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status: 'loading' }));
  authApi
    .logout()
    .then(res => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatus({ status: 'succeeded' }));
        dispatch(setIsLoggedIn({ isLoggedIn: false }));
        localStorage.removeItem('sn-token');
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch(error => {
      handleServerNetworkError(error, dispatch);
    });
};

export const initializeAppTC = () => (dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status: 'loading' }));
  authApi
    .me()
    .then(res => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatus({ status: 'succeeded' }));
        dispatch(setIsLoggedIn({ isLoggedIn: true }));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch(error => {
      handleServerNetworkError(error, dispatch);
    })
    .finally(() => {
      dispatch(setIsInitialized({ isInitialized: true }));
    });
};

// Action creator также достаем с помощью slice
export const { setIsLoggedIn, setIsInitialized } = authSlice.actions;
// Создаем reducer при помощи slice
export const authReducer = authSlice.reducer;
export const { selectIsInitialized, selectIsLoggedIn } = authSlice.selectors;
