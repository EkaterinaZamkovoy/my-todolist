import { Container } from '../../../../common/components/Container/Container';
import { TodolistSkeleton } from '../skeletons/TodolistSkeleton/TodolistSkeleton';
import { Todolist } from './Todolist/Todolist';
import { useGetTodolistsQuery } from 'features/todolists/api/todolistsApi';

export const Todolists = () => {
  const { data: todolists, isLoading } = useGetTodolistsQuery();

  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '32px',
        }}>
        {Array(3)
          .fill(null)
          .map((_, id) => (
            <TodolistSkeleton key={id} />
          ))}
      </div>
    );
  }

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
