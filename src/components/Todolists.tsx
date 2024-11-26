import { useSelector } from 'react-redux';
import { AppRootStateType } from '../app/store';
import { TodolistType } from '../model/todolists-reducer';

import { Container } from './Container';
import { Todolist } from './Todolist';

export const Todolists = () => {
  // Получение данных из состояния
  const todolists = useSelector<AppRootStateType, TodolistType[]>(
    state => state.todolists
  );

  return (
    <>
      {todolists.map(tl => {
        return (
          <Container key={tl.id} className='grid-container'>
            <Todolist todolist={tl} key={tl.id} />
          </Container>
        );
      })}
    </>
  );
};
