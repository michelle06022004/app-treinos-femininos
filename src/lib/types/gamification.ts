export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'treino' | 'consistencia' | 'progresso' | 'social';
  points: number;
  unlocked: boolean;
  unlockedAt?: Date;
  progress: number;
  target: number;
}

export interface UserLevel {
  level: number;
  currentXP: number;
  xpToNextLevel: number;
  title: string;
}

export interface Challenge {
  id: string;
  name: string;
  description: string;
  type: 'daily' | 'weekly' | 'monthly';
  reward: number;
  progress: number;
  target: number;
  expiresAt: Date;
  completed: boolean;
}

export interface UserStats {
  totalWorkouts: number;
  currentStreak: number;
  longestStreak: number;
  totalCaloriesBurned: number;
  totalMinutesTrained: number;
  favoriteWorkout: string;
  achievements: Achievement[];
  level: UserLevel;
  challenges: Challenge[];
}
