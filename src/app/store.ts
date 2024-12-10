import { combineReducers, legacy_createStore } from 'redux';
import { tasksReducer } from '../features/todolists/model/tasks-reducer';
import { todolistsReducer } from '../features/todolists/model/todolists-reducer';

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
});

export const store = legacy_createStore(rootReducer);

export type AppRootStateType = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;
