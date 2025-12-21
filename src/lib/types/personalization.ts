export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  age?: number;
  height?: number; // cm
  weight?: number; // kg
  fitnessLevel: 'iniciante' | 'intermediario' | 'avancado';
  goals: string[];
  preferences: UserPreferences;
  healthConditions?: string[];
  injuries?: string[];
}

export interface UserPreferences {
  workoutLocation: 'casa' | 'academia' | 'ambos';
  availableEquipment: string[];
  workoutDuration: number; // minutos preferidos
  daysPerWeek: number;
  preferredTime: 'manha' | 'tarde' | 'noite';
  musicPreference?: string;
  notificationsEnabled: boolean;
}

export interface CustomWorkout {
  id: string;
  name: string;
  userId: string;
  exercises: CustomExercise[];
  duration: number;
  difficulty: string;
  createdAt: Date;
  lastUsed?: Date;
}

export interface CustomExercise {
  exerciseId: string;
  sets: number;
  reps: string;
  weight?: string;
  rest: string;
  notes?: string;
  order: number;
}
