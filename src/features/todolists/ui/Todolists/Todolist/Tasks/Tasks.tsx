import { Task } from './Task/Task';
import { TaskStatus } from 'common/enums/enums';
import { useGetTasksQuery } from 'features/todolists/api/tasksApi';
import { DomainTodolist } from 'features/todolists/lib/types/types';
import { TasksSkeleton } from 'features/todolists/ui/skeletons/TasksSkeleton/TasksSkeleton';

type TasksProps = {
  todolist: DomainTodolist;
};

export const Tasks = ({ todolist }: TasksProps) => {
  const { data, isLoading } = useGetTasksQuery({
    todolistId: todolist.id,
    args: { count: 4, page: 1 },
  });

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

  if (isLoading) {
    return <TasksSkeleton />;
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
