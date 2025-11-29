'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Home, 
  Building2, 
  Flame,
  Zap,
  Target,
  Heart,
  Dumbbell,
  TrendingUp,
  Clock,
  Calendar,
  Award,
  Filter,
  Search
} from 'lucide-react';
import { workoutPlans } from '@/lib/data/workouts';

const goalIcons: Record<string, any> = {
  'emagrecimento': Flame,
  'hipertrofia': Dumbbell,
  'tonificacao': TrendingUp,
  'gluteos': Heart,
  'pernas': Dumbbell,
  'abdomen': Target,
  'bracos-costas': Dumbbell,
  'funcional': Zap,
  'hiit': Zap,
  'iniciante': Award
};

const goalLabels: Record<string, string> = {
  'emagrecimento': 'Emagrecimento',
  'hipertrofia': 'Hipertrofia',
  'tonificacao': 'Tonificação',
  'gluteos': 'Glúteos',
  'pernas': 'Pernas',
  'abdomen': 'Abdômen',
  'bracos-costas': 'Braços e Costas',
  'funcional': 'Funcional',
  'hiit': 'HIIT',
  'iniciante': 'Iniciante'
};

const levelColors: Record<string, string> = {
  'iniciante': 'bg-green-100 text-green-700 border-green-200',
  'intermediario': 'bg-blue-100 text-blue-700 border-blue-200',
  'avancado': 'bg-purple-100 text-purple-700 border-purple-200'
};

export default function TreinosPage() {
  const [selectedLocation, setSelectedLocation] = useState<'todos' | 'casa' | 'academia'>('todos');
  const [selectedGoal, setSelectedGoal] = useState<string>('todos');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPlans = useMemo(() => {
    return workoutPlans.filter(plan => {
      const matchesLocation = selectedLocation === 'todos' || 
        plan.location === selectedLocation || 
        plan.location === 'ambos';
      
      const matchesGoal = selectedGoal === 'todos' || plan.goal === selectedGoal;
      
      const matchesSearch = searchTerm === '' || 
        plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plan.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesLocation && matchesGoal && matchesSearch;
    });
  }, [selectedLocation, selectedGoal, searchTerm]);

  const uniqueGoals = Array.from(new Set(workoutPlans.map(p => p.goal)));

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-pink-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                href="/"
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                  Biblioteca de Treinos
                </h1>
                <p className="text-sm text-gray-600">Escolha o treino perfeito para você</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar treinos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-pink-300 focus:ring-2 focus:ring-pink-100 outline-none transition-all"
            />
          </div>

          {/* Location Filter */}
          <div className="flex gap-3 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedLocation('todos')}
              className={`px-4 py-2 rounded-xl font-medium text-sm whitespace-nowrap transition-all ${
                selectedLocation === 'todos'
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-pink-300'
              }`}
            >
              <Filter className="w-4 h-4 inline mr-2" />
              Todos
            </button>
            <button
              onClick={() => setSelectedLocation('casa')}
              className={`px-4 py-2 rounded-xl font-medium text-sm whitespace-nowrap transition-all ${
                selectedLocation === 'casa'
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-pink-300'
              }`}
            >
              <Home className="w-4 h-4 inline mr-2" />
              Em Casa
            </button>
            <button
              onClick={() => setSelectedLocation('academia')}
              className={`px-4 py-2 rounded-xl font-medium text-sm whitespace-nowrap transition-all ${
                selectedLocation === 'academia'
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-pink-300'
              }`}
            >
              <Building2 className="w-4 h-4 inline mr-2" />
              Academia
            </button>
          </div>

          {/* Goal Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedGoal('todos')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                selectedGoal === 'todos'
                  ? 'bg-pink-100 text-pink-700 border border-pink-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Todos
            </button>
            {uniqueGoals.map(goal => (
              <button
                key={goal}
                onClick={() => setSelectedGoal(goal)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  selectedGoal === goal
                    ? 'bg-pink-100 text-pink-700 border border-pink-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {goalLabels[goal]}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-gray-600">
            {filteredPlans.length} {filteredPlans.length === 1 ? 'treino encontrado' : 'treinos encontrados'}
          </p>
        </div>

        {/* Workout Plans Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlans.map((plan) => {
            const GoalIcon = goalIcons[plan.goal];
            
            return (
              <Link
                key={plan.id}
                href={`/treinos/${plan.id}`}
                className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-gradient-to-br from-pink-500 to-rose-500 p-3 rounded-xl shadow-lg">
                    <GoalIcon className="w-6 h-6 text-white" />
                  </div>
                  <span className={`text-xs font-medium px-3 py-1 rounded-full border ${levelColors[plan.level]}`}>
                    {plan.level.charAt(0).toUpperCase() + plan.level.slice(1)}
                  </span>
                </div>

                {/* Title and Description */}
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
                  {plan.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {plan.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4 text-pink-500" />
                    <span>{plan.daysPerWeek}x semana</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4 text-pink-500" />
                    <span>{plan.duration}</span>
                  </div>
                </div>

                {/* Location Badge */}
                <div className="flex items-center gap-2 mb-4">
                  {plan.location === 'casa' && (
                    <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full flex items-center gap-1">
                      <Home className="w-3 h-3" />
                      Em Casa
                    </span>
                  )}
                  {plan.location === 'academia' && (
                    <span className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded-full flex items-center gap-1">
                      <Building2 className="w-3 h-3" />
                      Academia
                    </span>
                  )}
                  {plan.location === 'ambos' && (
                    <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full flex items-center gap-1">
                      <Zap className="w-3 h-3" />
                      Flexível
                    </span>
                  )}
                </div>

                {/* Benefits Preview */}
                <div className="border-t border-gray-100 pt-4">
                  <p className="text-xs font-medium text-gray-500 mb-2">Benefícios:</p>
                  <ul className="space-y-1">
                    {plan.benefits.slice(0, 2).map((benefit, idx) => (
                      <li key={idx} className="text-xs text-gray-600 flex items-start gap-2">
                        <span className="text-pink-500 mt-0.5">✓</span>
                        <span className="line-clamp-1">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between text-sm font-medium text-pink-600 group-hover:text-pink-700">
                    <span>Ver detalhes</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredPlans.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Nenhum treino encontrado
            </h3>
            <p className="text-gray-600 mb-6">
              Tente ajustar os filtros ou buscar por outro termo
            </p>
            <button
              onClick={() => {
                setSelectedLocation('todos');
                setSelectedGoal('todos');
                setSearchTerm('');
              }}
              className="px-6 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-medium hover:shadow-lg transition-all"
            >
              Limpar filtros
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
