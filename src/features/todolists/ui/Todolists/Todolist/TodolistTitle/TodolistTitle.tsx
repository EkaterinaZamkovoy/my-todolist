import {
  deleteTodolistAC,
  DomainTodolist,
  removeTodolistTC,
  updateTodolistTitleAC,
  updateTodolistTitleTC,
} from '../../../../model/todolists-reducer';

import { Button } from '../../../../../../common/components/Button/Button';
import { useAppDispatch } from '../../../../../../common/hooks/useAppDispatch';
import { EditableSpan } from 'common/components';

type TodolistTitleProps = {
  todolist: DomainTodolist;
};

export const TodolistTitle = ({ todolist }: TodolistTitleProps) => {
  const { title, id } = todolist;

  const dispatch = useAppDispatch();

  const deleteTodolistHandler = () => {
    dispatch(removeTodolistTC(id));
  };

  const updateTodolistHandler = (title: string) => {
    dispatch(updateTodolistTitleTC({ id, title }));
  };
  return (
    <div className='todo-list-title-block'>
      <EditableSpan
        value={todolist.title}
        onChange={updateTodolistHandler}
        className='editableSpan'
      />
      <Button
        onClick={deleteTodolistHandler}
        className='delete-todo-list-btn'
      />
    </div>
  );
};
