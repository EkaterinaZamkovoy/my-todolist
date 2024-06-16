import { ChangeEvent, useState, KeyboardEvent } from "react";
import { FilterValuesType } from "../App";
import { Button } from "./Button";

type TodolistPropsType = {
  title: string;
  tasks: TaskType[];
  deleteTask: (taskId: string) => void;
  changeFilter: (filter: FilterValuesType) => void;
  addTask: (title: string) => void;
};

export type TaskType = {
  id: string;
  taskTitle: string;
  isDone: boolean;
};

export const Todolist = ({
  title,
  tasks,
  deleteTask,
  changeFilter,
  addTask,
}: TodolistPropsType) => {
  //------
  const changeFilterHandler = (filter: FilterValuesType) => {
    changeFilter(filter);
  };
  //------

  const [newTaskTitle, setNewTaskTitle] = useState("");

  //---

  const [error, setError] = useState("");

  const onAddTaskHandler = () => {
    if (newTaskTitle.trim() !== "") {
      addTask(newTaskTitle);
      setNewTaskTitle("");
    } else {
      setError("Title is required");
    }
  };

  //---
  const onChangeNewTaskTitleHandler = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setNewTaskTitle(event.currentTarget.value);
  };

  //---

  const onKeyUpNewTaskTitleHandler = (
    event: KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      onAddTaskHandler();
    }
  };

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input
          type="text"
          value={newTaskTitle}
          onChange={onChangeNewTaskTitleHandler}
          onKeyUp={onKeyUpNewTaskTitleHandler}
        />
        <Button title={"+"} onClick={onAddTaskHandler} />
        {error && <div>{error}</div>}
      </div>
      {tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <ul>
          {tasks.map((task) => {
            //-----
            const deleteTaskHandler = () => {
              deleteTask(task.id);
            };
            //-----

            return (
              <li key={task.id}>
                <input type="checkbox" checked={task.isDone} />
                <span>{task.taskTitle}</span>
                <Button title={"x"} onClick={deleteTaskHandler} />
              </li>
            );
          })}
        </ul>
      )}

      <div>
        <Button title={"All"} onClick={() => changeFilterHandler("all")} />
        <Button
          title={"Active"}
          onClick={() => changeFilterHandler("active")}
        />
        <Button
          title={"Completed"}
          onClick={() => changeFilterHandler("completed")}
        />
      </div>
    </div>
  );
};
