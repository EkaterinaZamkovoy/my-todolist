import { ChangeEvent, useState, KeyboardEvent } from "react";
import { FilterValuesType } from "../App";
import { Button } from "./Button";

type TodolistPropsType = {
  title: string;
  tasks: TaskType[];
  deleteTask: (taskId: string) => void;
  changeFilter: (filter: FilterValuesType) => void;
  addTask: (title: string) => void;
  changeTaskStatus: (taskId: string, isDone: boolean) => void;
  filter: FilterValuesType;
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
  changeTaskStatus,
  filter,
}: TodolistPropsType) => {
  //------
  const changeFilterHandler = (filter: FilterValuesType) => {
    changeFilter(filter);
  };
  //------

  const [newTaskTitle, setNewTaskTitle] = useState("");

  //---

  const [error, setError] = useState<string | null>(null);

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
    setError(null);
    if (event.key === "Enter") {
      onAddTaskHandler();
    }
  };

  //---

  return (
    <div className={"todo-list"}>
      <h3>{title}</h3>
      <div className="add-box-container">
        <div className="add-box">
          <input
            className={error ? "error" : "input-task"}
            type="text"
            value={newTaskTitle}
            onChange={onChangeNewTaskTitleHandler}
            onKeyUp={onKeyUpNewTaskTitleHandler}
          />
          <Button className="add-btn" title={"+"} onClick={onAddTaskHandler} />
        </div>
        {error && <div className={"error-message"}>{error}</div>}
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

            const onChangeTaskStatusHandler = (
              e: ChangeEvent<HTMLInputElement>
            ) => {
              const newTaskStatus = e.currentTarget.checked;
              changeTaskStatus(task.id, newTaskStatus);
            };

            //---

            return (
              <li
                key={task.id}
                className={task.isDone ? "is-done" : "todo-item"}>
                <input
                  className="checkbox"
                  type="checkbox"
                  checked={task.isDone}
                  onChange={onChangeTaskStatusHandler}
                />
                <span>{task.taskTitle}</span>
                <Button
                  className="delete-btn"
                  title={"x"}
                  onClick={deleteTaskHandler}
                />
              </li>
            );
          })}
        </ul>
      )}

      <div className="filters">
        <Button
          className={filter === "all" ? "active-filter-btn" : ""}
          title={"All"}
          onClick={() => changeFilterHandler("all")}
        />
        <Button
          className={filter === "active" ? "active-filter-btn" : ""}
          title={"Active"}
          onClick={() => changeFilterHandler("active")}
        />
        <Button
          className={filter === "completed" ? "active-filter-btn" : ""}
          title={"Completed"}
          onClick={() => changeFilterHandler("completed")}
        />
      </div>
    </div>
  );
};
