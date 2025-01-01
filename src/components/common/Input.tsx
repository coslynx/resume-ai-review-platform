import React, { useState, ChangeEvent } from 'react';
import './Input.css';

interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  style?: string;
}

const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  label,
  style,
}) => {
  const [inputValue, setInputValue] = useState<string>(value || '');

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      let sanitizedValue = event.target.value;
    
      // Basic sanitization to prevent script injection
      sanitizedValue = sanitizedValue.replace(/<[^>]*>/g, '');

      setInputValue(sanitizedValue);
    
    if (onChange) {
        const eventCopy: ChangeEvent<HTMLInputElement> = {
            ...event,
            target: {
                ...event.target,
                value: sanitizedValue
            }
        }
            onChange(eventCopy);
        }

    };

  return (
    <div className="mb-4">
      {label && <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>}
      <input
          type={type}
          placeholder={placeholder}
          value={inputValue}
          onChange={handleChange}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 ${style || ''}`}
          aria-label={label || placeholder}
          aria-required={true}
      />
    </div>
  );
};

export default Input;