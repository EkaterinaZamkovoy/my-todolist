import {
  changeTodolistFilterAC,
  FilterValuesType,
  TodolistType,
} from '../../../../model/todolists-reducer';
import { Button } from '../../../../../../common/components/Button/Button';
import { useAppDispatch } from '../../../../../../common/hooks/useAppDispatch';

type FilterTasksButtonsProps = {
  todolist: TodolistType;
};

export const FilterTasksButtons = ({ todolist }: FilterTasksButtonsProps) => {
  const { filter, id } = todolist;
  const dispatch = useAppDispatch();
  //------
  const changeFilterHandler = (filter: FilterValuesType) => {
    dispatch(changeTodolistFilterAC(id, filter));
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
