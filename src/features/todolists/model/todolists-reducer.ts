import { Todolist } from '../api/todolistsApi.types';
import { AppDispatch } from 'app/store';
import { todolistsApi } from '../api/todolistsApi';
import { setAppStatusAC } from 'app/app-reducer';

export type FilterValuesType = 'all' | 'active' | 'completed';

export type DomainTodolist = Todolist & {
  filter: FilterValuesType;
};

const initialState: DomainTodolist[] = [];

// Actions types

export type DeleteTodolistActionType = ReturnType<typeof deleteTodolistAC>;

export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;

export type ChangeTodolistFilterActionType = ReturnType<
  typeof changeTodolistFilterAC
>;

export type UpdateTodolistTitleActionType = ReturnType<
  typeof updateTodolistTitleAC
>;

export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>;

type ActionsType =
  | DeleteTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistFilterActionType
  | UpdateTodolistTitleActionType
  | SetTodolistsActionType;

export const todolistsReducer = (
  state: DomainTodolist[] = initialState,
  action: ActionsType
): DomainTodolist[] => {
  switch (action.type) {
    case 'SET-TODOLISTS': {
      return action.todolists.map(tl => ({ ...tl, filter: 'all' }));
    }
    case 'DELETE-TODOLIST': {
      return state.filter(tl => tl.id !== action.payload.todolistId);
    }
    case 'ADD-TODOLIST': {
      const newTodolist: DomainTodolist = {
        ...action.payload.todolist,
        filter: 'all',
      };
      return [newTodolist, ...state];
    }
    case 'CHANGE-TODOLIST-FILTER': {
      const todolist = state.find(tl => tl.id === action.payload.todolistId);
      if (todolist) {
        todolist.filter = action.payload.filter;
      }
      return [...state];
    }
    case 'UPDATE-TODOLIST-TITLE': {
      const todolist = state.find(tl => tl.id === action.payload.id);
      if (todolist) {
        todolist.title = action.payload.title;
      }
      return [...state];
    }
    default:
      return state;
  }
};

// Action creators

export const setTodolistsAC = (todolists: Todolist[]) => {
  return { type: 'SET-TODOLISTS', todolists } as const;
};

export const deleteTodolistAC = (todolistId: string) => {
  return { type: 'DELETE-TODOLIST', payload: { todolistId } } as const;
};

export const addTodolistAC = (todolist: Todolist) => {
  return { type: 'ADD-TODOLIST', payload: { todolist } } as const;
};

export const changeTodolistFilterAC = (payload: {
  todolistId: string;
  filter: FilterValuesType;
}) => {
  return {
    type: 'CHANGE-TODOLIST-FILTER',
    payload,
  } as const;
};

export const updateTodolistTitleAC = (payload: {
  title: string;
  id: string;
}) => {
  return {
    type: 'UPDATE-TODOLIST-TITLE',
    payload,
  } as const;
};

// Thunk

export const fetchTodolistsTC = () => (dispatch: AppDispatch) => {
  // включаем Loading
  dispatch(setAppStatusAC('loading'));
  // внутри санки можно делать побочные эффекты (запросы на сервер)
  todolistsApi.getTodolists().then(res => {
    const todolists = res.data;
    // выключаем Loading
    dispatch(setAppStatusAC('succeeded'));
    // и диспатчить экшены (action) или другие санки (thunk)
    dispatch(setTodolistsAC(todolists));
  });
};

export const addTodolistTC = (title: string) => (dispatch: AppDispatch) => {
  dispatch(setAppStatusAC('loading'));
  todolistsApi.createTodolist(title).then(res => {
    dispatch(setAppStatusAC('succeeded'));
    dispatch(addTodolistAC(res.data.data.item));
  });
};

export const removeTodolistTC = (id: string) => (dispatch: AppDispatch) => {
  dispatch(setAppStatusAC('loading'));
  todolistsApi.removeTodolist(id).then(res => {
    dispatch(setAppStatusAC('succeeded'));
    dispatch(deleteTodolistAC(id));
  });
};

export const updateTodolistTitleTC =
  (arg: { id: string; title: string }) => (dispatch: AppDispatch) => {
    todolistsApi.updateTodolist(arg).then(res => {
      dispatch(updateTodolistTitleAC(arg));
    });
  };
