import { useAppSelector } from 'common/hooks/useAppSelector';
import { Button } from '../Button/Button';
import { Container } from '../Container/Container';
import { selectIsLoggedIn } from 'features/auth/model/authSelectors';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { logoutTC } from 'features/auth/model/auth-reducer';

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
        {/* <Button title="Login" onClick={() => {}} className="loginBtn" /> */}
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
