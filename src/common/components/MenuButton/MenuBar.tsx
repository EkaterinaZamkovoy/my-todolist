import { useAppSelector } from 'common/hooks/useAppSelector';
import { Button } from '../Button/Button';
import { Container } from '../Container/Container';
import { selectIsLoggedIn } from 'features/auth/model/authSelectors';

export const MenuBar = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
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
          <Button title='Logout' onClick={() => {}} className='loginBtn' />
        )}
      </Container>
    </>
  );
};
