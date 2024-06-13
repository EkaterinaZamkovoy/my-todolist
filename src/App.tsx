import React, { useState } from "react";
import { TaskType, Todolist } from "./components/Todolist";
import { v1 } from "uuid";

export type FilterValuesType = "all" | "active" | "completed";

function App() {
  //---
  let [tasks, setTasks] = useState<TaskType[]>([
    { id: v1(), taskTitle: "HTML&CSS", isDone: true },
    { id: v1(), taskTitle: "JS", isDone: true },
    { id: v1(), taskTitle: "React", isDone: false },
  ]);

  //---

  let [filter, setFilter] = useState<FilterValuesType>("all");

  let tasksForTodolist = tasks;

  if (filter === "active") {
    tasksForTodolist = tasks.filter((task) => !task.isDone);
  }
  if (filter === "completed") {
    tasksForTodolist = tasks.filter((task) => task.isDone);
  }

  //---

  const deleteTask = (taskId: string) => {
    let filtredTasks = tasks.filter((task) => {
      return task.id !== taskId;
    });
    setTasks(filtredTasks);
  };

  //---

  const changeFilter = (filter: FilterValuesType) => {
    setFilter(filter);
  };

  return (
    <div className="App">
      <Todolist
        title={"What to learn"}
        tasks={tasksForTodolist}
        deleteTask={deleteTask}
        changeFilter={changeFilter}
      />
    </div>
  );
}

export default App;
