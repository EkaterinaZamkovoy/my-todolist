import { TodolistType } from '../model/todolists-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from '../app/store';
import {
  changeTaskStatusAC,
  deleteTaskAC,
  TasksStateType,
  updateTaskTitleAC,
} from '../model/tasks-reducer';
import { Task } from './Task';

type TasksProps = {
  todolist: TodolistType;
};

export const Tasks = ({ todolist }: TasksProps) => {
  const tasks = useSelector<AppRootStateType, TasksStateType>(
    state => state.tasks
  );

  // Фильтрация задач

  const allTodolistTasks = tasks[todolist.id];

  let tasksForTodolist = allTodolistTasks;

  tasksForTodolist =
    todolist.filter === 'active'
      ? allTodolistTasks.filter(t => !t.isDone)
      : todolist.filter === 'completed'
      ? allTodolistTasks.filter(t => t.isDone)
      : allTodolistTasks;

  return (
    <div className='tasks'>
      {tasksForTodolist.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <ul>
          {tasksForTodolist.map(task => {
            return <Task todolist={todolist} task={task} />;
          })}
        </ul>
      )}
    </div>
  );
};
