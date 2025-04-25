import React, { useState, useRef } from 'react';
import CanButton from '@/components/CanButton';
import ScoreCounter from '@/components/ScoreCounter';
import FloatingScore from '@/components/FloatingScore';
import ShopModal from '@/components/ShopModal';
import ErrorMessage from '@/components/ErrorMessage';
import Decorations from '@/components/Decorations';
import { useGameState } from '@/hooks/useGameState';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

interface FloatingPoint {
  id: number;
  value: number;
  position: { x: number; y: number };
}

const Index = () => {
  const { state, incrementScore, purchaseBoost, error, clearError } = useGameState();
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [floatingPoints, setFloatingPoints] = useState<FloatingPoint[]>([]);
  const nextPointId = useRef(0);

  const handleCanClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Create floating point at click position
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top - 20; // Offset upward
    
    // Add a new floating point
    const newPoint = {
      id: nextPointId.current++,
      value: state.clickValue,
      position: { x, y }
    };
    
    setFloatingPoints(prev => [...prev, newPoint]);
    incrementScore();
  };

  const handleFloatingPointComplete = (id: number) => {
    setFloatingPoints(prev => prev.filter(point => point.id !== id));
  };

  const openShop = () => setIsShopOpen(true);
  const closeShop = () => setIsShopOpen(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black relative overflow-hidden">
      <Decorations />
      
      {/* Score counter */}
      <ScoreCounter score={state.score} />
      
      {/* Main can button */}
      <div className="relative">
        <CanButton onClick={handleCanClick} />
        
        {/* Floating score points */}
        {floatingPoints.map(point => (
          <FloatingScore
            key={point.id}
            value={point.value}
            position={point.position}
            onComplete={() => handleFloatingPointComplete(point.id)}
          />
        ))}
      </div>
      
      {/* Shop button */}
      <div className="mt-12">
        <Button 
          onClick={openShop}
          className="game-button group"
        >
          <ShoppingCart className="mr-2 h-5 w-5 group-hover:animate-shake" />
          <span>Купить Нью дринк</span>
        </Button>
      </div>
      
      {/* Shop modal */}
      <ShopModal
        isOpen={isShopOpen}
        onClose={closeShop}
        boosts={state.boosts}
        currentScore={state.score}
        onPurchaseBoost={purchaseBoost}
      />
      
      {/* Error message */}
      {error && (
        <ErrorMessage message={error} onDismiss={clearError} />
      )}
    </div>
  );
};

export default Index;
