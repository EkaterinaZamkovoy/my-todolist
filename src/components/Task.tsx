import { useDispatch } from 'react-redux';
import {
  changeTaskStatusAC,
  deleteTaskAC,
  TaskType,
  updateTaskTitleAC,
} from '../model/tasks-reducer';
import { TodolistType } from '../model/todolists-reducer';
import { ChangeEvent } from 'react';
import { EditableSpan } from './EditableSpan';
import { Button } from './Button';

type TaskProps = {
  task: TaskType;
  todolist: TodolistType;
};

export const Task = ({ task, todolist }: TaskProps) => {
  const dispatch = useDispatch();

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
