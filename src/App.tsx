import React, { useState } from "react";
import { TaskType, Todolist } from "./components/Todolist";
import { v1 } from "uuid";
import "./App.css";

export type TodolistType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

type TasksStateType = {
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

  return (
    <div className="App">
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
          />
        );
      })}
    </div>
  );
}

export default App;
