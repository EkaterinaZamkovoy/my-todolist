type ButtonPropsType = {
  title?: string;
  onClick: () => void;
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
};

export const Button = ({
  title,
  onClick,
  className,
  children,
  disabled,
}: ButtonPropsType) => {
  return (
    <button
      className={`${className} ${disabled ? 'button-disabled' : ''}`}
      onClick={onClick}
      disabled={disabled}>
      {children || title}
    </button>
  );
};
