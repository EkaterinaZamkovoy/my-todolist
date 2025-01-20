import {
  combineReducers,
  UnknownAction,
} from 'redux';
import { tasksReducer } from '../features/todolists/model/tasks-reducer';
import { todolistsReducer } from '../features/todolists/model/todolistSlice';
import {  ThunkDispatch } from 'redux-thunk';
import { appReducer } from './appSlice';
import { authReducer } from 'features/auth/model/authSlice';
import { configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer,
  auth: authReducer,
});

export const store = configureStore({ reducer: rootReducer });

export type AppRootStateType = ReturnType<typeof store.getState>;

// Создаем тип диспатча который принимает как AC так и TC
export type AppDispatch = ThunkDispatch<
  AppRootStateType,
  unknown,
  UnknownAction
>;
