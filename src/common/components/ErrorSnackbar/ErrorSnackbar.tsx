import { setAppError } from 'app/appSlice';
import { selectError } from 'app/appSelectors';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { useAppSelector } from 'common/hooks/useAppSelector';
import { useEffect } from 'react';
import { Button } from '../Button/Button';

type SnackbarProps = {
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  duration: number;
};

export const ErrorSnackbar = ({
  message,
  type = 'error',
  duration = 300,
}: SnackbarProps) => {
  const error = useAppSelector(selectError);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!error) return;

    const timer = setTimeout(() => {
      dispatch(setAppError({ error: null }));
    }, duration);

    return () => clearTimeout(timer);
  }, [error, duration]);

  if (!error) return null;

  const handleClose = () => {
    dispatch(setAppError({ error: null }));
  };

  return (
    <div className={`snackbar ${type}`} role='alert'>
      {error}
      <Button onClick={handleClose} className='close-btn' />
    </div>
  );
};
