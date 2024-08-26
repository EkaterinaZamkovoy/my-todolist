import React, { useState } from "react";
import { TaskType, Todolist } from "./components/Todolist";
import { v1 } from "uuid";
import "./App.css";
import { AddItemForm } from "./components/AddItemForm";
import { Container } from "./components/Container";
import { MenuBar } from "./components/MenuBar";

export type TodolistType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

export type TasksStateType = {
  [key: string]: TaskType[];
};

export type FilterValuesType = "all" | "active" | "completed";

function App() {
  //---

  let todolistID1 = v1();
  let todolistID2 = v1();

  let [todolists, setTodolists] = useState<TodolistType[]>([
    { id: todolistID1, title: "What to learn", filter: "all" },
    { id: todolistID2, title: "What to buy", filter: "all" },
  ]);

  let [tasks, setTasks] = useState<TasksStateType>({
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
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].filter((task) => task.id !== taskId),
    });
  };

  //---

  const changeFilter = (todolistId: string, filter: FilterValuesType) => {
    setTodolists(
      todolists.map((tl) => {
        return tl.id === todolistId ? { ...tl, filter } : tl;
      })
    );
  };

  //---

  const addTask = (todolistId: string, title: string) => {
    const newTask = {
      id: v1(),
      title: title,
      isDone: false,
    };
    setTasks({ ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] });
  };

  //---

  const addTodolist = (title: string) => {
    const todolistID = v1();
    const newTodolist: TodolistType = {
      id: todolistID,
      title: title,
      filter: "all",
    };
    setTodolists([newTodolist, ...todolists]);
    setTasks({ ...tasks, [todolistID]: [] });
  };

  //---

  const changeTaskStatus = (
    todolistId: string,
    taskId: string,
    isDone: boolean
  ) => {
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].map((task) =>
        task.id === taskId ? { ...task, isDone } : task
      ),
    });
  };

  //---

  const updateTask = (todolistId: string, taskId: string, title: string) => {
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].map((t) =>
        t.id === taskId ? { ...t, title } : t
      ),
    });
  };

  //---

  const updateTodolist = (todolistId: string, title: string) => {
    setTodolists([
      ...todolists.map((tl) => (tl.id === todolistId ? { ...tl, title } : tl)),
    ]);
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

          const deleteTodolist = (todolistId: string) => {
            const newTodolist = todolists.filter((tl) => tl.id !== todolistId);
            setTodolists(newTodolist);
            delete tasks[todolistId];
            setTasks({ ...tasks });
          };

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

export default App;
