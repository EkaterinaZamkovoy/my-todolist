import { ChangeEvent } from "react";
import { Button } from "./Button";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import { FilterValuesType } from "../app/App";

type TodolistPropsType = {
  todolistId: string;
  title: string;
  tasks: TaskType[];
  deleteTask: (todolistId: string, taskId: string) => void;
  changeFilter: (todolistId: string, filter: FilterValuesType) => void;
  addTask: (todolistId: string, title: string) => void;
  changeTaskStatus: (
    todolistId: string,
    taskId: string,
    isDone: boolean
  ) => void;
  updateTask: (todolistId: string, taskId: string, title: string) => void;
  filter: FilterValuesType;
  updateTodolist: (todolistId: string, title: string) => void;
  deleteTodolist: (todolistId: string) => void;
};

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export const Todolist = ({
  title,
  todolistId,
  tasks,
  deleteTask,
  changeFilter,
  addTask,
  changeTaskStatus,
  filter,
  deleteTodolist,
  updateTask,
  updateTodolist,
}: TodolistPropsType) => {
  //------
  const changeFilterHandler = (filter: FilterValuesType) => {
    changeFilter(todolistId, filter);
  };
  //------

  const addTaskCallback = (title: string) => {
    addTask(todolistId, title);
  };

  //---

  const deleteTodolistHandler = () => {
    deleteTodolist(todolistId);
  };

  //---

  const updateTodolistHandler = (title: string) => {
    updateTodolist(todolistId, title);
  };

  return (
    <div className={"todo-list"}>
      <div className="todo-list-title-block">
        <EditableSpan
          value={title}
          onChange={updateTodolistHandler}
          className="editableSpan"
        />
        {/* <h3>{title}</h3> */}
        <Button
          onClick={deleteTodolistHandler}
          className="delete-todo-list-btn"
        />
      </div>
      <AddItemForm addItem={addTaskCallback} />
      <div className="tasks">
        {tasks.length === 0 ? (
          <p>Тасок нет</p>
        ) : (
          <ul>
            {tasks.map((task) => {
              //-----

              const ChangeTaskTitleHandler = (title: string) => {
                updateTask(todolistId, task.id, title);
              };

              const deleteTaskHandler = () => {
                deleteTask(todolistId, task.id);
              };

              //-----

              const onChangeTaskStatusHandler = (
                e: ChangeEvent<HTMLInputElement>
              ) => {
                const newTaskStatus = e.currentTarget.checked;
                changeTaskStatus(todolistId, task.id, newTaskStatus);
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
                  <EditableSpan
                    className="task"
                    value={task.title}
                    onChange={ChangeTaskTitleHandler}
                  />
                  <Button
                    className={"delete-todo-list-btn delete-btn"}
                    onClick={deleteTaskHandler}
                  />
                </li>
              );
            })}
          </ul>
        )}
      </div>
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
