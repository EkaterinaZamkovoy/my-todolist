import { Container } from '../../../../common/components/Container/Container';
import { Todolist } from './Todolist/Todolist';
import { useGetTodolistsQuery } from 'features/todolists/api/todolistsApi';

export const Todolists = () => {
  const { data: todolists } = useGetTodolistsQuery();

  return (
    <>
      {todolists?.map(tl => {
        return (
          <Container key={tl.id} className='grid-container'>
            <Todolist todolist={tl} />
          </Container>
        );
      })}
    </>
  );
};
