'use client';

import { UserLevel } from '@/lib/types/gamification';
import { Trophy, Zap } from 'lucide-react';

interface LevelProgressProps {
  level: UserLevel;
}

export default function LevelProgress({ level }: LevelProgressProps) {
  const progressPercentage = (level.currentXP / level.xpToNextLevel) * 100;

  return (
    <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-3xl p-6 text-white shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm opacity-90">Seu Nível</p>
            <h3 className="text-2xl font-bold">{level.title}</h3>
          </div>
        </div>
        <div className="text-right">
          <div className="text-4xl font-bold">{level.level}</div>
          <p className="text-xs opacity-75">Level</p>
        </div>
      </div>

      {/* XP Progress */}
      <div className="mb-3">
        <div className="flex justify-between text-sm mb-2">
          <span className="flex items-center gap-1">
            <Zap className="w-4 h-4" />
            XP
          </span>
          <span className="font-semibold">
            {level.currentXP} / {level.xpToNextLevel}
          </span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-yellow-300 to-yellow-500 h-3 rounded-full transition-all duration-500 shadow-lg"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      <p className="text-xs opacity-75">
        Faltam {level.xpToNextLevel - level.currentXP} XP para o próximo nível!
      </p>
    </div>
  );
}
