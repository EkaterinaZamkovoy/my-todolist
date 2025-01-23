import { Task } from './Task/Task';
import { useAppSelector } from '../../../../../../common/hooks/useAppSelector';
import { DomainTodolist } from 'features/todolists/model/todolistSlice';
import { useEffect } from 'react';
import { fetchTasksTC, selectTasks } from 'features/todolists/model/tasksSlice';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { TaskStatus } from 'common/enums/enums';
import { useGetTasksQuery } from 'features/todolists/api/tasksApi';

type TasksProps = {
  todolist: DomainTodolist;
};

export const Tasks = ({ todolist }: TasksProps) => {
  const { data } = useGetTasksQuery(todolist.id);

  // Фильтрация задач

  let tasksForTodolist = data?.items;

  if (todolist.filter === 'active') {
    tasksForTodolist = tasksForTodolist?.filter(
      task => task.status === TaskStatus.New
    );
  }

  if (todolist.filter === 'completed') {
    tasksForTodolist = tasksForTodolist?.filter(
      task => task.status === TaskStatus.Completed
    );
  }

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
