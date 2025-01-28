import { Container } from '../common/components/Container/Container';
import { Todolists } from '../features/todolists/ui/Todolists/Todolists';
import { AddItemForm } from 'common/components';
import { LoadingPage } from 'common/components/LoadingPage/LoadingPage';
import { useAppSelector } from 'common/hooks/useAppSelector';
import { selectStatus } from './appSelectors';
import { useEffect } from 'react';
import { Path } from 'common/routing/Routing';
import { useNavigate } from 'react-router';
import { useAddTodolistMutation } from 'features/todolists/api/todolistsApi';
import { selectIsLoggedIn } from './appSlice';

export const Main = () => {
  const [addTodolist] = useAddTodolistMutation();

  const status = useAppSelector(selectStatus);

  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(Path.Login);
    }
  }, [isLoggedIn]);

  const addTodolistCallback = (title: string) => {
    addTodolist(title);
  };

  return (
    <>
      <Container className='main-add-form-container'>
        <AddItemForm addItem={addTodolistCallback} />
      </Container>
      <Container className='main-container'>
        <Todolists />
      </Container>
      {status === 'loading' && <LoadingPage />}
    </>
  );
};
