import React from 'react';

interface SpinnerProps {
    size?: number;
    color?: 'primary' | 'gray-100' | 'gray-200' | 'dark-gray' | 'success' | 'error'
}


const Spinner: React.FC<SpinnerProps> = ({ size = 24, color = 'primary' }) => {
  return (
    <div className="spinner-container" style={{ width: size, height: size }}>
      <div className={`spinner-animation border-2 border-t-transparent rounded-full animate-spin border-${color}`} style={{ borderTopColor: 'transparent', width: size, height: size }}></div>
    </div>
  );
};

export default Spinner;