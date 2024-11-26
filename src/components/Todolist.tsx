import { AddItemForm } from './AddItemForm';
import { TodolistType } from '../model/todolists-reducer';
import { FilterTasksButtons } from './FilterTasksButtons';
import { Tasks } from './Tasks';
import { TodolistTitle } from './TodolistTitle';
import { addTaskAC } from '../model/tasks-reducer';
import { useDispatch } from 'react-redux';

type TodolistPropsType = {
  todolist: TodolistType;
};

export const Todolist = ({ todolist }: TodolistPropsType) => {
  const dispatch = useDispatch();

  const addTaskCallback = (title: string) => {
    dispatch(addTaskAC(todolist.id, title));
  };

  return (
    <div className={'todo-list'}>
      <TodolistTitle todolist={todolist} />
      <AddItemForm addItem={addTaskCallback} />
      <Tasks todolist={todolist} />
      <FilterTasksButtons todolist={todolist} />
    </div>
  );
};
