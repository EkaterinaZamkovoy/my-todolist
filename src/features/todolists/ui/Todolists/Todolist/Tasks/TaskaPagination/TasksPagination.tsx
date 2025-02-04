import { Button } from 'common/components';

type Props = {
  totalCount: number;
  page: number;
  setPage: (page: number) => void;
  pageSize?: number; // Опциональный параметр для гибкости
};

export const TasksPagination = ({
  totalCount,
  page,
  setPage,
  pageSize = 4,
}: Props) => {
  const totalPages = Math.ceil(totalCount / pageSize);

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <Button
            key={i}
            className={`pagination-btn ${page === i ? 'active' : ''}`}
            onClick={() => setPage(i)}
            disabled={page === i}>
            {i}
          </Button>
        );
      }
    } else {
      pages.push(
        <Button
          key={1}
          className={`pagination-btn ${page === 1 ? 'active' : ''}`}
          onClick={() => setPage(1)}
          disabled={page === 1}>
          1
        </Button>
      );

      if (page > 2) {
        pages.push(<span key='start-ellipsis'>...</span>);
      }

      if (page !== 1 && page !== totalPages) {
        pages.push(
          <Button
            key={page}
            className={`pagination-btn active`}
            onClick={() => setPage(page)}
            disabled>
            {page}
          </Button>
        );
      }

      if (page < totalPages - 1) {
        pages.push(<span key='end-ellipsis'>...</span>);
      }

      pages.push(
        <Button
          key={totalPages}
          className={`pagination-btn ${page === totalPages ? 'active' : ''}`}
          onClick={() => setPage(totalPages)}
          disabled={page === totalPages}>
          {totalPages}
        </Button>
      );
    }
    return pages;
  };

  return (
    <div className='pagination-container'>
      <Button
        className='pagination-btn'
        disabled={page <= 1}
        onClick={handlePrev}>
        &lt;
      </Button>

      {renderPageNumbers()}

      <Button
        className='pagination-btn'
        disabled={page === totalPages}
        onClick={handleNext}>
        &gt;
      </Button>
      <div className='totalCount'>Total: {totalCount}</div>
    </div>
  );
};
