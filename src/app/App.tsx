import { ErrorSnackbar } from 'common/components/ErrorSnackbar/ErrorSnackbar';
import { Header } from '../common/components/Header/Header';
import './App.css';
import { Routing } from 'common/routing';
import { LoadingPage } from 'common/components/LoadingPage/LoadingPage';
import { useMeQuery } from 'features/auth/api/authApi';
import { useEffect, useState } from 'react';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { ResultCode } from 'common/enums/enums';
import { setIsLoggedIn } from './appSlice';

function App() {
  const { data, isLoading } = useMeQuery();

  const dispatch = useAppDispatch();

  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setIsInitialized(true);
      if (data?.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedIn({ isLoggedIn: true }));
      }
    }
  }, [isLoading, data]);

  if (!isInitialized) {
    return (
      <div>
        <LoadingPage />
      </div>
    );
  }

  return (
    <div className='App'>
      <Header />
      <Routing />
      <ErrorSnackbar message='Error' duration={6000} />
    </div>
  );
}

export default App;
