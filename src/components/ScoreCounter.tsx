import React from 'react';

interface ScoreCounterProps {
  score: number;
}

const ScoreCounter: React.FC<ScoreCounterProps> = ({ score }) => {
  // Convert score to array of digits with leading zeros
  const scoreString = score.toString().padStart(6, '0');
  const digits = scoreString.split('');

  return (
    <div className="fixed top-6 right-6 p-2 bg-game-dark/80 rounded-lg border-2 border-game-silver/50 shadow-lg backdrop-blur-sm">
      <div className="text-xl font-bold text-white">
        {digits.map((digit, index) => (
          <span key={index} className="counter-digit mx-0.5">{digit}</span>
        ))}
      </div>
    </div>
  );
};

export default ScoreCounter;
