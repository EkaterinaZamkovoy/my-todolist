import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';

export const TodolistSkeleton = () => {
  return (
    <Paper
      style={{
        width: '305px',
        padding: '10px 20px',
      }}>
      <div
        style={{
          display: 'flex',
          gap: '15px',
          alignItems: 'center',
        }}>
        <Skeleton width={150} height={50} />
        <Skeleton width={20} height={40} />
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Skeleton width={230} height={60} />
        <Skeleton width={20} height={40} />
      </div>

      <>
        {Array(3)
          .fill(null)
          .map((_, id) => (
            <div
              key={id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: '15px',
                }}>
                <Skeleton width={30} height={60} />
                <Skeleton width={150} height={60} />
              </div>
              <Skeleton width={30} height={60} />
            </div>
          ))}
      </>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}>
        {Array(3)
          .fill(null)
          .map((_, id) => (
            <Skeleton key={id} width={80} height={60} />
          ))}
      </div>
    </Paper>
  );
};
