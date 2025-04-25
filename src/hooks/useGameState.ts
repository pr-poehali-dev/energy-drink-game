import { useState, useEffect } from 'react';
import { GameState, BoostInfo } from '../types/game';

const INITIAL_BOOSTS: BoostInfo[] = [
  {
    id: 1,
    name: "Буст +5 за клик",
    description: "Увеличивает количество очков за клик на 5",
    cost: 100,
    clickValue: 5,
    purchased: false,
    icon: "⚡"
  },
  {
    id: 2,
    name: "Двойной заряд",
    description: "Удваивает текущее количество очков за клик",
    cost: 300,
    clickValue: 10,
    purchased: false,
    icon: "⚡⚡"
  },
  {
    id: 3,
    name: "Турбо ускоритель",
    description: "Мощный буст для профессиональных кликеров",
    cost: 750,
    clickValue: 25,
    purchased: false,
    icon: "🔥"
  },
  {
    id: 4,
    name: "Мега энергия",
    description: "Открывает невероятный потенциал в твоих кликах",
    cost: 2000,
    clickValue: 50,
    purchased: false,
    icon: "💥"
  },
  {
    id: 5,
    name: "Ультра усилитель",
    description: "Легендарный буст невероятной мощности",
    cost: 5000,
    clickValue: 100,
    purchased: false,
    icon: "⚡🔥💥"
  }
];

const INITIAL_STATE: GameState = {
  score: 0,
  clickValue: 1,
  boosts: INITIAL_BOOSTS,
  nextBoostIndex: 0
};

const LOCAL_STORAGE_KEY = 'redbull-clicker-state';

export const useGameState = () => {
  const [state, setState] = useState<GameState>(() => {
    const savedState = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedState) {
      try {
        return JSON.parse(savedState);
      } catch (e) {
        console.error('Failed to parse saved game state', e);
      }
    }
    return INITIAL_STATE;
  });

  const [error, setError] = useState<string | null>(null);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  // Increment score
  const incrementScore = () => {
    setState(prev => ({
      ...prev,
      score: prev.score + prev.clickValue
    }));
  };

  // Purchase a boost
  const purchaseBoost = (boostId: number) => {
    const boost = state.boosts.find(b => b.id === boostId);
    
    if (!boost) return;
    
    if (boost.purchased) {
      setError('Этот буст уже куплен!');
      return;
    }
    
    if (state.score < boost.cost) {
      setError('Не хватает средств, плохо бухал!');
      return;
    }
    
    setState(prev => {
      // Update the purchased status of the boost
      const updatedBoosts = prev.boosts.map(b => 
        b.id === boostId ? { ...b, purchased: true } : b
      );
      
      // Calculate new click value
      const newClickValue = prev.clickValue + boost.clickValue;
      
      return {
        ...prev,
        score: prev.score - boost.cost,
        clickValue: newClickValue,
        boosts: updatedBoosts
      };
    });
  };

  // Reset error message
  const clearError = () => {
    setError(null);
  };

  return {
    state,
    incrementScore,
    purchaseBoost,
    error,
    clearError
  };
};
