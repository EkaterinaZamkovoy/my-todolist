import { MouseEventHandler } from 'react';

type ButtonPropsType = {
  title?: string;
  onClick: () => void;
  className?: string;
  children?: React.ReactNode;
};

export const Button = ({
  title,
  onClick,
  className,
  children,
}: ButtonPropsType) => {
  return (
    <button className={className} onClick={onClick}>
      {children || title}
    </button>
  );
};
