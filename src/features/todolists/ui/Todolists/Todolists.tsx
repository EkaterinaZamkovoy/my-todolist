import { Container } from '../../../../common/components/Container/Container';
import { Todolist } from './Todolist/Todolist';
import { useAppSelector } from '../../../../common/hooks/useAppSelector';
import { AppRootStateType } from '../../../../app/store';
import { selectTodolist } from '../../model/todolistsSelectors';

export const Todolists = () => {
  // Получение данных из состояния
  const todolists = useAppSelector(selectTodolist);

  return (
    <>
      {todolists.map(tl => {
        return (
          <Container key={tl.id} className='grid-container'>
            <Todolist todolist={tl} key={tl.id} />
          </Container>
        );
      })}
    </>
  );
};
