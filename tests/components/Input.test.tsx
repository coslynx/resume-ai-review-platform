import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Input from '@/components/common/Input';

describe('Input Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with default props', () => {
    const { container } = render(<Input onChange={() => {}} />);
    expect(container).toMatchSnapshot();
  });

  it('renders correctly with a label', () => {
    const { container } = render(<Input label="Test Label" onChange={() => {}} />);
      expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });


  it('updates input value on change', () => {
    const onChangeMock = jest.fn();
    render(<Input onChange={onChangeMock} />);
    const inputElement = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: 'test input' } });
    expect(inputElement.value).toBe('test input');
    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith(expect.objectContaining({
      target: expect.objectContaining({
        value: 'test input'
      })
    }));
  });


  it('renders with the correct type and placeholder', () => {
    render(<Input type="email" placeholder="Enter your email" onChange={() => {}} />);
    const inputElement = screen.getByRole('textbox') as HTMLInputElement;
    expect(inputElement).toHaveAttribute('type', 'email');
    expect(inputElement).toHaveAttribute('placeholder', 'Enter your email');
  });

  it('renders with a default value', () => {
      render(<Input value="default value" onChange={() => {}} />);
    const inputElement = screen.getByRole('textbox') as HTMLInputElement;
    expect(inputElement.value).toBe('default value');
  });


  it('renders with custom style', () => {
    render(<Input style="custom-style" onChange={() => {}} />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveClass('custom-style');
  });

    it('applies aria-label attribute correctly', () => {
        render(<Input label="Email"  onChange={() => {}}/>);
        const inputElement = screen.getByRole('textbox');
        expect(inputElement).toHaveAttribute('aria-label', 'Email');

        render(<Input placeholder="Email Address"  onChange={() => {}}/>);
        const inputElementPlaceholder = screen.getByRole('textbox');
        expect(inputElementPlaceholder).toHaveAttribute('aria-label', 'Email Address');
    });
  
    it('applies aria-required attribute correctly', () => {
      render(<Input  onChange={() => {}} />);
        const inputElement = screen.getByRole('textbox');
      expect(inputElement).toHaveAttribute('aria-required', 'true');
    });

    it('sanitizes script tags in input value', () => {
      const onChangeMock = jest.fn();
        render(<Input onChange={onChangeMock} />);
    const inputElement = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: '<script>alert("test")</script>' } });

    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith(expect.objectContaining({
      target: expect.objectContaining({
        value: '&lt;script&gt;alert("test")&lt;/script&gt;'
        })
      })
    );
    expect(inputElement.value).toBe('<script>alert("test")</script>')
    expect(screen.queryByText('<script>alert("test")</script>')).toBeNull();
  });

    it('sanitizes html tags in input value', () => {
        const onChangeMock = jest.fn();
        render(<Input onChange={onChangeMock} />);
        const inputElement = screen.getByRole('textbox') as HTMLInputElement;
      fireEvent.change(inputElement, { target: { value: '<div>test</div>' } });

      expect(onChangeMock).toHaveBeenCalledTimes(1);
      expect(onChangeMock).toHaveBeenCalledWith(expect.objectContaining({
        target: expect.objectContaining({
        value: '<div>test</div>'
          })
       })
    );
      expect(inputElement.value).toBe('<div>test</div>')
      expect(screen.queryByText('<div>test</div>')).toBeNull();
    });

});