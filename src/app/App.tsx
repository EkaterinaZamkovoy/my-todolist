import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { TaskType, Todolist } from "../components/Todolist";
import { AppRootStateType } from "./store";
import {
  addTaskAC,
  changeTaskStatusAC,
  deleteTaskAC,
  updateTaskTitleAC,
} from "../model/tasks-reducer";
import {
  addTodolistAC,
  changeTodolistFilterAC,
  deleteTodolistAC,
  updateTodolistTitleAC,
} from "../model/todolists-reducer";
import { MenuBar } from "../components/MenuBar";
import { Container } from "../components/Container";
import { AddItemForm } from "../components/AddItemForm";

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

  const todolists = useSelector<AppRootStateType, TodolistType[]>(
    (state) => state.todolists
  );

  const tasks = useSelector<AppRootStateType, TasksStateType>(
    (state) => state.tasks
  );

  const dispatch = useDispatch();

  //---

  const deleteTask = (todolistId: string, taskId: string) => {
    const action = deleteTaskAC(todolistId, taskId);
    dispatch(action);
  };

  //---

  const changeFilter = (todolistId: string, filter: FilterValuesType) => {
    const action = changeTodolistFilterAC(todolistId, filter);
    dispatch(action);
  };

  //---

  const addTask = (todolistId: string, title: string) => {
    dispatch(addTaskAC(todolistId, title));
  };

  //---

  const addTodolist = (title: string) => {
    const action = addTodolistAC(title);
    dispatch(action);
  };

  //---

  const changeTaskStatus = (
    todolistId: string,
    taskId: string,
    isDone: boolean
  ) => {
    const action = changeTaskStatusAC(todolistId, taskId, isDone);
    dispatch(action);
  };

  //---

  const updateTask = (todolistId: string, taskId: string, title: string) => {
    const action = updateTaskTitleAC(todolistId, taskId, title);
    dispatch(action);
  };

  //---

  const updateTodolist = (todolistId: string, title: string) => {
    const action = updateTodolistTitleAC(title, todolistId);
    dispatch(action);
  };

  //---

  const deleteTodolist = (todolistId: string) => {
    const action = deleteTodolistAC(todolistId);
    dispatch(action);
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
            <Container key={tl.id} className="grid-container">
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
