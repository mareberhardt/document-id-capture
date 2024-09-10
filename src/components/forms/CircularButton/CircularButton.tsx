import React from 'react';
import './CircularButton.scss';

interface CircularButtonProps {
  onClick?: () => void; // Optional onClick handler
  size?: number; // Optional size, default can be set
}

const CircularButton: React.FC<CircularButtonProps> = ({ onClick, size = 80 }) => {
  return (
    <button
      className="circular-button"
      onClick={onClick}
      style={{ width: size, height: size }}
    >
    </button>
  );
};

export default CircularButton;
