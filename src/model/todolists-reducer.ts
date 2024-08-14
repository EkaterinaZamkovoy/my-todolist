import { v1 } from "uuid";
import { FilterValuesType, TodolistType } from "../App";

export type DeleteTodolistActionType = {
  type: "DELETE-TODOLIST";
  todolistId: string;
};

export type AddTodolistActionType = {
  type: "ADD-TODOLIST";
  title: string;
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

let todolistID1 = v1();
let todolistID2 = v1();

const nitialState: TodolistType[] = [
  { id: todolistID1, title: "What to learn", filter: "all" },
  { id: todolistID2, title: "What to buy", filter: "all" },
];

export const todolistsReducer = (
  state: TodolistType[] = nitialState,
  action: ActionsType
) => {
  switch (action.type) {
    case "DELETE-TODOLIST": {
      return state.filter((tl) => tl.id !== action.todolistId);
    }
    case "ADD-TODOLIST": {
      const todolistID = v1();
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
      throw new Error("I don't understand this type");
  }
};

export const deleteTodolistAC = (
  todolistId: string
): DeleteTodolistActionType => {
  return { type: "DELETE-TODOLIST", todolistId: todolistId } as const;
};

export const addTodolistAC = (title: string): AddTodolistActionType => {
  return { type: "ADD-TODOLIST", title } as const;
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