import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Button from '@/components/common/Button';

describe('Button Component', () => {
  it('renders correctly with provided children', () => {
    render(<Button children="Test Button" />);
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });

  it('fires onClick event when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick} children="Click Me" />);
    fireEvent.click(screen.getByText('Click Me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not fire onClick event when disabled', () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick} children="Disabled Button" disabled />);
    
    const buttonElement = screen.getByText('Disabled Button') as HTMLButtonElement;
      fireEvent.click(buttonElement);
      expect(handleClick).not.toHaveBeenCalled();
      expect(buttonElement).toBeDisabled();
      expect(buttonElement).toHaveClass('opacity-50');
      expect(buttonElement).toHaveClass('cursor-not-allowed');
  });


  it('renders with custom style', () => {
    render(<Button children="Styled Button" style="custom-style" />);
    const button = screen.getByText('Styled Button') as HTMLButtonElement;
    expect(button).toHaveClass('custom-style');
  });

  it('handles errors in onClick handler gracefully', () => {
    const handleClick = jest.fn(() => {
        throw new Error('Test Error');
    });
      
    render(<Button onClick={handleClick} children="Error Button" />);
      fireEvent.click(screen.getByText('Error Button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
      
      // Mock console.error to check for error message
      const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {});

      fireEvent.click(screen.getByText('Error Button'));
    
        expect(consoleErrorMock).toHaveBeenCalledTimes(1);
       expect(consoleErrorMock).toHaveBeenCalledWith(
          'Error in button onClick handler:',
          new Error('Test Error'),
        );

      consoleErrorMock.mockRestore(); // Restore console.error
   });
    
  it('renders button with default styles', () => {
     render(<Button children="Default Button" />);
    const button = screen.getByText('Default Button') as HTMLButtonElement;
        expect(button).toHaveClass('button');
    expect(button).not.toHaveClass('opacity-50');
        expect(button).not.toHaveClass('cursor-not-allowed');
    });
  
});