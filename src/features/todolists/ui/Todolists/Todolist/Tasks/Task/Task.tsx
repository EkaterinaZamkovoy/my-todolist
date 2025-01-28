import { ChangeEvent } from 'react';
import { EditableSpan } from 'common/components/EditableSpan';
import { Button } from 'common/components';
import { DomainTask } from 'features/todolists/api/tasksApi.types';
import { TaskStatus } from 'common/enums/enums';
import {
  useRemoveTaskMutation,
  useUpdateTaskMutation,
} from 'features/todolists/api/tasksApi';
import { createTaskModel } from 'features/todolists/lib/utils/createTaskModel';
import { DomainTodolist } from 'features/todolists/lib/types/types';

type TaskProps = {
  task: DomainTask;
  todolist: DomainTodolist;
  disabled?: boolean;
};

export const Task = ({ task, todolist, disabled }: TaskProps) => {
  const [removeTask] = useRemoveTaskMutation();

  const [updateTask] = useUpdateTaskMutation();

  const deleteTaskHandler = () => {
    removeTask({ taskId: task.id, todolistId: todolist.id });
  };

  const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let status = e.currentTarget.checked
      ? TaskStatus.Completed
      : TaskStatus.New;

    const model = createTaskModel(task, { status });
    updateTask({
      taskId: task.id,
      todolistId: todolist.id,
      model,
    });
  };

  const changeTaskTitleHandler = (title: string) => {
    const model = createTaskModel(task, { title });
    updateTask({
      taskId: task.id,
      todolistId: todolist.id,
      model,
    });
  };

  return (
    <li key={task.id} className={task.status ? 'is-done' : 'todo-item'}>
      <input
        className='checkbox'
        type='checkbox'
        checked={task.status === TaskStatus.Completed}
        onChange={onChangeTaskStatusHandler}
        disabled={disabled}
      />
      <EditableSpan
        className='task'
        value={task.title}
        onChange={changeTaskTitleHandler}
        disabled={disabled}
      />
      <Button
        className={'delete-todo-list-btn delete-btn'}
        onClick={deleteTaskHandler}
        disabled={disabled}
      />
    </li>
  );
};
