'use client';

import { Achievement } from '@/lib/types/gamification';
import { Lock, Check } from 'lucide-react';

interface AchievementCardProps {
  achievement: Achievement;
}

export default function AchievementCard({ achievement }: AchievementCardProps) {
  const progressPercentage = (achievement.progress / achievement.target) * 100;

  return (
    <div
      className={`relative bg-white rounded-2xl p-4 border-2 transition-all duration-300 ${
        achievement.unlocked
          ? 'border-yellow-400 shadow-lg shadow-yellow-100'
          : 'border-gray-200 opacity-75'
      }`}
    >
      {/* Badge Icon */}
      <div className="flex items-start gap-3 mb-3">
        <div
          className={`text-4xl ${
            achievement.unlocked ? 'grayscale-0' : 'grayscale opacity-50'
          }`}
        >
          {achievement.icon}
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 mb-1">{achievement.name}</h3>
          <p className="text-xs text-gray-600">{achievement.description}</p>
        </div>
        {achievement.unlocked && (
          <div className="bg-yellow-400 rounded-full p-1">
            <Check className="w-4 h-4 text-white" />
          </div>
        )}
        {!achievement.unlocked && (
          <div className="bg-gray-300 rounded-full p-1">
            <Lock className="w-4 h-4 text-gray-600" />
          </div>
        )}
      </div>

      {/* Progress Bar */}
      {!achievement.unlocked && (
        <div className="mb-2">
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>Progresso</span>
            <span>
              {achievement.progress}/{achievement.target}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-pink-500 to-rose-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      )}

      {/* Points */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-gray-500">
          {achievement.category}
        </span>
        <span className="text-sm font-bold text-yellow-600">
          +{achievement.points} XP
        </span>
      </div>

      {/* Unlocked Date */}
      {achievement.unlocked && achievement.unlockedAt && (
        <div className="mt-2 text-xs text-gray-500">
          Desbloqueado em {achievement.unlockedAt.toLocaleDateString('pt-BR')}
        </div>
      )}
    </div>
  );
}
