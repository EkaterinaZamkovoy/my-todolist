import { Container } from '../common/components/Container/Container';
import { addTodolistTC } from '../features/todolists/model/todolists-reducer';
import { Todolists } from '../features/todolists/ui/Todolists/Todolists';
import { useAppDispatch } from '../common/hooks/useAppDispatch';
import { AddItemForm } from 'common/components';
import { LoadingPage } from 'common/components/LoadingPage/LoadingPage';
import { useAppSelector } from 'common/hooks/useAppSelector';
import { selectStatus } from './appSelectors';
import { useEffect } from 'react';
import { Path } from 'common/routing/Routing';
import { useNavigate } from 'react-router';
import { selectIsLoggedIn } from 'features/auth/model/authSelectors';

export const Main = () => {
  const dispatch = useAppDispatch();

  const status = useAppSelector(selectStatus);

  const navigate = useNavigate();

  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(Path.Login);
    }
  }, [isLoggedIn]);

  const addTodolist = (title: string) => {
    const action = addTodolistTC(title);
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
      {status === 'loading' && <LoadingPage />}
    </>
  );
};
