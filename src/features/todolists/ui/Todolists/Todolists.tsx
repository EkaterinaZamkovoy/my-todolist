import { Container } from '../../../../common/components/Container/Container';
import { Todolist } from './Todolist/Todolist';
import { useAppSelector } from '../../../../common/hooks/useAppSelector';
import { useEffect } from 'react';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { DomainTodolist, fetchTodolistsTC, selectTodolists } from 'features/todolists/model/todolistSlice';
import { TasksStateType } from 'features/todolists/model/tasksSlice';
import { RequestStatus } from 'app/appSlice';

export const Todolists = () => {
  // Получение данных из состояния
  const todolists = useAppSelector(selectTodolists);

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


