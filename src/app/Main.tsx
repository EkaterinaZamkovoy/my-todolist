import { Container } from '../common/components/Container/Container';
import { addTodolistAC } from '../features/todolists/model/todolists-reducer';
import { Todolists } from '../features/todolists/ui/Todolists/Todolists';
import { useAppDispatch } from '../common/hooks/useAppDispatch';
import { AddItemForm } from 'common/components';

export const Main = () => {
  const dispatch = useAppDispatch();

  const addTodolist = (title: string) => {
    const action = addTodolistAC(title);
    dispatch(action);
  };

  return (
    <>
      <Container className='main-add-form-container'>
        <AddItemForm addItem={addTodolist} />
      </Container>
      <Container className='main-container'>
        <Todolists />
      </Container>
    </>
  );
};
