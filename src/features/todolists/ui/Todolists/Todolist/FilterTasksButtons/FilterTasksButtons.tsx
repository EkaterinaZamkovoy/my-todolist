
import { DomainTodolist, FilterValues } from 'features/todolists/lib/types/types';
import { Button } from '../../../../../../common/components/Button/Button';
import { useAppDispatch } from '../../../../../../common/hooks/useAppDispatch';
import { todolistsApi } from 'features/todolists/api/todolistsApi';

type FilterTasksButtonsProps = {
  todolist: DomainTodolist;
};

export const FilterTasksButtons = ({ todolist }: FilterTasksButtonsProps) => {
  const { filter, id } = todolist;
  const dispatch = useAppDispatch();
  //------
  const changeFilterHandler = (filter: FilterValues) => {
    dispatch(
      todolistsApi.util.updateQueryData('getTodolists', undefined, state => {
        const index = state.findIndex(tl => tl.id === id);
        if (index !== -1) {
          state[index].filter = filter;
        }
      })
    );
  };
  return (
    <div className='filters'>
      <Button
        className={filter === 'all' ? 'active-filter-btn' : ''}
        title={'All'}
        onClick={() => changeFilterHandler('all')}
      />
      <Button
        className={filter === 'active' ? 'active-filter-btn' : ''}
        title={'Active'}
        onClick={() => changeFilterHandler('active')}
      />
      <Button
        className={filter === 'completed' ? 'active-filter-btn' : ''}
        title={'Completed'}
        onClick={() => changeFilterHandler('completed')}
      />
    </div>
  );
};
