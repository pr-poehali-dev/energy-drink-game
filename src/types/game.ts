export interface BoostInfo {
  id: number;
  name: string;
  description: string;
  cost: number;
  clickValue: number;
  purchased: boolean;
  icon: string;
}

export interface GameState {
  score: number;
  clickValue: number;
  boosts: BoostInfo[];
  nextBoostIndex: number;
}
