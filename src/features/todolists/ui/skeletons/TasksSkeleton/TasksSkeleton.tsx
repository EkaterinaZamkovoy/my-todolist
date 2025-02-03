export const TasksSkeleton = () => {
  return (
    <div className='skeleton-tasks-container'>
      {Array(3)
        .fill(null)
        .map((_, id) => (
          <div key={id} className='skeleton-task-item'>
            <div className='skeleton-inner-container'>
              <div className='skeleton-box skeleton-small' />
              <div className='skeleton-box skeleton-medium' />
            </div>
            <div className='skeleton-box skeleton-small' />
          </div>
        ))}
    </div>
  );
};
