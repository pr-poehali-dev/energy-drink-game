import React, { useEffect, useState } from 'react';

interface FloatingScoreProps {
  value: number;
  position: { x: number; y: number };
  onComplete: () => void;
}

const FloatingScore: React.FC<FloatingScoreProps> = ({ value, position, onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, 1000); // Animation duration

    return () => clearTimeout(timer);
  }, [onComplete]);

  const isPositive = value > 0;
  const displayValue = isPositive ? `+${value}` : value;
  const colorClass = isPositive ? 'text-green-500' : 'text-red-500';

  return isVisible ? (
    <div 
      className={`absolute pointer-events-none font-bold animate-float-up ${colorClass}`}
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    >
      {displayValue}
    </div>
  ) : null;
};

export default FloatingScore;
