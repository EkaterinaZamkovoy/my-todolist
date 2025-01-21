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

export const store = configureStore({
  reducer: {
    [tasksSlice.name]: tasksReducer,
    [todolistSlice.name]: todolistsReducer,
    [appSlice.name]: appReducer,
    [authSlice.name]: authReducer,
  },
});

export type AppRootStateType = ReturnType<typeof store.getState>;

// Создаем тип диспатча который принимает как AC так и TC
export type AppDispatch = typeof store.dispatch;
