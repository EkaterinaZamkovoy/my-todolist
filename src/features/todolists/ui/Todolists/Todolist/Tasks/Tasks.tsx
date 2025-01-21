import { Task } from './Task/Task';
import { useAppSelector } from '../../../../../../common/hooks/useAppSelector';
import { DomainTodolist } from 'features/todolists/model/todolistSlice';
import { useEffect } from 'react';
import { fetchTasksTC, selectTasks } from 'features/todolists/model/tasksSlice';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { TaskStatus } from 'common/enums/enums';

type TasksProps = {
  todolist: DomainTodolist;
};

export const Tasks = ({ todolist }: TasksProps) => {
  const tasks = useAppSelector(selectTasks);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTasksTC(todolist.id));
  }, []);

  // Фильтрация задач

  const allTodolistTasks = tasks[todolist.id];

  let tasksForTodolist = allTodolistTasks;

  tasksForTodolist =
    todolist.filter === 'active'
      ? allTodolistTasks.filter(t => t.status === TaskStatus.New)
      : todolist.filter === 'completed'
      ? allTodolistTasks.filter(t => t.status === TaskStatus.Completed)
      : allTodolistTasks;

  return (
    <div className='tasks'>
      {tasksForTodolist?.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <ul>
          {tasksForTodolist?.map(task => {
            return <Task key={task.id} todolist={todolist} task={task} />;
          })}
        </ul>
      )}
    </div>
  );
};
