import { ErrorSnackbar } from 'common/components/ErrorSnackbar/ErrorSnackbar';
import { Header } from '../common/components/Header/Header';
import './App.css';
import { Routing } from 'common/routing';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { useEffect } from 'react';
import { initializeAppTC, selectIsInitialized } from 'features/auth/model/authSlice';
import { useAppSelector } from 'common/hooks/useAppSelector';
import { LoadingPage } from 'common/components/LoadingPage/LoadingPage';

function App() {
  const dispatch = useAppDispatch();
  const isInitialized = useAppSelector(selectIsInitialized);

  useEffect(() => {
    dispatch(initializeAppTC());
  }, []);

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
