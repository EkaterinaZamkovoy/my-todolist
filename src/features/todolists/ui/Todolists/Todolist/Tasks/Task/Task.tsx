import { ChangeEvent } from 'react';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { TodolistType } from 'features/todolists/model/todolists-reducer';
import {
  changeTaskStatusAC,
  deleteTaskAC,
  TaskType,
  updateTaskTitleAC,
} from 'features/todolists/model/tasks-reducer';
import { EditableSpan } from 'common/components/EditableSpan';
import { Button } from 'common/components';

type TaskProps = {
  task: TaskType;
  todolist: TodolistType;
};

export const Task = ({ task, todolist }: TaskProps) => {
  const dispatch = useAppDispatch();

  const ChangeTaskTitleHandler = (title: string) => {
    dispatch(updateTaskTitleAC(todolist.id, task.id, title));
  };

  const deleteTaskHandler = () => {
    dispatch(deleteTaskAC(todolist.id, task.id));
  };

  const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const newTaskStatus = e.currentTarget.checked;
    dispatch(changeTaskStatusAC(todolist.id, task.id, newTaskStatus));
  };

  return (
    <li key={task.id} className={task.isDone ? 'is-done' : 'todo-item'}>
      <input
        className='checkbox'
        type='checkbox'
        checked={task.isDone}
        onChange={onChangeTaskStatusHandler}
      />
      <EditableSpan
        className='task'
        value={task.title}
        onChange={ChangeTaskTitleHandler}
      />
      <Button
        className={'delete-todo-list-btn delete-btn'}
        onClick={deleteTaskHandler}
      />
    </li>
  );
};
