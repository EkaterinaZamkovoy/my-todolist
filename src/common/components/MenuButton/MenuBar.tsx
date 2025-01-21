import { useAppSelector } from 'common/hooks/useAppSelector';
import { Button } from '../Button/Button';
import { Container } from '../Container/Container';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { logoutTC, selectIsLoggedIn } from 'features/auth/model/authSlice';

export const MenuBar = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const dispatch = useAppDispatch();
  return (
    <>
      <Container className={'menu-bar'}>
        <div className='menu-icon'>
          <span className='icon'></span>
          <span className='icon'></span>
          <span className='icon'></span>
        </div>
        {isLoggedIn && (
          <Button
            title='Logout'
            onClick={() => dispatch(logoutTC())}
            className='loginBtn'
          />
        )}
      </Container>
    </>
  );
};
