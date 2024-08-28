import { v1 } from "uuid";
import {
  AddTodolistActionType,
  DeleteTodolistActionType,
} from "./todolists-reducer";
import { TasksStateType } from "../app/App";

type DeleteTaskActionType = {
  type: "DELETE-TASK";
  todolistID: string;
  taskId: string;
};

type AddTaskActionType = {
  type: "ADD-TASK";
  todolistID: string;
  title: string;
};

type ChangeTaskStatusActionType = {
  type: "CHANGE-TASK-STATUS";
  todolistID: string;
  taskId: string;
  isDone: boolean;
};

type UpdateTaskTitleActionType = {
  type: "UPDATE-TASK-TITLE";
  todolistID: string;
  taskId: string;
  title: string;
};

type ActionsType =
  | DeleteTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusActionType
  | UpdateTaskTitleActionType
  | AddTodolistActionType
  | DeleteTodolistActionType;

const initialState: TasksStateType = {};

export const tasksReducer = (
  state: TasksStateType = initialState,
  action: ActionsType
) => {
  switch (action.type) {
    case "DELETE-TASK":
      return {
        ...state,
        [action.todolistID]: state[action.todolistID].filter(
          (t) => t.id !== action.taskId
        ),
      };
    case "ADD-TASK":
      const newTask = {
        id: v1(),
        title: action.title,
        isDone: false,
      };
      return {
        ...state,
        [action.todolistID]: [newTask, ...state[action.todolistID]],
      };

    case "CHANGE-TASK-STATUS":
      return {
        ...state,
        [action.todolistID]: state[action.todolistID].map((task) =>
          task.id === action.taskId ? { ...task, isDone: action.isDone } : task
        ),
      };

    case "UPDATE-TASK-TITLE":
      return {
        ...state,
        [action.todolistID]: state[action.todolistID].map((task) =>
          task.id === action.taskId ? { ...task, title: action.title } : task
        ),
      };

    case "ADD-TODOLIST":
      return {
        ...state,
        [action.todolistId]: [],
      };

    case "DELETE-TODOLIST":
      let copyState = { ...state };
      delete copyState[action.todolistId];
      return copyState;

    default:
      return state;
  }
};

export const deleteTaskAC = (todolistID: string, taskId: string) => {
  return { type: "DELETE-TASK", todolistID, taskId } as const;
};

export const addTaskAC = (todolistID: string, title: string) => {
  return { type: "ADD-TASK", todolistID, title } as const;
};

export const changeTaskStatusAC = (
  todolistID: string,
  taskId: string,
  isDone: boolean
) => {
  return { type: "CHANGE-TASK-STATUS", todolistID, taskId, isDone } as const;
};

export const updateTaskTitleAC = (
  todolistID: string,
  taskId: string,
  title: string
) => {
  return { type: "UPDATE-TASK-TITLE", todolistID, taskId, title } as const;
};
