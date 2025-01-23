import {
  tasksReducer,
  tasksSlice,
} from '../features/todolists/model/tasksSlice';
import {
  todolistSlice,
  todolistsReducer,
} from '../features/todolists/model/todolistSlice';
import { appReducer, appSlice } from './appSlice';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { baseApi } from './baseApi';

export const store = configureStore({
  reducer: {
    [tasksSlice.name]: tasksReducer,
    [todolistSlice.name]: todolistsReducer,
    [appSlice.name]: appReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

setupListeners(store.dispatch);

export type AppRootStateType = ReturnType<typeof store.getState>;

// Создаем тип диспатча который принимает как AC так и TC
export type AppDispatch = typeof store.dispatch;
