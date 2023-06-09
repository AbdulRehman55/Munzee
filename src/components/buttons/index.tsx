import React from 'react';
import './styles.scss';

interface Iprops {
  className: string;
  children: string;
  onClick?: () => void;
  icon?: ReactNode
}

const Button = ({ className, children, onClick, icon }: Iprops): JSX.Element => {
  return (
    <button onClick={onClick} className={className}>
      {icon} {children}
    </button>
  );
};

export default Button;
