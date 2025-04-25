import React from 'react';
import { BoostInfo } from '../types/game';
import { Button } from '@/components/ui/button';

interface BoostItemProps {
  boost: BoostInfo;
  currentScore: number;
  onPurchase: (boostId: number) => void;
}

const BoostItem: React.FC<BoostItemProps> = ({ boost, currentScore, onPurchase }) => {
  const canAfford = currentScore >= boost.cost;
  const handleClick = () => {
    if (canAfford && !boost.purchased) {
      onPurchase(boost.id);
    }
  };

  return (
    <div className={`p-4 rounded-lg border-2 ${canAfford ? 'border-game-silver' : 'border-game-light'} 
                    bg-game-dark/90 mb-4 transition-all`}>
      <div className="flex items-center gap-3">
        <div className="text-3xl">{boost.icon}</div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-white">{boost.name}</h3>
          <p className="text-sm text-gray-300">{boost.description}</p>
          <div className="mt-1 text-xs text-gray-400">
            <span className="text-game-blue font-bold">+{boost.clickValue}</span> за клик
          </div>
        </div>
        <Button
          onClick={handleClick}
          disabled={!canAfford || boost.purchased}
          className={`${
            boost.purchased 
              ? 'bg-green-700 cursor-not-allowed'
              : canAfford 
                ? 'bg-game-blue hover:bg-game-blue/80' 
                : 'bg-gray-700 cursor-not-allowed'
          } text-white px-3 py-1 rounded`}
        >
          {boost.purchased ? 'Куплено' : `${boost.cost} ⚡`}
        </Button>
      </div>
    </div>
  );
};

export default BoostItem;
