// Types for FitHer App

export type WorkoutGoal = 
  | 'emagrecimento'
  | 'hipertrofia'
  | 'tonificacao'
  | 'gluteos'
  | 'pernas'
  | 'abdomen'
  | 'bracos-costas'
  | 'funcional'
  | 'hiit'
  | 'iniciante';

export type WorkoutLocation = 'casa' | 'academia' | 'ambos';

export type MuscleGroup = 
  | 'gluteos'
  | 'pernas'
  | 'abdomen'
  | 'bracos'
  | 'costas'
  | 'peito'
  | 'ombros'
  | 'corpo-todo';

export interface Exercise {
  id: string;
  name: string;
  muscleGroup: MuscleGroup[];
  equipment: string[];
  difficulty: 'iniciante' | 'intermediario' | 'avancado';
  description: string;
  instructions: string[];
  tips: string[];
  videoUrl?: string;
  imageUrl?: string;
}

export interface WorkoutExercise {
  exerciseId: string;
  sets: number;
  reps: string; // "12-15" or "30 segundos"
  rest: string; // "60 segundos"
  weight?: string; // "5-8kg" or "peso corporal"
  notes?: string;
}

export interface WorkoutDay {
  day: number;
  name: string;
  focus: string;
  duration: string;
  exercises: WorkoutExercise[];
}

export interface WorkoutPlan {
  id: string;
  name: string;
  goal: WorkoutGoal;
  description: string;
  level: 'iniciante' | 'intermediario' | 'avancado';
  location: WorkoutLocation;
  daysPerWeek: number;
  duration: string; // "4-6 semanas"
  benefits: string[];
  days: WorkoutDay[];
}

export interface NutritionGoal {
  type: 'perda-peso' | 'ganho-massa' | 'manutencao';
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface Food {
  id: string;
  name: string;
  category: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  serving: string;
}

export interface MealPlan {
  id: string;
  name: string;
  goal: 'perda-peso' | 'ganho-massa' | 'manutencao';
  calories: number;
  meals: {
    name: string;
    time: string;
    foods: string[];
    calories: number;
  }[];
}

export interface ProgressEntry {
  date: string;
  weight?: number;
  measurements?: {
    waist?: number;
    hips?: number;
    thighs?: number;
    arms?: number;
  };
  photos?: string[];
  notes?: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}
