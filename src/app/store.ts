import {
  applyMiddleware,
  combineReducers,
  legacy_createStore,
  UnknownAction,
} from 'redux';
import { tasksReducer } from '../features/todolists/model/tasks-reducer';
import { todolistsReducer } from '../features/todolists/model/todolists-reducer';
import { thunk, ThunkDispatch } from 'redux-thunk';

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
});

export const store = legacy_createStore(
  rootReducer,
  {},
  applyMiddleware(thunk)
);

export type AppRootStateType = ReturnType<typeof store.getState>;

// export type AppDispatch = typeof store.dispatch;

// Создаем тип диспатча который принимает как AC так и TC
export type AppDispatch = ThunkDispatch<
  AppRootStateType,
  unknown,
  UnknownAction
>;
