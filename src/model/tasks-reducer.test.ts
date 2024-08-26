import { v1 } from "uuid";
import { TasksStateType } from "../App";
import {
  addTaskAC,
  changeTaskStatusAC,
  deleteTaskAC,
  tasksReducer,
  updateTaskTitleAC,
} from "./tasks-reducer";
import { addTodolistAC, deleteTodolistAC } from "./todolists-reducer";

// removeTask

test("the correct task must be removed from the correct array", () => {
  const startState: TasksStateType = {
    todolistID1: [
      { id: "1", title: "HTML&CSS", isDone: true },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "ReactJS", isDone: false },
    ],
    todolistID2: [
      { id: "1", title: "Rest API", isDone: true },
      { id: "2", title: "GraphQL", isDone: false },
    ],
  };

  const action = deleteTaskAC("todolistID2", "2");
  const endState = tasksReducer(startState, action);

  expect(endState).toEqual({
    todolistID1: [
      { id: "1", title: "HTML&CSS", isDone: true },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "ReactJS", isDone: false },
    ],
    todolistID2: [{ id: "1", title: "Rest API", isDone: true }],
  });
});

// addTask

test("adding task to correct array", () => {
  const startState: TasksStateType = {
    todolistID1: [
      { id: "1", title: "HTML&CSS", isDone: true },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "ReactJS", isDone: false },
    ],
    todolistID2: [
      { id: "1", title: "Rest API", isDone: true },
      { id: "2", title: "GraphQL", isDone: false },
    ],
  };

  const action = addTaskAC("todolistID2", "CSS");
  const endState = tasksReducer(startState, action);

  expect(endState["todolistID1"].length).toBe(3);
  expect(endState["todolistID2"].length).toBe(3);
  expect(endState["todolistID2"][0].id).toBeDefined();
  expect(endState["todolistID2"][0].title).toBe("CSS");
  expect(endState["todolistID2"][0].isDone).toBe(false);
});

//taskStatus

test("the status of a specific task must be changed", () => {
  const startState: TasksStateType = {
    todolistID1: [
      { id: "1", title: "HTML&CSS", isDone: true },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "ReactJS", isDone: false },
    ],
    todolistID2: [
      { id: "1", title: "Rest API", isDone: true },
      { id: "2", title: "GraphQL", isDone: false },
    ],
  };

  const action = changeTaskStatusAC("todolistID1", "1", false);
  const endState = tasksReducer(startState, action);

  expect(endState["todolistID1"][0].isDone).toBe(false);
  expect(endState["todolistID2"][0].isDone).toBe(true);
});

//updateTaskTitle

test("the title of a specific task must be changed", () => {
  const startState: TasksStateType = {
    todolistID1: [
      { id: "1", title: "HTML&CSS", isDone: true },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "ReactJS", isDone: false },
    ],
    todolistID2: [
      { id: "1", title: "Rest API", isDone: true },
      { id: "2", title: "GraphQL", isDone: false },
    ],
  };

  const action = updateTaskTitleAC("todolistID1", "1", "Test");
  const endState = tasksReducer(startState, action);

  expect(endState["todolistID1"][0].title).toBe("Test");
  expect(endState["todolistID2"][0].title).toBe("Rest API");
});

//delete tasks from remote todolist

test("property with todolistId should be deleted", () => {
  const startState: TasksStateType = {
    todolistId1: [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false },
    ],
    todolistId2: [
      { id: "1", title: "bread", isDone: false },
      { id: "2", title: "milk", isDone: true },
      { id: "3", title: "tea", isDone: false },
    ],
  };

  const action = deleteTodolistAC("todolistId2");

  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState["todolistId2"]).not.toBeDefined();
});
