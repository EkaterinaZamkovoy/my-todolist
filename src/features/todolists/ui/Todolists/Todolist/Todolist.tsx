import { TodolistTitle } from './TodolistTitle/TodolistTitle';
import { Tasks } from './Tasks/Tasks';
import { FilterTasksButtons } from './FilterTasksButtons/FilterTasksButtons';
import { AddItemForm } from 'common/components';
import { useAddTaskMutation } from 'features/todolists/api/tasksApi';
import { DomainTodolist } from 'features/todolists/lib/types/types';

type TodolistPropsType = {
  todolist: DomainTodolist;
};

export const Todolist = ({ todolist }: TodolistPropsType) => {
  const [addTask] = useAddTaskMutation();

  const addTaskCallback = (title: string) => {
    addTask({ todolistId: todolist.id, title });
  };

  return (
    <div className={'todo-list'}>
      <TodolistTitle todolist={todolist} />
      <AddItemForm
        addItem={addTaskCallback}
        disabled={todolist.entityStatus === 'loading'}
      />
      <Tasks todolist={todolist} />
      <FilterTasksButtons todolist={todolist} />
    </div>
  );
};
