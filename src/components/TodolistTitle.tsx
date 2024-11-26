import { useDispatch } from 'react-redux';
import {
  deleteTodolistAC,
  TodolistType,
  updateTodolistTitleAC,
} from '../model/todolists-reducer';
import { Button } from './Button';
import { EditableSpan } from './EditableSpan';

type TodolistTitleProps = {
  todolist: TodolistType;
};

export const TodolistTitle = ({ todolist }: TodolistTitleProps) => {
  const { title, id } = todolist;

  const dispatch = useDispatch();

  const deleteTodolistHandler = () => {
    dispatch(deleteTodolistAC(id));
  };

  const updateTodolistHandler = (title: string) => {
    dispatch(updateTodolistTitleAC(id, title));
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
