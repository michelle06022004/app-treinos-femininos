'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  Search, 
  Heart, 
  Dumbbell, 
  Apple, 
  Brain, 
  Droplet,
  Moon,
  Zap,
  Shield,
  TrendingUp,
  Clock,
  ArrowLeft,
  ChevronRight,
  Star,
  Flame,
  Activity,
  Utensils,
  Sparkles,
  Target
} from 'lucide-react';

export default function Enciclopedia() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todos');

  const categories = [
    { id: 'todos', label: 'Todos', icon: BookOpen, color: 'from-gray-500 to-gray-600' },
    { id: 'treino', label: 'Treino', icon: Dumbbell, color: 'from-pink-500 to-rose-500' },
    { id: 'nutricao', label: 'Nutrição', icon: Apple, color: 'from-emerald-500 to-teal-500' },
    { id: 'saude', label: 'Saúde', icon: Heart, color: 'from-red-500 to-pink-500' },
    { id: 'mental', label: 'Mental', icon: Brain, color: 'from-purple-500 to-indigo-500' },
    { id: 'recuperacao', label: 'Recuperação', icon: Moon, color: 'from-blue-500 to-cyan-500' }
  ];

  const articles = [
    {
      id: 1,
      title: 'Como Construir Glúteos Fortes e Definidos',
      category: 'treino',
      readTime: '8 min',
      difficulty: 'Intermediário',
      icon: Activity,
      excerpt: 'Descubra os melhores exercícios e técnicas para desenvolver glúteos fortes, com foco em hipertrofia e definição muscular.',
      popular: true
    },
    {
      id: 2,
      title: 'Guia Completo de Proteínas para Mulheres',
      category: 'nutricao',
      readTime: '10 min',
      difficulty: 'Iniciante',
      icon: Utensils,
      excerpt: 'Entenda a importância das proteínas, quantidades ideais e as melhores fontes para seus objetivos fitness.',
      popular: true
    },
    {
      id: 3,
      title: 'Treino de Força vs Cardio: O Que Priorizar?',
      category: 'treino',
      readTime: '6 min',
      difficulty: 'Iniciante',
      icon: TrendingUp,
      excerpt: 'Descubra qual tipo de treino é mais eficaz para seus objetivos e como combinar ambos de forma inteligente.',
      popular: false
    },
    {
      id: 4,
      title: 'Hidratação: Quanto Água Você Realmente Precisa?',
      category: 'saude',
      readTime: '5 min',
      difficulty: 'Iniciante',
      icon: Droplet,
      excerpt: 'Aprenda a calcular sua necessidade diária de água e os sinais de desidratação durante o treino.',
      popular: false
    },
    {
      id: 5,
      title: 'Como Melhorar a Qualidade do Sono',
      category: 'recuperacao',
      readTime: '7 min',
      difficulty: 'Iniciante',
      icon: Moon,
      excerpt: 'O sono é essencial para recuperação muscular e perda de gordura. Veja como otimizar suas noites.',
      popular: true
    },
    {
      id: 6,
      title: 'Mindset: Mantendo a Motivação em Longo Prazo',
      category: 'mental',
      readTime: '9 min',
      difficulty: 'Todos',
      icon: Brain,
      excerpt: 'Estratégias psicológicas para manter a consistência e superar obstáculos na jornada fitness.',
      popular: false
    },
    {
      id: 7,
      title: 'Suplementação Feminina: O Que Realmente Funciona',
      category: 'nutricao',
      readTime: '12 min',
      difficulty: 'Intermediário',
      icon: Sparkles,
      excerpt: 'Guia baseado em evidências sobre suplementos essenciais e quais realmente valem a pena.',
      popular: true
    },
    {
      id: 8,
      title: 'Treino Durante o Ciclo Menstrual',
      category: 'treino',
      readTime: '8 min',
      difficulty: 'Intermediário',
      icon: Heart,
      excerpt: 'Como adaptar seus treinos às diferentes fases do ciclo para maximizar resultados e bem-estar.',
      popular: false
    },
    {
      id: 9,
      title: 'Alongamento vs Mobilidade: Entenda a Diferença',
      category: 'recuperacao',
      readTime: '6 min',
      difficulty: 'Iniciante',
      icon: Activity,
      excerpt: 'Descubra as diferenças entre alongamento e mobilidade e quando usar cada um.',
      popular: false
    },
    {
      id: 10,
      title: 'Déficit Calórico Inteligente para Mulheres',
      category: 'nutricao',
      readTime: '11 min',
      difficulty: 'Intermediário',
      icon: TrendingUp,
      excerpt: 'Como criar um déficit calórico saudável sem prejudicar o metabolismo ou a saúde hormonal.',
      popular: true
    },
    {
      id: 11,
      title: 'Prevenção de Lesões no Treino de Força',
      category: 'saude',
      readTime: '7 min',
      difficulty: 'Todos',
      icon: Shield,
      excerpt: 'Técnicas e cuidados essenciais para treinar com segurança e evitar lesões comuns.',
      popular: false
    },
    {
      id: 12,
      title: 'Como Acelerar a Recuperação Muscular',
      category: 'recuperacao',
      readTime: '8 min',
      difficulty: 'Intermediário',
      icon: Zap,
      excerpt: 'Estratégias comprovadas para reduzir dor muscular e acelerar a recuperação entre treinos.',
      popular: false
    }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'todos' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const popularArticles = articles.filter(a => a.popular);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Iniciante':
        return 'bg-green-100 text-green-700';
      case 'Intermediário':
        return 'bg-yellow-100 text-yellow-700';
      case 'Avançado':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      {/* Header */}
      <header className="bg-white/70 backdrop-blur-md border-b border-orange-100/50 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="p-2 hover:bg-orange-100 rounded-xl transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-700" />
              </Link>
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-2.5 rounded-2xl shadow-lg">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                    Enciclopédia
                  </h1>
                  <p className="text-xs text-gray-500">Conhecimento fitness</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 rounded-3xl p-8 sm:p-10 text-white shadow-2xl mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-600/20 rounded-full blur-2xl -ml-24 -mb-24" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6" />
              <span className="text-sm font-medium text-orange-100">Aprenda e Evolua</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">
              Base de Conhecimento Fitness
            </h2>
            <p className="text-orange-100 text-base sm:text-lg mb-6 max-w-2xl">
              Mais de 200 artigos sobre treino, nutrição, saúde mental e recuperação. Conhecimento baseado em ciência para sua transformação.
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar artigos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Categorias</h3>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all duration-300 whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? `bg-gradient-to-r ${cat.color} text-white shadow-lg scale-105`
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
                }`}
              >
                <cat.icon className="w-5 h-5" />
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Popular Articles */}
        {selectedCategory === 'todos' && searchTerm === '' && (
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-5">
              <Flame className="w-6 h-6 text-orange-500" />
              <h3 className="text-xl font-bold text-gray-900">Artigos Populares</h3>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {popularArticles.map((article) => (
                <div
                  key={article.id}
                  className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer group"
                >
                  <div className="bg-gradient-to-br from-orange-500 to-rose-500 p-4 rounded-2xl mb-4 inline-flex">
                    <article.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getDifficultyColor(article.difficulty)}`}>
                      {article.difficulty}
                    </span>
                    <div className="flex items-center gap-1 text-gray-500 text-xs">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                    {article.title}
                  </h4>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center text-sm font-semibold text-orange-600 group-hover:text-orange-700">
                    Ler artigo
                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Articles */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-5">
            {selectedCategory === 'todos' ? 'Todos os Artigos' : `Artigos de ${categories.find(c => c.id === selectedCategory)?.label}`}
            <span className="text-gray-500 font-normal text-base ml-2">
              ({filteredArticles.length})
            </span>
          </h3>
          
          {filteredArticles.length === 0 ? (
            <div className="text-center py-16">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Nenhum artigo encontrado</p>
              <p className="text-gray-400 text-sm">Tente buscar por outro termo ou categoria</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-5">
              {filteredArticles.map((article) => (
                <div
                  key={article.id}
                  className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-[1.01] cursor-pointer group"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-br from-orange-500 to-rose-500 p-3 rounded-xl flex-shrink-0">
                      <article.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getDifficultyColor(article.difficulty)}`}>
                          {article.difficulty}
                        </span>
                        <div className="flex items-center gap-1 text-gray-500 text-xs">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{article.readTime}</span>
                        </div>
                        {article.popular && (
                          <div className="flex items-center gap-1 bg-orange-100 text-orange-700 text-xs font-semibold px-2 py-1 rounded-full">
                            <Star className="w-3 h-3 fill-orange-500" />
                            <span>Popular</span>
                          </div>
                        )}
                      </div>
                      <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                        {article.title}
                      </h4>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center text-sm font-semibold text-orange-600 group-hover:text-orange-700">
                        Ler artigo completo
                        <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="mt-12 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-100 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-xl shadow-md">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-2 text-lg">Continue Aprendendo</h4>
              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                Novos artigos são adicionados semanalmente. Marque seus favoritos e acompanhe as atualizações para estar sempre por dentro das melhores práticas de saúde e fitness.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-5 py-2.5 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                Voltar ao Dashboard
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
