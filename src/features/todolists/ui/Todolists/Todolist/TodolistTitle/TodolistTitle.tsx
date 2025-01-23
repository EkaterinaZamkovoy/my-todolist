import {
  DomainTodolist,
  removeTodolistTC,
  updateTodolistTitleTC,
} from '../../../../model/todolistSlice';

import { Button } from '../../../../../../common/components/Button/Button';
import { useAppDispatch } from '../../../../../../common/hooks/useAppDispatch';
import { EditableSpan } from 'common/components';
import {
  useRemoveTodolistMutation,
  useUpdateTodolistTitleMutation,
} from 'features/todolists/api/todolistsApi';

type TodolistTitleProps = {
  todolist: DomainTodolist;
};

export const TodolistTitle = ({ todolist }: TodolistTitleProps) => {
  const { title, id, entityStatus } = todolist;

  const [removeTodolist] = useRemoveTodolistMutation();

  const [updateTodolistTitle] = useUpdateTodolistTitleMutation();

  const deleteTodolistHandler = () => {
    removeTodolist(id);
  };

  const updateTodolistHandler = (title: string) => {
    updateTodolistTitle({ id, title });
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
        disabled={entityStatus === 'loading'}
      />
    </div>
  );
};
