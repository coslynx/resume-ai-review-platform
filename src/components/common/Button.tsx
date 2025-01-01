import React, { ReactNode } from 'react';
import './Button.css';

interface ButtonProps<T> {
  onClick?: (event: React.MouseEvent<T>) => void;
  children: ReactNode;
  disabled?: boolean;
  style?: string;
}

const Button = <T extends HTMLElement>({ onClick, children, disabled, style }: ButtonProps<T>) => {
    const handleClick = (event: React.MouseEvent<T>) => {
        if (disabled) {
          event.preventDefault();
          return;
        }
    
        if (onClick) {
          try {
            onClick(event);
          } catch (error: any) {
            console.error('Error in button onClick handler:', error);
          }
        }
      };

  return (
    <button
      className={`button ${style || ''} ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50'}`}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;