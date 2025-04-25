import React from 'react';
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { BoostInfo } from '../types/game';
import BoostItem from './BoostItem';

interface ShopModalProps {
  isOpen: boolean;
  onClose: () => void;
  boosts: BoostInfo[];
  currentScore: number;
  onPurchaseBoost: (boostId: number) => void;
}

const ShopModal: React.FC<ShopModalProps> = ({ 
  isOpen, 
  onClose, 
  boosts, 
  currentScore,
  onPurchaseBoost
}) => {
  const availableBoosts = boosts.filter(boost => !boost.purchased);
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-game-dark border-game-silver/50 text-white max-w-lg w-full">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center font-bold mb-4 text-game-silver">
            Магазин бустов
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-2 mb-4 text-center">
          <span className="text-sm text-gray-400">Баланс:</span>
          <span className="ml-2 text-lg font-bold text-game-silver">{currentScore} ⚡</span>
        </div>
        
        <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
          {availableBoosts.length > 0 ? (
            availableBoosts.map(boost => (
              <BoostItem 
                key={boost.id} 
                boost={boost} 
                currentScore={currentScore}
                onPurchase={onPurchaseBoost}
              />
            ))
          ) : (
            <div className="text-center py-8 text-gray-400">
              <p>Все бусты приобретены!</p>
              <p className="mt-2 text-sm">Скоро будет больше...</p>
            </div>
          )}
        </div>
        
        <DialogFooter className="mt-4">
          <Button onClick={onClose} className="w-full bg-game-light border-game-silver/50">
            Закрыть
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ShopModal;
