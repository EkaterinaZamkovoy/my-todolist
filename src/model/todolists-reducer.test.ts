import { v1 } from "uuid";
import { TodolistType } from "../App";
import {
  addTodolistAC,
  changeTodolistFilterAC,
  deleteTodolistAC,
  todolistsReducer,
  updateTodolistTitleAC,
} from "./todolists-reducer";

let todolistID1: string;
let todolistID2: string;
let startState: TodolistType[];

beforeEach(() => {
  todolistID1 = v1();
  todolistID2 = v1();

  startState = [
    { id: todolistID1, title: "What to learn", filter: "all" },
    { id: todolistID2, title: "What to buy", filter: "all" },
  ];
});

//delete-todolist

test("correct todolist should be deleted", () => {
  const endState = todolistsReducer(startState, deleteTodolistAC(todolistID1));

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistID2);
});

//add-todolist

test("correct todolist should be added", () => {
  const endState = todolistsReducer(startState, addTodolistAC("New Todolist"));

  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe("New Todolist");
});

//change-filter

test("correct todolist should be filtered", () => {
  const action = {
    type: "CHANGE-TODOLIST-FILTER",
    filter: "completed",
    todolistId: todolistID2,
  } as const;

  const endState = todolistsReducer(
    startState,
    changeTodolistFilterAC(todolistID2, "completed")
  );

  expect(endState[0].filter).toBe("all");
  expect(endState[1].filter).toBe(action.filter);
});

//change-title

test("correct todolist should be title changed", () => {
  const action = {
    type: "UPDATE-TODOLIST-TITLE",
    title: "New Todolist Title",
    todolistId: todolistID2,
  } as const;

  const endState = todolistsReducer(
    startState,
    updateTodolistTitleAC("New Todolist Title", todolistID2)
  );

  expect(endState[0].title).toBe("What to learn");
  expect(endState[1].title).toBe(action.title);
});
