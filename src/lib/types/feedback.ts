export interface WorkoutFeedback {
  id: string;
  workoutId: string;
  userId: string;
  rating: number; // 1-5
  difficulty: 'muito-facil' | 'facil' | 'adequado' | 'dificil' | 'muito-dificil';
  comment?: string;
  completedExercises: number;
  totalExercises: number;
  duration: number; // minutos
  caloriesBurned?: number;
  createdAt: Date;
}

export interface ExerciseFeedback {
  exerciseId: string;
  liked: boolean;
  difficulty: number; // 1-5
  notes?: string;
}

export interface WorkoutReview {
  id: string;
  workoutId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  helpful: number;
  createdAt: Date;
}
