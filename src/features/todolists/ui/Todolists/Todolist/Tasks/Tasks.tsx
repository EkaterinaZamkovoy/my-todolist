import { TodolistType } from '../../../../model/todolists-reducer';
import { Task } from './Task/Task';
import { useAppSelector } from '../../../../../../common/hooks/useAppSelector';
import { selectTasks } from '../../../../model/tasksSelectors';

type TasksProps = {
  todolist: TodolistType;
};

export const Tasks = ({ todolist }: TasksProps) => {
  const tasks = useAppSelector(selectTasks);

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
