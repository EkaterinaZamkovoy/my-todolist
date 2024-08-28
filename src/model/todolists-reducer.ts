import { v1 } from "uuid";
import { FilterValuesType, TodolistType } from "../app/App";

export type DeleteTodolistActionType = {
  type: "DELETE-TODOLIST";
  todolistId: string;
};

export type AddTodolistActionType = {
  type: "ADD-TODOLIST";
  title: string;
  todolistId: string;
};

export type ChangeTodolistFilterActionType = {
  type: "CHANGE-TODOLIST-FILTER";
  filter: FilterValuesType;
  todolistId: string;
};

export type UpdateTodolistTitleActionType = {
  type: "UPDATE-TODOLIST-TITLE";
  title: string;
  todolistId: string;
};

type ActionsType =
  | DeleteTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistFilterActionType
  | UpdateTodolistTitleActionType;

const initialState: TodolistType[] = [];

export const todolistsReducer = (
  state: TodolistType[] = initialState,
  action: ActionsType
): TodolistType[] => {
  switch (action.type) {
    case "DELETE-TODOLIST": {
      return state.filter((tl) => tl.id !== action.todolistId);
    }
    case "ADD-TODOLIST": {
      const todolistID = action.todolistId;
      const newTodolist: TodolistType = {
        id: todolistID,
        title: action.title,
        filter: "all",
      };
      return [newTodolist, ...state];
    }
    case "CHANGE-TODOLIST-FILTER": {
      const todolist = state.find((tl) => tl.id === action.todolistId);
      if (todolist) {
        todolist.filter = action.filter;
      }
      return [...state];
    }
    case "UPDATE-TODOLIST-TITLE": {
      const todolist = state.find((tl) => tl.id === action.todolistId);
      if (todolist) {
        todolist.title = action.title;
      }
      return [...state];
    }
    default:
      return state;
  }
};

export const deleteTodolistAC = (
  todolistId: string
): DeleteTodolistActionType => {
  return { type: "DELETE-TODOLIST", todolistId: todolistId } as const;
};

export const addTodolistAC = (title: string): AddTodolistActionType => {
  return { type: "ADD-TODOLIST", title, todolistId: v1() } as const;
};

export const changeTodolistFilterAC = (
  todolistId: string,
  filter: FilterValuesType
): ChangeTodolistFilterActionType => {
  return {
    type: "CHANGE-TODOLIST-FILTER",
    todolistId: todolistId,
    filter,
  } as const;
};

export const updateTodolistTitleAC = (
  title: string,
  todolistId: string
): UpdateTodolistTitleActionType => {
  return {
    type: "UPDATE-TODOLIST-TITLE",
    title,
    todolistId: todolistId,
  } as const;
};
