'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Dumbbell, 
  Apple, 
  TrendingUp, 
  BookOpen, 
  Home,
  Building2,
  Flame,
  Target,
  Zap,
  Heart,
  Award,
  Calendar
} from 'lucide-react';

export default function Dashboard() {
  const [userName] = useState('Camila');

  const mainFeatures = [
    {
      title: 'Treinos',
      description: 'Biblioteca completa de treinos para seus objetivos',
      icon: Dumbbell,
      href: '/treinos',
      gradient: 'from-pink-500 to-rose-500',
      stats: '50+ programas'
    },
    {
      title: 'Nutrição',
      description: 'Planos de dieta e controle de macros',
      icon: Apple,
      href: '/nutricao',
      gradient: 'from-emerald-500 to-teal-500',
      stats: 'Personalizado'
    },
    {
      title: 'Progresso',
      description: 'Acompanhe sua evolução e conquistas',
      icon: TrendingUp,
      href: '/progresso',
      gradient: 'from-purple-500 to-indigo-500',
      stats: 'Gráficos detalhados'
    },
    {
      title: 'Enciclopédia',
      description: 'Aprenda sobre exercícios, saúde e dieta',
      icon: BookOpen,
      href: '/enciclopedia',
      gradient: 'from-amber-500 to-orange-500',
      stats: '200+ artigos'
    }
  ];

  const quickStats = [
    { label: 'Treinos este mês', value: '12', icon: Calendar, color: 'text-pink-500' },
    { label: 'Sequência atual', value: '5 dias', icon: Flame, color: 'text-orange-500' },
    { label: 'Calorias queimadas', value: '3.2k', icon: Zap, color: 'text-yellow-500' },
    { label: 'Conquistas', value: '8', icon: Award, color: 'text-purple-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-pink-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-pink-500 to-rose-500 p-2 rounded-xl">
                <Heart className="w-6 h-6 text-white" fill="white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                  FitHer
                </h1>
                <p className="text-xs text-gray-500">Seu app de treinos</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-900">Olá, {userName}! 👋</p>
                <p className="text-xs text-gray-500">Pronta para treinar?</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-rose-400 flex items-center justify-center text-white font-semibold">
                {userName[0]}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Bem-vinda de volta! 💪
          </h2>
          <p className="text-gray-600">
            Transforme seu corpo e sua vida - cada treino te aproxima da melhor versão de você mesma!
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {quickStats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
              </div>
              <p className="text-xs text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Main Features Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {mainFeatures.map((feature, index) => (
            <Link
              key={index}
              href={feature.href}
              className="group relative bg-white rounded-3xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] overflow-hidden"
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div className={`bg-gradient-to-br ${feature.gradient} p-3 rounded-2xl shadow-lg`}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {feature.stats}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {feature.description}
                </p>
                
                <div className="flex items-center text-sm font-medium text-pink-600 group-hover:text-pink-700">
                  Acessar
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-br from-pink-500 to-rose-500 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold mb-2">Pronta para começar?</h3>
              <p className="text-pink-100 text-sm">
                Escolha onde você quer treinar hoje
              </p>
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              <Link
                href="/treinos?location=casa"
                className="flex-1 sm:flex-none bg-white text-pink-600 px-6 py-3 rounded-xl font-semibold hover:bg-pink-50 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
              >
                <Home className="w-5 h-5" />
                <span>Em Casa</span>
              </Link>
              <Link
                href="/treinos?location=academia"
                className="flex-1 sm:flex-none bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition-all duration-300 flex items-center justify-center gap-2 border border-white/30"
              >
                <Building2 className="w-5 h-5" />
                <span>Academia</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Today's Motivation */}
        <div className="mt-8 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="bg-gradient-to-br from-purple-500 to-indigo-500 p-3 rounded-xl">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Dica do Dia</h4>
              <p className="text-sm text-gray-600">
                "A consistência é mais importante que a perfeição. Mesmo um treino curto é melhor que nenhum treino. Continue se movendo! 💪"
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
