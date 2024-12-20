import { addTaskTC } from '../../../model/tasks-reducer';
import { TodolistTitle } from './TodolistTitle/TodolistTitle';

import { Tasks } from './Tasks/Tasks';
import { FilterTasksButtons } from './FilterTasksButtons/FilterTasksButtons';
import { useAppDispatch } from '../../../../../common/hooks/useAppDispatch';
import { AddItemForm } from 'common/components';
import { DomainTodolist } from 'features/todolists/model/todolists-reducer';

type TodolistPropsType = {
  todolist: DomainTodolist;
};

export const Todolist = ({ todolist }: TodolistPropsType) => {
  const dispatch = useAppDispatch();

  const addTaskCallback = (title: string) => {
    dispatch(addTaskTC({ todolistId: todolist.id, title }));
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
