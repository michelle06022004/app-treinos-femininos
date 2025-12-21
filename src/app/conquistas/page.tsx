'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Trophy, Target, Flame, Users } from 'lucide-react';
import AchievementCard from '@/components/gamification/AchievementCard';
import LevelProgress from '@/components/gamification/LevelProgress';
import ChallengeCard from '@/components/gamification/ChallengeCard';
import { achievements, activeChallenges, userLevel } from '@/lib/data/achievements';

export default function ConquistasPage() {
  const [filter, setFilter] = useState<string>('todas');

  const categories = [
    { id: 'todas', label: 'Todas', icon: Trophy },
    { id: 'treino', label: 'Treinos', icon: Target },
    { id: 'consistencia', label: 'Consistência', icon: Flame },
    { id: 'progresso', label: 'Progresso', icon: Target },
    { id: 'social', label: 'Social', icon: Users }
  ];

  const filteredAchievements =
    filter === 'todas'
      ? achievements
      : achievements.filter((a) => a.category === filter);

  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const totalPoints = achievements
    .filter((a) => a.unlocked)
    .reduce((sum, a) => sum + a.points, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Conquistas & Desafios
              </h1>
              <p className="text-sm text-gray-600">
                {unlockedCount}/{achievements.length} conquistas desbloqueadas
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Level Progress */}
        <div className="mb-8">
          <LevelProgress level={userLevel} />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm">
            <div className="text-3xl font-bold text-purple-600 mb-1">
              {unlockedCount}
            </div>
            <div className="text-sm text-gray-600">Conquistas</div>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm">
            <div className="text-3xl font-bold text-yellow-600 mb-1">
              {totalPoints}
            </div>
            <div className="text-sm text-gray-600">Total XP</div>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm">
            <div className="text-3xl font-bold text-pink-600 mb-1">
              {userLevel.level}
            </div>
            <div className="text-sm text-gray-600">Nível Atual</div>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm">
            <div className="text-3xl font-bold text-green-600 mb-1">
              {activeChallenges.length}
            </div>
            <div className="text-sm text-gray-600">Desafios Ativos</div>
          </div>
        </div>

        {/* Active Challenges */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Desafios Ativos
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {activeChallenges.map((challenge) => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setFilter(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-all ${
                  filter === category.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-purple-300'
                }`}
              >
                <category.icon className="w-4 h-4" />
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Achievements Grid */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Todas as Conquistas
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAchievements.map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </div>

        {/* Motivation Box */}
        <div className="mt-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-3xl p-6 text-white">
          <h3 className="text-xl font-bold mb-2">Continue Assim! 🎉</h3>
          <p className="text-pink-100">
            Você está fazendo um trabalho incrível! Cada conquista é um passo
            mais perto dos seus objetivos. Continue se desafiando e
            desbloqueando novas conquistas!
          </p>
        </div>
      </main>
    </div>
  );
}
