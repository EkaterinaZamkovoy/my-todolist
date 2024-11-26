import { useDispatch, useSelector } from 'react-redux';
import { AddItemForm } from './AddItemForm';
import { Container } from './Container';
import { addTodolistAC } from '../model/todolists-reducer';
import { Todolists } from './Todolists';

export const Main = () => {
  const dispatch = useDispatch();

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
