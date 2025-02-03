export const TodolistSkeleton = () => {
  return (
    <div className='skeleton-paper'>
      <div className='skeleton-header-container'>
        <div className='skeleton-box skeleton-header' />
        <div className='skeleton-box skeleton-icon' />
      </div>

      <div className='skeleton-item-container'>
        <div className='skeleton-box skeleton-item-large' />
        <div className='skeleton-box skeleton-icon' />
      </div>

      {Array(3)
        .fill(null)
        .map((_, id) => (
          <div key={id} className='skeleton-list-item-container'>
            <div className='skeleton-inner-container'>
              <div className='skeleton-box skeleton-small' />
              <div className='skeleton-box skeleton-medium' />
            </div>
            <div className='skeleton-box skeleton-small' />
          </div>
        ))}

      <div className='skeleton-button-container'>
        {Array(3)
          .fill(null)
          .map((_, id) => (
            <div key={id} className='skeleton-box skeleton-button' />
          ))}
      </div>
    </div>
  );
};
