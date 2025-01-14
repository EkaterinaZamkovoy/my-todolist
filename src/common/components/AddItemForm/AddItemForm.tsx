import { ChangeEvent, useState, KeyboardEvent } from 'react';
import { Container } from '../Container/Container';
import { Button } from '../Button/Button';

type AddItemFormPropsType = {
  addItem: (title: string) => void;
  disabled?: boolean;
};

export const AddItemForm = ({ addItem, disabled }: AddItemFormPropsType) => {
  //------

  const [title, setTitle] = useState('');

  //---

  const [error, setError] = useState<string | null>(null);

  //---

  const addItemHandler = () => {
    if (title.trim() !== '') {
      addItem(title.trim());
      setTitle('');
    } else {
      setError('Title is required');
    }
  };

  //---

  const onChangeItemHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
  };

  //---

  const onKeyUpItemHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (event.key === 'Enter') {
      addItemHandler();
    }
  };

  return (
    <Container className='add-box-container'>
      <Container className='add-box'>
        <input
          className={error ? 'error' : 'input-task'}
          type='text'
          value={title}
          onChange={onChangeItemHandler}
          onKeyUp={onKeyUpItemHandler}
          disabled={disabled}
        />
        <Button
          className='add-btn'
          title={'+'}
          onClick={addItemHandler}
          disabled={disabled}
        />
      </Container>
      {error && <div className={'error-message'}>{error}</div>}
    </Container>
  );
};
