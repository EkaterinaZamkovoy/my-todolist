import { Button } from '../../../../../../common/components/Button/Button';
import { useAppDispatch } from '../../../../../../common/hooks/useAppDispatch';
import { EditableSpan } from 'common/components';
import {
  todolistsApi,
  useRemoveTodolistMutation,
  useUpdateTodolistTitleMutation,
} from 'features/todolists/api/todolistsApi';
import { RequestStatus } from 'app/appSlice';
import { DomainTodolist } from 'features/todolists/lib/types/types';

type TodolistTitleProps = {
  todolist: DomainTodolist;
};

export const TodolistTitle = ({ todolist }: TodolistTitleProps) => {
  const { title, id, entityStatus } = todolist;

  const dispatch = useAppDispatch();

  const [removeTodolist] = useRemoveTodolistMutation();

  const [updateTodolistTitle] = useUpdateTodolistTitleMutation();

  const updateQueryData = (status: RequestStatus) => {
    dispatch(
      todolistsApi.util.updateQueryData('getTodolists', undefined, state => {
        const index = state.findIndex(tl => tl.id === id);
        if (index !== -1) {
          state[index].entityStatus = status;
        }
      })
    );
  };

  const deleteTodolistHandler = () => {
    updateQueryData('loading');
    removeTodolist(id)
      .unwrap()
      .catch(() => {
        updateQueryData('idle');
      });
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
