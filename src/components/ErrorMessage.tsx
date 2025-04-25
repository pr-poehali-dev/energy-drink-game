import React, { useEffect, useState } from 'react';

interface ErrorMessageProps {
  message: string;
  onDismiss: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onDismiss }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onDismiss, 300); // Allow fade out animation to complete
    }, 3000);

    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div 
      className={`fixed bottom-24 left-1/2 transform -translate-x-1/2 
                  bg-red-600/90 text-white px-6 py-3 rounded-lg shadow-lg
                  animate-pulse-error transition-opacity duration-300
                  ${visible ? 'opacity-100' : 'opacity-0'}`}
    >
      {message}
    </div>
  );
};

export default ErrorMessage;
