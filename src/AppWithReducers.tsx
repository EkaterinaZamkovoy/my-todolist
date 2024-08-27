import React, { useReducer, useState } from "react";
import { TaskType, Todolist } from "./components/Todolist";
import { v1 } from "uuid";
import "./App.css";
import { AddItemForm } from "./components/AddItemForm";
import { Container } from "./components/Container";
import { MenuBar } from "./components/MenuBar";
import {
  addTodolistAC,
  changeTodolistFilterAC,
  deleteTodolistAC,
  todolistsReducer,
  updateTodolistTitleAC,
} from "./model/todolists-reducer";
import {
  addTaskAC,
  changeTaskStatusAC,
  deleteTaskAC,
  tasksReducer,
  updateTaskTitleAC,
} from "./model/tasks-reducer";

export type TodolistType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

export type TasksStateType = {
  [key: string]: TaskType[];
};

export type FilterValuesType = "all" | "active" | "completed";

function AppWithReducers() {
  //---

  let todolistID1 = v1();
  let todolistID2 = v1();

  let [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
    { id: todolistID1, title: "What to learn", filter: "all" },
    { id: todolistID2, title: "What to buy", filter: "all" },
  ]);

  let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
    [todolistID1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: false },
    ],
    [todolistID2]: [
      { id: v1(), title: "Rest API", isDone: true },
      { id: v1(), title: "GraphQL", isDone: false },
    ],
  });

  //---

  const deleteTask = (todolistId: string, taskId: string) => {
    const action = deleteTaskAC(todolistId, taskId);
    dispatchToTasks(action);
  };

  //---

  const changeFilter = (todolistId: string, filter: FilterValuesType) => {
    const action = changeTodolistFilterAC(todolistId, filter);
    dispatchToTodolists(action);
  };

  //---

  const addTask = (todolistId: string, title: string) => {
    const newTask = {
      id: v1(),
      title: title,
      isDone: false,
    };
    dispatchToTasks(addTaskAC(todolistId, title));
  };

  //---

  const addTodolist = (title: string) => {
    const action = addTodolistAC(title);
    dispatchToTodolists(action);
    dispatchToTasks(action);
  };

  //---

  const changeTaskStatus = (
    todolistId: string,
    taskId: string,
    isDone: boolean
  ) => {
    const action = changeTaskStatusAC(todolistId, taskId, isDone);
    dispatchToTasks(action);
  };

  //---

  const updateTask = (todolistId: string, taskId: string, title: string) => {
    const action = updateTaskTitleAC(todolistId, taskId, title);
    dispatchToTasks(action);
  };

  //---

  const updateTodolist = (todolistId: string, title: string) => {
    const action = updateTodolistTitleAC(title, todolistId);
    dispatchToTodolists(action);
  };

  //---

  const deleteTodolist = (todolistId: string) => {
    const action = deleteTodolistAC(todolistId);
    dispatchToTodolists(action);
    dispatchToTasks(action);
  };

  return (
    <div className="App">
      <MenuBar />
      <Container className="main-add-form-container">
        <AddItemForm addItem={addTodolist} />
      </Container>
      <Container className="main-container">
        {todolists.map((tl) => {
          //---

          const allTodolistTasks = tasks[tl.id];

          let tasksForTodolist = allTodolistTasks;

          if (tl.filter === "active") {
            tasksForTodolist = allTodolistTasks.filter((t) => !t.isDone);
          }
          if (tl.filter === "completed") {
            tasksForTodolist = allTodolistTasks.filter((t) => t.isDone);
          }

          //---

          return (
            <Container className="grid-container">
              <Todolist
                todolistId={tl.id}
                key={tl.id}
                title={tl.title}
                tasks={tasksForTodolist}
                deleteTask={deleteTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                filter={tl.filter}
                deleteTodolist={deleteTodolist}
                updateTask={updateTask}
                updateTodolist={updateTodolist}
              />
            </Container>
          );
        })}
      </Container>
    </div>
  );
}

export default AppWithReducers;
