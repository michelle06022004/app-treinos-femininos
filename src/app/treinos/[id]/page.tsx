'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Calendar,
  Clock,
  Dumbbell,
  CheckCircle2,
  Play,
  Info,
  TrendingUp,
  Target,
  Award,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { workoutPlans } from '@/lib/data/workouts';

export default function WorkoutDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const plan = workoutPlans.find(p => p.id === resolvedParams.id);
  const [expandedDay, setExpandedDay] = useState<number | null>(0);

  if (!plan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Treino não encontrado</h2>
          <Link href="/treinos" className="text-pink-600 hover:text-pink-700 font-medium">
            ← Voltar para treinos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-pink-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link 
              href="/treinos"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{plan.name}</h1>
              <p className="text-sm text-gray-600">{plan.goal}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-pink-500 to-rose-500 rounded-3xl p-8 text-white mb-8 shadow-xl">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">{plan.name}</h2>
              <p className="text-pink-100">{plan.description}</p>
            </div>
            <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl text-sm font-medium border border-white/30">
              {plan.level.charAt(0).toUpperCase() + plan.level.slice(1)}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <Calendar className="w-5 h-5 mb-2" />
              <p className="text-2xl font-bold">{plan.daysPerWeek}x</p>
              <p className="text-xs text-pink-100">por semana</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <Clock className="w-5 h-5 mb-2" />
              <p className="text-2xl font-bold">{plan.duration}</p>
              <p className="text-xs text-pink-100">duração</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <Dumbbell className="w-5 h-5 mb-2" />
              <p className="text-2xl font-bold">{plan.days.length}</p>
              <p className="text-xs text-pink-100">treinos</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <Target className="w-5 h-5 mb-2" />
              <p className="text-2xl font-bold">{plan.location}</p>
              <p className="text-xs text-pink-100">local</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Benefits */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-br from-emerald-500 to-teal-500 p-2 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Benefícios</h3>
              </div>
              <ul className="space-y-3">
                {plan.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Workout Days */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-gradient-to-br from-purple-500 to-indigo-500 p-2 rounded-lg">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Dias de Treino</h3>
              </div>

              {plan.days.map((day, idx) => (
                <div key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <button
                    onClick={() => setExpandedDay(expandedDay === idx ? null : idx)}
                    className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-gradient-to-br from-pink-500 to-rose-500 w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
                        {day.day}
                      </div>
                      <div className="text-left">
                        <h4 className="font-bold text-gray-900">{day.name}</h4>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-sm text-gray-600 flex items-center gap-1">
                            <Target className="w-4 h-4" />
                            {day.focus}
                          </span>
                          <span className="text-sm text-gray-600 flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {day.duration}
                          </span>
                        </div>
                      </div>
                    </div>
                    {expandedDay === idx ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </button>

                  {expandedDay === idx && (
                    <div className="px-6 pb-6 space-y-4 border-t border-gray-100 pt-4">
                      {day.exercises.map((exercise, exIdx) => (
                        <div key={exIdx} className="bg-gray-50 rounded-xl p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h5 className="font-semibold text-gray-900">
                                Exercício {exIdx + 1}
                              </h5>
                              <p className="text-sm text-gray-600 mt-1">
                                ID: {exercise.exerciseId}
                              </p>
                            </div>
                            <button className="text-pink-600 hover:text-pink-700 text-sm font-medium flex items-center gap-1">
                              <Play className="w-4 h-4" />
                              Ver demo
                            </button>
                          </div>
                          
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Séries</p>
                              <p className="font-semibold text-gray-900">{exercise.sets}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Repetições</p>
                              <p className="font-semibold text-gray-900">{exercise.reps}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Descanso</p>
                              <p className="font-semibold text-gray-900">{exercise.rest}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Carga</p>
                              <p className="font-semibold text-gray-900">{exercise.weight || 'N/A'}</p>
                            </div>
                          </div>

                          {exercise.notes && (
                            <div className="mt-3 flex items-start gap-2 text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                              <Info className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                              <span>{exercise.notes}</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Start Training CTA */}
            <div className="bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl p-6 text-white shadow-xl sticky top-24">
              <Award className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-bold mb-2">Pronta para começar?</h3>
              <p className="text-pink-100 text-sm mb-6">
                Inicie este programa e acompanhe seu progresso
              </p>
              <button className="w-full bg-white text-pink-600 py-3 rounded-xl font-semibold hover:bg-pink-50 transition-all duration-300 shadow-lg flex items-center justify-center gap-2">
                <Play className="w-5 h-5" />
                Iniciar Programa
              </button>
            </div>

            {/* Tips */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-br from-amber-500 to-orange-500 p-2 rounded-lg">
                  <Info className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-gray-900">Dicas Importantes</h3>
              </div>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-0.5">•</span>
                  <span>Faça aquecimento antes de cada treino</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-0.5">•</span>
                  <span>Mantenha-se hidratada durante o treino</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-0.5">•</span>
                  <span>Respeite os dias de descanso</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-0.5">•</span>
                  <span>Aumente a carga progressivamente</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-0.5">•</span>
                  <span>Foque na execução correta dos movimentos</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
