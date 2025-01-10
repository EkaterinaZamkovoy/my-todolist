import { ErrorSnackbar } from 'common/components/ErrorSnackbar/ErrorSnackbar';
import { Header } from '../common/components/Header/Header';
import './App.css';
import { Main } from './Main';

function App() {
  return (
    <div className='App'>
      <Header />
      <Main />
      <ErrorSnackbar message='Error' duration={6000} />
    </div>
  );
}

export default App;
