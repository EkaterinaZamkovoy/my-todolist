import { useAppSelector } from 'common/hooks/useAppSelector';
import { Button } from '../Button/Button';
import { Container } from '../Container/Container';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { selectIsLoggedIn, setIsLoggedIn } from 'app/appSlice';
import { useLogoutMutation } from 'features/auth/api/authApi';
import { clearTasks } from 'features/todolists/model/tasksSlice';
import { clearTodolists } from 'features/todolists/model/todolistSlice';
import { ResultCode } from 'common/enums/enums';

export const MenuBar = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const [logout] = useLogoutMutation();

  const dispatch = useAppDispatch();

  const logoutHandler = () => {
    logout().then(res => {
      if (res.data?.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedIn({ isLoggedIn: false }));
        localStorage.removeItem('sn-token');
        dispatch(clearTasks());
        dispatch(clearTodolists());
      }
    });
  };
  return (
    <>
      <Container className={'menu-bar'}>
        <div className='menu-icon'>
          <span className='icon'></span>
          <span className='icon'></span>
          <span className='icon'></span>
        </div>
        {isLoggedIn && (
          <Button title='Logout' onClick={logoutHandler} className='loginBtn' />
        )}
      </Container>
    </>
  );
};
