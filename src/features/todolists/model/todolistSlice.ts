import { Todolist } from '../api/todolistsApi.types';
import { AppDispatch } from 'app/store';
import { todolistsApi } from '../api/todolistsApi';
import { RequestStatus, setAppError, setAppStatus } from 'app/appSlice';
import { ResultCode } from 'common/enums/enums';
import { handleServerAppError } from 'common/utils/handleServerAppError';
import { handleServerNetworkError } from 'common/utils/handleServerNetworkError';
import { createSlice } from '@reduxjs/toolkit';

export type FilterValuesType = 'all' | 'active' | 'completed';

export type DomainTodolist = Todolist & {
  filter: FilterValuesType;
  entityStatus: RequestStatus;
};

export const todolistSlice = createSlice({
  name: 'todolists',
  initialState: [] as DomainTodolist[],
  reducers: create => ({
    setTodolists: create.reducer<{ todolists: Todolist[] }>((state, action) => {
      return action.payload.todolists.map(tl => ({
        ...tl,
        filter: 'all',
        entityStatus: 'idle',
      }));
    }),
    deleteTodolist: create.reducer<{ id: string }>((state, action) => {
      const index = state.findIndex(tl => tl.id === action.payload.id);
      // найден ли элемент в массиве (index !== -1)
      if (index !== -1) {
        state.splice(index, 1);
      }
    }),
    addTodolist: create.reducer<{ todolist: Todolist }>((state, action) => {
      state.unshift({
        ...action.payload.todolist,
        filter: 'all',
        entityStatus: 'idle',
      });
    }),
    changeTodolistFilter: create.reducer<{
      todolistId: string;
      filter: FilterValuesType;
    }>((state, action) => {
      const index = state.findIndex(tl => tl.id === action.payload.todolistId);
      if (index !== -1) {
        state[index].filter = action.payload.filter;
      }
    }),
    updateTodolistTitle: create.reducer<{ id: string; title: string }>(
      (state, action) => {
        const index = state.findIndex(tl => tl.id === action.payload.id);
        if (index !== -1) {
          state[index].title = action.payload.title;
        }
      }
    ),
    changeTodolistEntityStatus: create.reducer<{
      id: string;
      entityStatus: RequestStatus;
    }>((state, action) => {
      const todolist = state.find(tl => tl.id === action.payload.id);
      if (todolist) {
        todolist.entityStatus = action.payload.entityStatus;
      }
    }),
    clearTodolists: create.reducer(() => {
      return [];
    }),
  }),
});

// Thunk

export const fetchTodolistsTC = () => (dispatch: AppDispatch) => {
  // включаем Loading
  dispatch(setAppStatus({ status: 'loading' }));
  // внутри санки можно делать побочные эффекты (запросы на сервер)
  todolistsApi
    .getTodolists()
    .then(res => {
      // выключаем Loading
      dispatch(setAppStatus({ status: 'succeeded' }));
      // и диспатчить экшены (action) или другие санки (thunk)
      dispatch(setTodolists({ todolists: res.data }));
    })
    .catch(error => {
      handleServerNetworkError(error, dispatch);
    });
};

export const addTodolistTC = (title: string) => (dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status: 'loading' }));
  todolistsApi
    .createTodolist(title)
    .then(res => {
      console.log('Response:', res);
      console.log('Response Data:', res.data);
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatus({ status: 'succeeded' }));
        dispatch(addTodolist({ todolist: res.data.data.item }));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch(error => {
      handleServerNetworkError(error, dispatch);
    });
};

export const removeTodolistTC = (id: string) => (dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status: 'loading' }));
  dispatch(changeTodolistEntityStatus({ id, entityStatus: 'loading' }));
  todolistsApi
    .removeTodolist(id)
    .then(res => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatus({ status: 'succeeded' }));
        dispatch(deleteTodolist({ id }));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch(error => {
      dispatch(changeTodolistEntityStatus({ id, entityStatus: 'failed' }));
      handleServerNetworkError(error, dispatch);
    });
};

export const updateTodolistTitleTC =
  (arg: { id: string; title: string }) => (dispatch: AppDispatch) => {
    dispatch(setAppStatus({ status: 'loading' }));
    todolistsApi
      .updateTodolist(arg)
      .then(res => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(setAppStatus({ status: 'succeeded' }));
          dispatch(updateTodolistTitle(arg));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch(error => {
        handleServerNetworkError(error, dispatch);
      });
  };

export const {
  setTodolists,
  deleteTodolist,
  addTodolist,
  changeTodolistFilter,
  changeTodolistEntityStatus,
  updateTodolistTitle,
  clearTodolists,
} = todolistSlice.actions;

export const todolistsReducer = todolistSlice.reducer;
