import { ChangeEvent, useState } from 'react';

type EditableSpan = {
  value: string;
  onChange: (newTitle: string) => void;
  className: string;
  disabled?: boolean;
};

export const EditableSpan = ({
  value,
  onChange,
  className,
  disabled,
}: EditableSpan) => {
  const [editMode, setEditMode] = useState(false);
  const [changeTitle, setChangeTitle] = useState(value);

  //---

  const activatedEditModeHandler = () => {
    setEditMode(true);
  };

  //---

  const deActivatedEditModeHandler = () => {
    setEditMode(false);
    onChange(changeTitle);
  };

  //---

  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setChangeTitle(e.currentTarget.value);
  };

  return (
    <div>
      {editMode ? (
        <input
          className={'input-task change-title-input'}
          value={changeTitle}
          autoFocus
          onBlur={deActivatedEditModeHandler}
          onChange={onChangeTitleHandler}
          disabled={disabled}
        />
      ) : (
        <span className={className} onDoubleClick={activatedEditModeHandler}>
          {value}
        </span>
      )}
    </div>
  );
};
