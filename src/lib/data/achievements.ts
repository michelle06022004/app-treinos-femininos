import { Achievement, Challenge } from '../types/gamification';

export const achievements: Achievement[] = [
  {
    id: 'first-workout',
    name: 'Primeira Conquista',
    description: 'Complete seu primeiro treino',
    icon: '🎯',
    category: 'treino',
    points: 10,
    unlocked: true,
    unlockedAt: new Date('2024-01-15'),
    progress: 1,
    target: 1
  },
  {
    id: 'week-warrior',
    name: 'Guerreira da Semana',
    description: 'Treine 5 dias seguidos',
    icon: '🔥',
    category: 'consistencia',
    points: 50,
    unlocked: true,
    unlockedAt: new Date('2024-01-20'),
    progress: 5,
    target: 5
  },
  {
    id: 'month-champion',
    name: 'Campeã do Mês',
    description: 'Complete 20 treinos em um mês',
    icon: '👑',
    category: 'consistencia',
    points: 100,
    unlocked: false,
    progress: 12,
    target: 20
  },
  {
    id: 'early-bird',
    name: 'Madrugadora',
    description: 'Treine antes das 7h da manhã 10 vezes',
    icon: '🌅',
    category: 'treino',
    points: 30,
    unlocked: false,
    progress: 3,
    target: 10
  },
  {
    id: 'strength-queen',
    name: 'Rainha da Força',
    description: 'Aumente sua carga em 50% em qualquer exercício',
    icon: '💪',
    category: 'progresso',
    points: 75,
    unlocked: false,
    progress: 25,
    target: 50
  },
  {
    id: 'cardio-master',
    name: 'Mestre do Cardio',
    description: 'Complete 50 treinos HIIT',
    icon: '⚡',
    category: 'treino',
    points: 100,
    unlocked: false,
    progress: 18,
    target: 50
  },
  {
    id: 'social-butterfly',
    name: 'Inspiração',
    description: 'Compartilhe 10 treinos com amigas',
    icon: '🦋',
    category: 'social',
    points: 40,
    unlocked: false,
    progress: 4,
    target: 10
  },
  {
    id: 'perfect-form',
    name: 'Forma Perfeita',
    description: 'Receba 5 avaliações de técnica perfeita',
    icon: '✨',
    category: 'progresso',
    points: 60,
    unlocked: true,
    unlockedAt: new Date('2024-01-25'),
    progress: 5,
    target: 5
  }
];

export const activeChallenges: Challenge[] = [
  {
    id: 'daily-cardio',
    name: 'Cardio Diário',
    description: 'Complete um treino HIIT hoje',
    type: 'daily',
    reward: 20,
    progress: 0,
    target: 1,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    completed: false
  },
  {
    id: 'weekly-warrior',
    name: 'Guerreira Semanal',
    description: 'Treine 5 vezes esta semana',
    type: 'weekly',
    reward: 100,
    progress: 3,
    target: 5,
    expiresAt: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
    completed: false
  },
  {
    id: 'monthly-marathon',
    name: 'Maratona Mensal',
    description: 'Complete 20 treinos este mês',
    type: 'monthly',
    reward: 500,
    progress: 12,
    target: 20,
    expiresAt: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000),
    completed: false
  }
];

export const userLevel = {
  level: 8,
  currentXP: 1250,
  xpToNextLevel: 1500,
  title: 'Atleta Dedicada'
};

export const levelTitles = [
  { level: 1, title: 'Iniciante', xpRequired: 0 },
  { level: 2, title: 'Aprendiz', xpRequired: 100 },
  { level: 3, title: 'Praticante', xpRequired: 250 },
  { level: 4, title: 'Entusiasta', xpRequired: 500 },
  { level: 5, title: 'Comprometida', xpRequired: 800 },
  { level: 6, title: 'Determinada', xpRequired: 1200 },
  { level: 7, title: 'Forte', xpRequired: 1700 },
  { level: 8, title: 'Atleta Dedicada', xpRequired: 2300 },
  { level: 9, title: 'Guerreira', xpRequired: 3000 },
  { level: 10, title: 'Lenda', xpRequired: 4000 }
];
