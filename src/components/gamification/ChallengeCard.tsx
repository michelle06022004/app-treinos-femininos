'use client';

import { Challenge } from '@/lib/types/gamification';
import { Clock, Star } from 'lucide-react';

interface ChallengeCardProps {
  challenge: Challenge;
}

export default function ChallengeCard({ challenge }: ChallengeCardProps) {
  const progressPercentage = (challenge.progress / challenge.target) * 100;
  const timeLeft = Math.ceil(
    (challenge.expiresAt.getTime() - Date.now()) / (1000 * 60 * 60)
  );

  const typeColors = {
    daily: 'from-blue-500 to-cyan-500',
    weekly: 'from-green-500 to-emerald-500',
    monthly: 'from-purple-500 to-pink-500'
  };

  const typeBadges = {
    daily: 'Diário',
    weekly: 'Semanal',
    monthly: 'Mensal'
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`text-xs font-semibold px-2 py-1 rounded-full bg-gradient-to-r ${typeColors[challenge.type]} text-white`}
            >
              {typeBadges[challenge.type]}
            </span>
            {challenge.completed && (
              <span className="text-xs font-semibold px-2 py-1 rounded-full bg-green-100 text-green-700">
                ✓ Completo
              </span>
            )}
          </div>
          <h3 className="font-bold text-gray-900">{challenge.name}</h3>
          <p className="text-sm text-gray-600 mt-1">{challenge.description}</p>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-3">
        <div className="flex justify-between text-xs text-gray-600 mb-1">
          <span>Progresso</span>
          <span className="font-semibold">
            {challenge.progress}/{challenge.target}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
          <div
            className={`bg-gradient-to-r ${typeColors[challenge.type]} h-2.5 rounded-full transition-all duration-500`}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Clock className="w-3.5 h-3.5" />
          <span>
            {timeLeft > 24 ? `${Math.ceil(timeLeft / 24)} dias` : `${timeLeft}h`}
          </span>
        </div>
        <div className="flex items-center gap-1 text-sm font-bold text-yellow-600">
          <Star className="w-4 h-4 fill-yellow-600" />
          <span>+{challenge.reward} XP</span>
        </div>
      </div>
    </div>
  );
}
