import {
  tasksReducer,
  tasksSlice,
} from '../features/todolists/model/tasksSlice';
import {
  todolistSlice,
  todolistsReducer,
} from '../features/todolists/model/todolistSlice';
import { appReducer, appSlice } from './appSlice';
import { authReducer, authSlice } from 'features/auth/model/authSlice';
import { configureStore } from '@reduxjs/toolkit';
import { todolistsApi } from 'features/todolists/api/_todolistsApi';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    [tasksSlice.name]: tasksReducer,
    [todolistSlice.name]: todolistsReducer,
    [appSlice.name]: appReducer,
    [authSlice.name]: authReducer,
    [todolistsApi.reducerPath]: todolistsApi.reducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(todolistsApi.middleware),
});

setupListeners(store.dispatch);

export type AppRootStateType = ReturnType<typeof store.getState>;

// Создаем тип диспатча который принимает как AC так и TC
export type AppDispatch = typeof store.dispatch;
