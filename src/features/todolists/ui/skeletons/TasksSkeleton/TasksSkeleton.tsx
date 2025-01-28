import Skeleton from '@mui/material/Skeleton';

export const TasksSkeleton = () => {
  return (
    <div
      style={{
        paddingBottom: '50px',
      }}>
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
    </div>
  );
};
