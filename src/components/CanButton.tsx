import React from 'react';

interface CanButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

const CanButton: React.FC<CanButtonProps> = ({ onClick, disabled = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="can-hover focus:outline-none transition-transform disabled:opacity-50 relative"
      style={{ width: '150px' }}
    >
      <div className="absolute inset-0 bg-white/10 rounded-full opacity-0 hover:opacity-100 transition-opacity"></div>
      <img 
        src="https://cdn.poehali.dev/files/2e734cb3-9c95-40e8-9844-7dacc60d1031.jpg" 
        alt="Red Bull Energy Drink" 
        className="w-full h-auto transition-all duration-200"
      />
    </button>
  );
};

export default CanButton;
