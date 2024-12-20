import { ChangeEvent } from 'react';
import { useAppDispatch } from 'common/hooks/useAppDispatch';

import {
  deleteTaskTC,
  updateTaskTC,
} from 'features/todolists/model/tasks-reducer';
import { EditableSpan } from 'common/components/EditableSpan';
import { Button } from 'common/components';
import { DomainTodolist } from 'features/todolists/model/todolists-reducer';
import { DomainTask } from 'features/todolists/api/tasksApi.types';
import { TaskStatus } from 'common/enums/enums';

type TaskProps = {
  task: DomainTask;
  todolist: DomainTodolist;
};

export const Task = ({ task, todolist }: TaskProps) => {
  const dispatch = useAppDispatch();

  const deleteTaskHandler = () => {
    dispatch(deleteTaskTC({ taskId: task.id, todolistId: todolist.id }));
  };

  const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let status = e.currentTarget.checked
      ? TaskStatus.Completed
      : TaskStatus.New;
    dispatch(
      updateTaskTC({
        taskId: task.id,
        todolistId: todolist.id,
        domainModel: { status },
      })
    );
  };

  const changeTaskTitleHandler = (title: string) => {
    dispatch(
      updateTaskTC({
        taskId: task.id,
        todolistId: todolist.id,
        domainModel: { title },
      })
    );
  };

  return (
    <li key={task.id} className={task.status ? 'is-done' : 'todo-item'}>
      <input
        className='checkbox'
        type='checkbox'
        checked={task.status === TaskStatus.Completed}
        onChange={onChangeTaskStatusHandler}
      />
      <EditableSpan
        className='task'
        value={task.title}
        onChange={changeTaskTitleHandler}
      />
      <Button
        className={'delete-todo-list-btn delete-btn'}
        onClick={deleteTaskHandler}
      />
    </li>
  );
};
