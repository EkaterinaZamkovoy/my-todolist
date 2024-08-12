type ContainerPropsType = {
  className: string;
  children: React.ReactNode;
};

export const Container = ({ className, children }: ContainerPropsType) => {
  return <div className={className}>{children}</div>;
};
