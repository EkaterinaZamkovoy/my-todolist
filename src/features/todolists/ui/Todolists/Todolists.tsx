import { Container } from '../../../../common/components/Container/Container';
import { Todolist } from './Todolist/Todolist';
import { useAppSelector } from '../../../../common/hooks/useAppSelector';
import { AppRootStateType } from '../../../../app/store';
import { selectTodolist } from '../../model/todolistsSelectors';
import { useEffect } from 'react';
import { todolistsApi } from 'features/todolists/api/todolistsApi';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { fetchTodolistsTC } from 'features/todolists/model/todolistSlice';

export const Todolists = () => {
  // Получение данных из состояния
  const todolists = useAppSelector(selectTodolist);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTodolistsTC());
  }, []);

  return (
    <>
      {todolists.map(tl => {
        return (
          <Container key={tl.id} className='grid-container'>
            <Todolist todolist={tl} />
          </Container>
        );
      })}
    </>
  );
};
